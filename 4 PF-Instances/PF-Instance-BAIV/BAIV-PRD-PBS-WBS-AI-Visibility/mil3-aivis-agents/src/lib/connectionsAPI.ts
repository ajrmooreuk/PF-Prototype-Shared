// Connections/Integrations API
const API_BASE_URL = 'https://ecco-ai-vis-9wprj.ondigitalocean.app';

interface ApiOptions {
  tenantId: string;
  jwtToken: string;
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

// Get all connection statuses
export async function getAllConnectionStatuses(options: ApiOptions) {
  try {
    return await apiCall('/api/connections/status', options);
  } catch (error) {
    // Silently fail and let component handle with mock data
    throw error;
  }
}

// Initiate OAuth connection for different platforms
export async function initiateConnection(
  platform: string,
  tenantId: string,
  jwtToken: string
) {
  if (platform === 'google') {
    // Google Drive special flow
    const response = await fetch(`${API_BASE_URL}/api/google-oauth/auth/url`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenant_id: tenantId }),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate Google connection');
    }

    const data = await response.json();
    return data.authorization_url;
  } else {
    // Social media platforms (LinkedIn, Facebook, Instagram, Twitter)
    return `${API_BASE_URL}/api/oauth/${platform}/authorize?tenant_id=${tenantId}`;
  }
}

// Disconnect a platform
export async function disconnectPlatform(
  connectionId: string,
  platform: string,
  options: ApiOptions
) {
  if (platform === 'google') {
    // Google Drive disconnect
    return await apiCall(`/api/google-oauth/${connectionId}/disconnect`, options, 'POST');
  } else {
    // Social media platforms
    return await apiCall(`/api/oauth/${connectionId}/disconnect`, options, 'DELETE');
  }
}

// Get Google Drive folders
export async function getDriveFolders(
  connectionId: string,
  options: ApiOptions
) {
  const endpoint = `/api/google-drive/folders?connection_id=${connectionId}`;
  return await apiCall(endpoint, options);
}

// Update Google Drive settings
export async function updateDriveSettings(
  connectionId: string,
  options: ApiOptions,
  settings: {
    brand_assets_folder_id: string;
    brand_assets_folder_path: string;
  }
) {
  return await apiCall(
    `/api/google-oauth/${connectionId}/settings`,
    options,
    'PATCH',
    settings
  );
}