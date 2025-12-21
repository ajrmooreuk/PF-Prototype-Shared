/**
 * ECCO API Client
 *
 * Handles all API calls to the ECCO backend with automatic authentication
 */

import { supabase } from './supabase';

// ============================================================================
// Token Management
// ============================================================================

/**
 * Refresh JWT token if expired
 * Returns the current valid token or refreshes it
 */
async function getValidToken(): Promise<string | null> {
  try {
    // First try to get the current session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('[Auth] Error getting session:', error);
      return null;
    }
    
    if (!session) {
      console.warn('[Auth] No session found - user needs to log in');
      return null;
    }
    
    // Check if token is about to expire (within 5 minutes)
    const expiresAt = session.expires_at ? session.expires_at * 1000 : 0;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (expiresAt && expiresAt - now < fiveMinutes) {
      console.log('[Auth] Token expiring soon, refreshing...');
      
      // Force a token refresh
      const { data: { session: newSession }, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError) {
        console.error('[Auth] Error refreshing session:', refreshError);
        return session.access_token; // Return old token as fallback
      }
      
      if (newSession) {
        console.log('[Auth] Token refreshed proactively');
        localStorage.setItem('jwt_token', newSession.access_token);
        return newSession.access_token;
      }
    }
    
    // Update localStorage with current token
    localStorage.setItem('jwt_token', session.access_token);
    
    return session.access_token;
  } catch (error) {
    console.error('[Auth] Error refreshing token:', error);
    return null;
  }
}

// ============================================================================
// Types
// ============================================================================

export interface DiscoveryAuditCreateParams {
  client_id: string;
  domain: string;
  target_keywords: string[];
  platforms?: string[];
  include_youtube_analysis?: boolean;
  include_competitor_analysis?: boolean;
  competitor_domains?: string[];
}

export interface DiscoveryAuditUpdateParams {
  domain?: string;
  target_keywords?: string[];
  platforms?: string[];
  include_youtube_analysis?: boolean;
  include_competitor_analysis?: boolean;
  competitor_domains?: string[];
}

export interface DiscoveryAuditResponse {
  id: string;
  tenant_id: string;
  client_id: string;
  domain: string;
  target_keywords: string[];
  platforms: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  overall_visibility_score?: number;
  citation_patterns?: any[];
  platform_visibility?: Record<string, any>;
  gaps_identified?: any[];
  audit_started_at?: string;
  audit_completed_at?: string;
  error_message?: string;
  include_youtube_analysis?: boolean;
  include_competitor_analysis?: boolean;
  competitor_domains?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface DiscoveryAuditListResponse {
  items: DiscoveryAuditResponse[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface TenantMeResponse {
  id: string;
  legal_name: string;
  trading_name?: string;
  domain?: string;
  industry?: string;
  plan_tier?: string;
  status?: string;

  // Discovery-related fields
  target_keywords: string[];
  target_subreddits: string[];
  target_youtube_channels: string[];
  target_bluesky_handles: string[];

  // ICP fields
  icp_description?: string;
  target_roles: string[];
  target_industries: string[];
  target_pain_points: string[];

  created_at?: string;
}

// ============================================================================
// Main API Call Function
// ============================================================================

/**
 * Call the ECCO API with automatic authentication
 *
 * @param endpoint - API endpoint (e.g., '/api/discovery_audit/')
 * @param method - HTTP method (default: 'GET')
 * @param body - Request body for POST/PUT requests
 * @returns Parsed JSON response
 */
export async function callEccoAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<any> {
  try {
    // Proactively check and refresh token if needed
    let jwtToken = localStorage.getItem('jwt_token') || '';
    
    // Try to get a valid token (will refresh if needed)
    const validToken = await getValidToken();
    if (validToken) {
      jwtToken = validToken;
    }
    
    const tenantId = localStorage.getItem('tenant_id') || '';

    // Build headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add JWT token for authentication
    // Backend uses Depends(get_secure_tenant_id) to extract tenant_id from JWT
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    // Add tenant_id header for additional context (optional)
    if (tenantId) {
      headers['X-Tenant-ID'] = tenantId;
    }

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
    };

    // Add body for POST/PUT requests
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    // Hardcoded base URL for Figma environment
    const baseURL = 'https://ecco-ai-vis-9wprj.ondigitalocean.app';

    // Make the API call
    const url = endpoint.startsWith('http') ? endpoint : `${baseURL}${endpoint}`;

    console.log(`[API] ${method} ${url}`);

    const response = await fetch(url, options);

    // Handle non-200 responses
    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText };
      }

      const errorMessage = errorData.detail || `API Error: ${response.status} ${response.statusText}`;
      
      // Check if token has expired
      if (errorMessage.includes('Token has expired') || errorMessage.includes('expired') || response.status === 401) {
        console.log('[Auth] Token expired, attempting to refresh...');
        
        // Try to refresh the token
        const newToken = await getValidToken();
        
        if (newToken) {
          console.log('[Auth] Token refreshed successfully, retrying request...');
          
          // Retry the request with the new token
          headers['Authorization'] = `Bearer ${newToken}`;
          options.headers = headers;
          
          const retryResponse = await fetch(url, options);
          
          if (retryResponse.ok) {
            // For DELETE requests with 204 No Content
            if (retryResponse.status === 204) {
              return null;
            }
            
            // Parse and return JSON response
            const retryData = await retryResponse.json();
            return retryData;
          }
        }
        
        // If token refresh failed, redirect to login
        console.error('[Auth] Token refresh failed - redirecting to login');
        localStorage.clear();
        window.location.reload(); // This will trigger the authentication check in App.tsx
        throw new Error('Session expired. Please log in again.');
      }
      
      // Suppress expected errors for users without tenant assignment (using fallback tenant)
      const isExpectedTenantError = errorMessage.includes('User not assigned to any tenant');
      
      if (!isExpectedTenantError) {
        console.error(`[API Error] ${method} ${url}:`, errorMessage);
      }

      throw new Error(errorMessage);
    }

    // For DELETE requests with 204 No Content
    if (response.status === 204) {
      return null;
    }

    // Parse and return JSON response
    const data = await response.json();
    return data;

  } catch (error: any) {
    // Suppress expected tenant assignment errors
    const isExpectedTenantError = error.message?.includes('User not assigned to any tenant');
    
    // Check for token expiration in error message
    const isTokenExpired = error.message?.includes('Token has expired') || 
                          error.message?.includes('expired') ||
                          error.message?.includes('Session expired');
    
    if (isTokenExpired) {
      // Token expiration is already handled above, just suppress duplicate logging
      throw error;
    }
    
    if (!isExpectedTenantError) {
      console.error('[API] Request failed:', error);
    }
    
    throw error;
  }
}

// ============================================================================
// Discovery Audit API - Specialized Functions
// ============================================================================

/**
 * Specialized API functions for Discovery Audit endpoints
 *
 * These functions map directly to the backend endpoints in:
 * api/routes/discovery_audit.py
 */
export const discoveryAuditAPI = {
  // ========================================
  // CRUD Operations
  // ========================================

  /**
   * Create a new Discovery Audit
   * POST /api/discovery_audit/
   *
   * @param params - Audit creation parameters
   * @returns Created audit object
   */
  create: async (params: DiscoveryAuditCreateParams): Promise<DiscoveryAuditResponse> => {
    return callEccoAPI('/api/discovery_audit/', 'POST', params);
  },

  /**
   * List all Discovery Audits with optional filters
   * GET /api/discovery_audit/
   *
   * @param params - Filter parameters (status, page, page_size)
   * @returns Paginated list of audits
   */
  list: async (params?: {
    status?: string;
    page?: number;
    page_size?: number;
  }): Promise<DiscoveryAuditListResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/discovery_audit/?${queryString}` : '/api/discovery_audit/';

    return callEccoAPI(endpoint, 'GET');
  },

  /**
   * Get the latest completed audit
   * GET /api/discovery_audit/latest
   *
   * NOTE: Backend extracts tenant_id from JWT automatically via Depends(get_secure_tenant_id)
   * Do NOT pass tenant_id as a query parameter
   *
   * @returns Latest completed audit
   */
  getLatest: async (): Promise<DiscoveryAuditResponse> => {
    return callEccoAPI('/api/discovery_audit/latest', 'GET');
  },

  /**
   * Get a specific audit by ID
   * GET /api/discovery_audit/{audit_id}
   *
   * @param auditId - Audit ID
   * @returns Audit object
   */
  get: async (auditId: string): Promise<DiscoveryAuditResponse> => {
    return callEccoAPI(`/api/discovery_audit/${auditId}`, 'GET');
  },

  /**
   * Update an audit (only for pending audits)
   * PUT /api/discovery_audit/{audit_id}
   *
   * @param auditId - Audit ID
   * @param params - Fields to update
   * @returns Updated audit object
   */
  update: async (auditId: string, params: DiscoveryAuditUpdateParams): Promise<DiscoveryAuditResponse> => {
    return callEccoAPI(`/api/discovery_audit/${auditId}`, 'PUT', params);
  },

  /**
   * Delete an audit (only for pending or failed audits)
   * DELETE /api/discovery_audit/{audit_id}
   *
   * @param auditId - Audit ID
   * @returns null (204 No Content)
   */
  delete: async (auditId: string): Promise<null> => {
    return callEccoAPI(`/api/discovery_audit/${auditId}`, 'DELETE');
  },

  // ========================================
  // Execution
  // ========================================

  /**
   * Run an audit in the background
   * POST /api/discovery_audit/{audit_id}/run
   *
   * @param auditId - Audit ID
   * @returns Status message with audit_id
   */
  run: async (auditId: string): Promise<{ message: string; audit_id: string; status: string; websocket_events: string }> => {
    return callEccoAPI(`/api/discovery_audit/${auditId}/run`, 'POST');
  },

  // ========================================
  // Report & Analysis
  // ========================================

  /**
   * Get comprehensive audit report
   * GET /api/discovery_audit/{audit_id}/report
   *
   * @param auditId - Audit ID
   * @returns Audit report
   */
  getReport: async (auditId: string): Promise<{
    audit_id: string;
    domain: string;
    status: string;
    overall_visibility_score: number;
    citation_summary: any;
    attribution_metrics: any;
    top_gaps: any[];
    generated_at: string;
  }> => {
    return callEccoAPI(`/api/discovery_audit/${auditId}/report`, 'GET');
  },

  /**
   * Get audit citations
   * GET /api/discovery_audit/{audit_id}/citations
   *
   * @param auditId - Audit ID
   * @param platform - Optional platform filter
   * @returns Citation patterns
   */
  getCitations: async (auditId: string, platform?: string): Promise<any[]> => {
    const queryString = platform ? `?platform=${platform}` : '';
    return callEccoAPI(`/api/discovery_audit/${auditId}/citations${queryString}`, 'GET');
  },

  /**
   * Get audit metrics
   * GET /api/discovery_audit/{audit_id}/metrics
   *
   * @param auditId - Audit ID
   * @returns Visibility score and metrics
   */
  getMetrics: async (auditId: string): Promise<{
    visibility_score: number;
    metrics: Record<string, any>;
  }> => {
    return callEccoAPI(`/api/discovery_audit/${auditId}/metrics`, 'GET');
  },

  /**
   * Get audit gaps
   * GET /api/discovery_audit/{audit_id}/gaps
   *
   * @param auditId - Audit ID
   * @param minPriority - Optional minimum priority score filter (0-1)
   * @returns Gap opportunities
   */
  getGaps: async (auditId: string, minPriority?: number): Promise<any[]> => {
    const queryString = minPriority !== undefined ? `?min_priority=${minPriority}` : '';
    return callEccoAPI(`/api/discovery_audit/${auditId}/gaps${queryString}`, 'GET');
  },
};

// ============================================================================
// Tenants API - Specialized Functions
// ============================================================================

/**
 * Specialized API functions for Tenant endpoints
 *
 * These functions map directly to the backend endpoints in:
 * api/routes/tenants.py
 */
export const tenantsAPI = {
  /**
   * Get current tenant's own data
   * GET /api/tenants/me
   *
   * NOTE: Backend extracts tenant_id from JWT automatically via Depends(get_secure_tenant_id)
   * Do NOT pass tenant_id as a parameter
   *
   * @returns Current tenant's profile data including discovery targets and ICP
   */
  getMe: async (): Promise<TenantMeResponse> => {
    return callEccoAPI('/api/tenants/me', 'GET');
  },
};

// ============================================================================
// Discovery Intelligence API - Specialized Functions
// ============================================================================

/**
 * Specialized API functions for Discovery Intelligence endpoints
 *
 * These functions provide aggregated insights from discovery audits:
 * api/routes/discovery_intelligence.py
 */
export const discoveryIntelligenceAPI = {
  /**
   * Get top content opportunities from Discovery Audit
   * GET /api/discovery-intelligence/opportunities
   *
   * @param limit - Maximum number of opportunities to return (1-50, default 10)
   * @param priority - Filter by priority level (HIGH, MEDIUM, LOW)
   * @returns List of high-priority content gaps
   */
  getOpportunities: async (limit: number = 10, priority?: 'HIGH' | 'MEDIUM' | 'LOW'): Promise<any> => {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (priority) params.append('priority', priority);
    return callEccoAPI(`/api/discovery-intelligence/opportunities?${params.toString()}`, 'GET');
  },

  /**
   * Get detailed gap analysis for specific topic
   * GET /api/discovery-intelligence/opportunities/{topic}
   *
   * @param topic - Topic name to analyze
   * @returns Detailed gap analysis with missing queries, competitor data, recommendations
   */
  getOpportunityDetails: async (topic: string): Promise<any> => {
    return callEccoAPI(`/api/discovery-intelligence/opportunities/${encodeURIComponent(topic)}`, 'GET');
  },

  /**
   * Get platform-specific visibility metrics
   * GET /api/discovery-intelligence/platform-visibility
   *
   * @param platform - Optional platform filter (chatgpt, claude, perplexity, gemini)
   * @returns Citation counts and visibility scores for AI platforms
   */
  getPlatformVisibility: async (platform?: 'chatgpt' | 'claude' | 'perplexity' | 'gemini'): Promise<any> => {
    const params = platform ? `?platform=${platform}` : '';
    return callEccoAPI(`/api/discovery-intelligence/platform-visibility${params}`, 'GET');
  },

  /**
   * Identify platforms where visibility is weakest
   * GET /api/discovery-intelligence/platform-visibility/weakest
   *
   * @param limit - Number of weakest platforms to return (1-10, default 3)
   * @returns Platforms with lowest visibility scores
   */
  getWeakestPlatforms: async (limit: number = 3): Promise<any> => {
    return callEccoAPI(`/api/discovery-intelligence/platform-visibility/weakest?limit=${limit}`, 'GET');
  },

  /**
   * Get RRF topic coverage analysis
   * GET /api/discovery-intelligence/rrf-coverage
   *
   * @param topic - Optional topic filter
   * @returns RRF health scores, article counts, competitive position
   */
  getRRFCoverage: async (topic?: string): Promise<any> => {
    const params = topic ? `?topic=${encodeURIComponent(topic)}` : '';
    return callEccoAPI(`/api/discovery-intelligence/rrf-coverage${params}`, 'GET');
  },

  /**
   * Get overall RRF health score
   * GET /api/discovery-intelligence/rrf-health
   *
   * @returns Overall RRF health score (0-100)
   */
  getRRFHealth: async (): Promise<any> => {
    return callEccoAPI('/api/discovery-intelligence/rrf-health', 'GET');
  },

  /**
   * Get competitive intelligence analysis
   * GET /api/discovery-intelligence/competitive-analysis
   *
   * @param topic - Optional topic filter
   * @returns Comparison of visibility metrics vs competitors
   */
  getCompetitiveAnalysis: async (topic?: string): Promise<any> => {
    const params = topic ? `?topic=${encodeURIComponent(topic)}` : '';
    return callEccoAPI(`/api/discovery-intelligence/competitive-analysis${params}`, 'GET');
  },

  /**
   * Get citation frequency trends over time
   * GET /api/discovery-intelligence/citation-trends
   *
   * @param days - Number of days to analyze (1-365, default 30)
   * @returns Historical citation counts with platform breakdown
   */
  getCitationTrends: async (days: number = 30): Promise<any> => {
    return callEccoAPI(`/api/discovery-intelligence/citation-trends?days=${days}`, 'GET');
  },

  /**
   * Get schema markup recommendations
   * GET /api/discovery-intelligence/schema-recommendations
   *
   * @returns Suggested schema types (FAQPage, HowTo, VideoObject) for content gaps
   */
  getSchemaRecommendations: async (): Promise<any> => {
    return callEccoAPI('/api/discovery-intelligence/schema-recommendations', 'GET');
  },
};

// ============================================================================
// Discovery Reports API - Specialized Functions
// ============================================================================

/**
 * Specialized API functions for Discovery Report Generation
 *
 * These functions generate comprehensive reports and populate social targets:
 * api/routes/discovery_report_generator.py
 */
export const discoveryReportsAPI = {
  /**
   * Generate comprehensive discovery report
   * POST /api/discovery-reports/generate
   *
   * IMPORTANT: This endpoint also:
   * - Extracts keywords → saves to tenant.target_keywords
   * - Suggests subreddits → saves to tenant.target_subreddits
   * - Suggests YouTube channels → saves to tenant.target_youtube_channels
   * - Suggests Bluesky handles → saves to tenant.target_bluesky_handles
   *
   * @param auditId - Discovery audit ID
   * @param reportType - Type of report (comprehensive, executive, detailed)
   * @param sections - Sections to include in report
   * @returns Generated report with metadata
   */
  generate: async (
    auditId: string,
    reportType: string = 'comprehensive',
    sections?: string[]
  ): Promise<any> => {
    return callEccoAPI('/api/discovery-reports/generate', 'POST', {
      discovery_audit_id: auditId,
      report_type: reportType,
      include_sections: sections || [
        'executive_summary',
        'platform_analysis',
        'content_gaps',
        'competitive_analysis',
        'rrf_analysis',
        'schema_recommendations'
      ]
    });
  },

  /**
   * Get specific report by ID
   * GET /api/discovery-reports/{report_id}
   *
   * @param reportId - Report ID
   * @returns Full report details
   */
  get: async (reportId: string): Promise<any> => {
    return callEccoAPI(`/api/discovery-reports/${reportId}`, 'GET');
  },

  /**
   * Get all reports for a specific audit
   * GET /api/discovery-reports/audit/{audit_id}
   *
   * @param auditId - Discovery audit ID
   * @returns List of reports for this audit
   */
  getByAudit: async (auditId: string): Promise<any> => {
    return callEccoAPI(`/api/discovery-reports/audit/${auditId}`, 'GET');
  },

  /**
   * List all reports with pagination
   * GET /api/discovery-reports/
   *
   * @param page - Page number
   * @param pageSize - Items per page
   * @returns Paginated list of reports
   */
  list: async (page: number = 1, pageSize: number = 10): Promise<any> => {
    return callEccoAPI(`/api/discovery-reports/?page=${page}&page_size=${pageSize}`, 'GET');
  },

  /**
   * Get executive summary for dashboard
   * GET /api/discovery-reports/{report_id}/executive-summary
   *
   * @param reportId - Report ID
   * @returns Executive summary section
   */
  getExecutiveSummary: async (reportId: string): Promise<any> => {
    return callEccoAPI(`/api/discovery-reports/${reportId}/executive-summary`, 'GET');
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Transform backend DiscoveryAuditResponse to frontend UI data structure
 *
 * @param backendData - Response from backend API
 * @returns Transformed data for frontend UI
 */
export function transformAuditDataForUI(backendData: DiscoveryAuditResponse) {
  return {
    // Basic info
    id: backendData.id,
    status: backendData.status,
    domain: backendData.domain,

    // Timing
    lastAudit: backendData.audit_completed_at
      ? new Date(backendData.audit_completed_at).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      : 'N/A',

    completionTime: calculateCompletionTime(backendData.audit_started_at, backendData.audit_completed_at),

    // Scores & Metrics
    visibilityScore: backendData.overall_visibility_score || 0,
    citations: calculateTotalCitations(backendData.citation_patterns),
    opportunities: (backendData.gaps_identified || []).length,
    platformsTested: (backendData.platforms || []).length,
    queriesTested: (backendData.target_keywords || []).length,
    sevenDayChange: 0, // TODO: Calculate from historical data

    // Detailed data
    platforms: transformPlatformData(backendData.platform_visibility),
    contentGaps: backendData.gaps_identified || [],
    keywords: backendData.target_keywords || [],
    competitors: backendData.competitor_domains || [],

    // Raw data for advanced use
    raw: backendData,
  };
}

/**
 * Calculate completion time from start and end timestamps
 */
function calculateCompletionTime(startedAt?: string, completedAt?: string): string {
  if (!startedAt || !completedAt) return 'N/A';

  try {
    const start = new Date(startedAt).getTime();
    const end = new Date(completedAt).getTime();
    const diffMs = end - start;
    const diffMinutes = Math.round(diffMs / 60000);

    if (diffMinutes < 1) return '< 1 minute';
    if (diffMinutes === 1) return '1 minute';
    if (diffMinutes < 60) return `${diffMinutes} minutes`;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  } catch {
    return 'N/A';
  }
}

/**
 * Calculate total citations from citation patterns
 */
function calculateTotalCitations(citationPatterns?: any[]): number {
  if (!citationPatterns || !Array.isArray(citationPatterns)) return 0;

  return citationPatterns.reduce((total, pattern) => {
    return total + (pattern.citation_count || 0);
  }, 0);
}

/**
 * Transform platform visibility data for UI
 */
function transformPlatformData(platformVisibility?: Record<string, any>): any[] {
  if (!platformVisibility) return [];

  return Object.entries(platformVisibility).map(([platform, data]) => ({
    platform,
    ...data,
  }));
}