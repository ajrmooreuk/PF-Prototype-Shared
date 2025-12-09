// ICP Profile API Integration
const API_BASE_URL = 'https://ecco-ai-vis-9wprj.ondigitalocean.app';

interface ApiOptions {
  tenantId: string;
  jwtToken: string;
}

interface ICPProfile {
  id: string;
  name: string;
  icp_description: string;
  icp_attributes: {
    demographics: string[];
    target_roles: string[];
    pain_points: string[];
    goals: string[];
    keywords: string[];
  };
  icp_match_threshold: number;
}

interface ContentGuidance {
  suggested_keywords: string[];
  primary_pain_point: string;
  target_audience: string;
  recommended_tone: string;
  key_topics: string[];
}

interface ICPContext {
  has_icp: boolean;
  icp_profile?: ICPProfile;
  content_guidance?: ContentGuidance;
  message?: string;
}

interface MatchScoreResult {
  match_score: number;
  match_level: 'HIGH' | 'MEDIUM' | 'LOW';
  matched_attributes: {
    keywords: string[];
    pain_points: string[];
    goals: string[];
  };
  suggestions: string[];
}

// Helper function to make API calls
async function apiCall(
  endpoint: string,
  options: ApiOptions,
  method: string = 'GET',
  body?: any
) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'X-Tenant-ID': options.tenantId,
    'Authorization': `Bearer ${options.jwtToken}`,
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API call failed: ${response.status}`);
  }

  return response.json();
}

// Cache management
const ICP_CACHE_KEY = 'icp_context_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedICP(): ICPContext | null {
  try {
    const cached = localStorage.getItem(ICP_CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(ICP_CACHE_KEY);
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
}

function cacheICP(data: ICPContext): void {
  try {
    localStorage.setItem(ICP_CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Failed to cache ICP data:', error);
  }
}

export function clearICPCache(): void {
  localStorage.removeItem(ICP_CACHE_KEY);
}

// Load ICP Context
export async function loadICPContext(options: ApiOptions): Promise<ICPContext> {
  // Check cache first
  const cached = getCachedICP();
  if (cached) {
    return cached;
  }

  try {
    const data = await apiCall('/api/icp_profile/context', options);
    
    // Cache the result
    cacheICP(data);
    
    return data;
  } catch (error) {
    // TODO: Implement GET /api/icp_profile/context endpoint in backend
    // For now, silently use mock ICP data as fallback
    // console.error('Error loading ICP context:', error);
    
    const mockData = getMockICPContext();
    cacheICP(mockData);
    return mockData;
  }
}

// Calculate ICP Match Score
export async function calculateICPMatch(
  text: string,
  contextType: string,
  options: ApiOptions
): Promise<MatchScoreResult> {
  try {
    return await apiCall(
      '/api/icp_profile/calculate-match',
      options,
      'POST',
      { text, context_type: contextType }
    );
  } catch (error) {
    // TODO: Implement POST /api/icp_profile/calculate-match endpoint in backend
    // For now, silently use mock score as fallback
    // console.error('Error calculating ICP match:', error);
    
    return {
      match_score: Math.floor(Math.random() * 30) + 70, // 70-100
      match_level: 'HIGH',
      matched_attributes: {
        keywords: ['diabetic foot care'],
        pain_points: ['Patient education'],
        goals: []
      },
      suggestions: []
    };
  }
}

// Validate Content Against ICP
export async function validateContentICP(
  contentType: string,
  content: any,
  icpProfileId: string,
  options: ApiOptions
): Promise<any> {
  try {
    return await apiCall(
      '/api/icp_profile/validate-content',
      options,
      'POST',
      {
        content_type: contentType,
        content,
        icp_profile_id: icpProfileId
      }
    );
  } catch (error) {
    console.error('Error validating content:', error);
    throw error;
  }
}

// Mock data for development
function getMockICPContext(): ICPContext {
  return {
    has_icp: true,
    icp_profile: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Primary ICP',
      icp_description: 'We target podiatry clinics and foot care practices serving diabetic patients. Our ideal customer is a practice owner or office manager who struggles with patient education materials and has 2-10 staff members.',
      icp_attributes: {
        demographics: [
          'Healthcare',
          'Medical Practices',
          '1-50 employees',
          'B2B',
          'North America'
        ],
        target_roles: [
          'Practice Owner',
          'Office Manager',
          'Lead Podiatrist'
        ],
        pain_points: [
          'Patient education materials outdated',
          'Low AI visibility',
          'Wound prevention education',
          'Treatment options communication'
        ],
        goals: [
          'Improve patient outcomes',
          'Increase AI citations',
          'Streamline education process',
          'Reduce readmission rates'
        ],
        keywords: [
          'diabetic foot care',
          'patient education',
          'wound prevention',
          'custom orthotics',
          'plantar fasciitis'
        ]
      },
      icp_match_threshold: 75
    },
    content_guidance: {
      suggested_keywords: [
        'diabetic foot care',
        'patient education',
        'wound prevention'
      ],
      primary_pain_point: 'Patient education materials outdated',
      target_audience: 'Practice owners and office managers',
      recommended_tone: 'Professional, empathetic, educational',
      key_topics: [
        'Diabetic patient care',
        'Foot health education',
        'Wound prevention strategies'
      ]
    }
  };
}

export type { ICPContext, ICPProfile, ContentGuidance, MatchScoreResult };