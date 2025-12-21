// Google Drive API Integration
// Base URL for API calls
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

// Check if Google Drive is connected
export async function checkGoogleDriveConnection(options: ApiOptions) {
  try {
    const data = await apiCall('/api/google-oauth/connections/stats', options);
    return {
      isConnected: data.connections && data.connections.length > 0,
      connectionId: data.connections?.[0]?.id || null,
      userEmail: data.connections?.[0]?.user_email || null,
    };
  } catch (error) {
    // TODO: Implement GET /api/google-oauth/connections/stats endpoint in backend
    // For now, silently return "not connected" state
    // console.error('Error checking Google Drive connection:', error);
    return { isConnected: false, connectionId: null, userEmail: null };
  }
}

// Load folders for navigation
export async function loadDriveFolders(
  connectionId: string,
  options: ApiOptions,
  parentId: string = 'root'
) {
  const endpoint = `/api/google-drive/folders?connection_id=${connectionId}&parent_id=${parentId}`;
  return apiCall(endpoint, options);
}

// Load files in a folder
export async function loadDriveFiles(
  connectionId: string,
  options: ApiOptions,
  params: {
    folderId?: string;
    fileType?: 'image' | 'video' | 'document' | 'all';
    pageSize?: number;
    pageToken?: string;
    sortBy?: 'name' | 'modified_time' | 'created_time' | 'size';
  } = {}
) {
  const queryParams = new URLSearchParams({
    connection_id: connectionId,
  });

  if (params.folderId) queryParams.append('folder_id', params.folderId);
  if (params.fileType && params.fileType !== 'all') queryParams.append('file_type', params.fileType);
  if (params.pageSize) queryParams.append('page_size', params.pageSize.toString());
  if (params.pageToken) queryParams.append('page_token', params.pageToken);
  if (params.sortBy) queryParams.append('sort_by', params.sortBy);

  const endpoint = `/api/google-drive/files?${queryParams.toString()}`;
  return apiCall(endpoint, options);
}

// Search files
export async function searchDriveFiles(
  connectionId: string,
  options: ApiOptions,
  query: string,
  fileType?: 'image' | 'video' | 'document' | 'all',
  folderId?: string
) {
  const body = {
    connection_id: connectionId,
    query,
    file_type: fileType || 'all',
    folder_id: folderId || null,
    page_size: 50,
  };

  return apiCall('/api/google-drive/search', options, 'POST', body);
}

// Get file download URL
export async function getFileDownloadUrl(
  fileId: string,
  connectionId: string,
  options: ApiOptions
) {
  const endpoint = `/api/google-drive/files/${fileId}/url?connection_id=${connectionId}`;
  return apiCall(endpoint, options);
}

// Get multiple file URLs at once
export async function getMultipleFileUrls(
  fileIds: string[],
  connectionId: string,
  options: ApiOptions
) {
  const promises = fileIds.map(fileId =>
    getFileDownloadUrl(fileId, connectionId, options)
  );
  return Promise.all(promises);
}

// Initiate OAuth connection
export async function initiateGoogleDriveConnection(tenantId: string, jwtToken: string) {
  const response = await fetch(`${API_BASE_URL}/api/google-oauth/auth/url`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tenant_id: tenantId }),
  });

  if (!response.ok) {
    throw new Error('Failed to initiate Google Drive connection');
  }

  const data = await response.json();
  return data.authorization_url;
}

// Disconnect Google Drive
export async function disconnectGoogleDrive(
  connectionId: string,
  options: ApiOptions
) {
  return apiCall(`/api/google-oauth/${connectionId}/disconnect`, options, 'POST');
}