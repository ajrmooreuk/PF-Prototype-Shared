import { useState, useEffect } from 'react';
import { X, Search, Grid3x3, List, ChevronRight, ChevronDown, Star, Clock, Folder, Image as ImageIcon, Video, FileText, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import {
  loadDriveFolders,
  loadDriveFiles,
  searchDriveFiles,
  getMultipleFileUrls,
  initiateGoogleDriveConnection,
} from '../lib/googleDriveAPI';

interface GoogleDriveFile {
  id: string;
  name: string;
  mime_type: string;
  file_extension: string;
  size: number;
  size_readable: string;
  thumbnail_link?: string;
  icon_link?: string;
  download_url: string;
  web_view_link: string;
  created_time: string;
  modified_time: string;
  is_starred?: boolean;
  parent_folder_id?: string;
}

interface GoogleDriveFolder {
  id: string;
  name: string;
  mime_type?: string;
  parent_id?: string;
  subfolders?: GoogleDriveFolder[];
  isExpanded?: boolean;
}

interface GoogleDrivePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (files: any[]) => void;
  connectionId: string | null;
  connectedEmail?: string;
  tenantId: string;
  jwtToken: string;
  maxSelections?: number;
  acceptedTypes?: ('image' | 'video' | 'document')[];
}

export function GoogleDrivePickerModal({
  isOpen,
  onClose,
  onInsert,
  connectionId,
  connectedEmail = 'company@example.com',
  tenantId,
  jwtToken,
  maxSelections = 10,
  acceptedTypes = ['image', 'video', 'document']
}: GoogleDrivePickerModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<GoogleDriveFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [currentFolder, setCurrentFolder] = useState('root');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInserting, setIsInserting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [folders, setFolders] = useState<GoogleDriveFolder[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<GoogleDriveFolder[]>([{ id: 'root', name: 'My Drive' }]);
  const [error, setError] = useState<string | null>(null);

  const isConnected = connectionId !== null;

  // Load folders when modal opens or folder changes
  useEffect(() => {
    if (isOpen && isConnected && connectionId) {
      loadFolders(currentFolder);
    }
  }, [isOpen, isConnected, connectionId, currentFolder]);

  // Load files when modal opens, folder changes, or filter changes
  useEffect(() => {
    if (isOpen && isConnected && connectionId) {
      if (searchQuery) {
        performSearch();
      } else {
        loadFiles();
      }
    }
  }, [isOpen, isConnected, connectionId, currentFolder, activeFilter, sortBy]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery) return;
    
    const timer = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadFolders = async (parentId: string) => {
    if (!connectionId) return;

    try {
      setError(null);
      const data = await loadDriveFolders(connectionId, { tenantId, jwtToken }, parentId);
      setFolders(data.folders || []);
      if (data.breadcrumb) {
        setBreadcrumb(data.breadcrumb);
      }
    } catch (err: any) {
      console.error('Error loading folders:', err);
      setError(err.message || 'Failed to load folders');
      toast.error('Failed to load folders');
    }
  };

  const loadFiles = async () => {
    if (!connectionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await loadDriveFiles(connectionId, { tenantId, jwtToken }, {
        folderId: currentFolder === 'root' ? undefined : currentFolder,
        fileType: activeFilter === 'all' ? undefined : activeFilter,
        sortBy: sortBy as any,
        pageSize: 50,
      });

      setFiles(data.files || []);
    } catch (err: any) {
      console.error('Error loading files:', err);
      setError(err.message || 'Failed to load files');
      toast.error('Failed to load files');
    } finally {
      setIsLoading(false);
    }
  };

  const performSearch = async () => {
    if (!connectionId || !searchQuery) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchDriveFiles(
        connectionId,
        { tenantId, jwtToken },
        searchQuery,
        activeFilter === 'all' ? undefined : activeFilter,
        currentFolder === 'root' ? undefined : currentFolder
      );

      setFiles(data.results || []);
    } catch (err: any) {
      console.error('Error searching files:', err);
      setError(err.message || 'Failed to search files');
      toast.error('Failed to search files');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFileSelection = (file: GoogleDriveFile) => {
    if (selectedFiles.find(f => f.id === file.id)) {
      setSelectedFiles(selectedFiles.filter(f => f.id !== file.id));
    } else {
      if (selectedFiles.length < maxSelections) {
        setSelectedFiles([...selectedFiles, file]);
      } else {
        toast.warning(`Maximum ${maxSelections} files can be selected`);
      }
    }
  };

  const handleInsert = async () => {
    if (!connectionId || selectedFiles.length === 0) return;

    setIsInserting(true);

    try {
      // Get download URLs for all selected files
      const fileUrls = await getMultipleFileUrls(
        selectedFiles.map(f => f.id),
        connectionId,
        { tenantId, jwtToken }
      );

      // Format files for insertion
      const formattedFiles = fileUrls.map((urlData, index) => ({
        id: urlData.file_id,
        name: urlData.file_name,
        type: getFileType(urlData.mime_type),
        extension: selectedFiles[index].file_extension.toUpperCase(),
        size: urlData.size,
        thumbnailUrl: urlData.thumbnail_url || urlData.public_url,
        downloadUrl: urlData.download_url,
        publicUrl: urlData.public_url,
        mimeType: urlData.mime_type,
        source: 'google_drive',
      }));

      onInsert(formattedFiles);
      setSelectedFiles([]);
      onClose();
      toast.success(`${formattedFiles.length} file(s) added from Drive`);
    } catch (err: any) {
      console.error('Error inserting files:', err);
      toast.error(err.message || 'Failed to insert files');
    } finally {
      setIsInserting(false);
    }
  };

  const handleConnect = async () => {
    try {
      const authUrl = await initiateGoogleDriveConnection(tenantId, jwtToken);
      window.location.href = authUrl;
    } catch (err: any) {
      console.error('Error connecting to Google Drive:', err);
      toast.error('Failed to initiate connection');
    }
  };

  const getFileType = (mimeType: string): 'image' | 'video' | 'document' => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    return 'document';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[900px] h-[600px] max-w-[95vw] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {/* Google Drive Logo */}
            <svg width="24" height="24" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
              <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
              <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
              <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
              <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
              <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
            </svg>
            <div>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px', color: '#1a1a1a' }}>
                Select from Google Drive
              </h2>
              {isConnected && (
                <p style={{ fontFamily: 'Open Sans', fontSize: '13px', color: '#6B7280' }}>
                  {connectedEmail}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {!isConnected ? (
          // Not Connected State
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <svg width="80" height="80" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
              </svg>
              
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '22px', color: '#1a1a1a' }} className="mb-3">
                Connect Google Drive
              </h3>
              
              <p style={{ fontFamily: 'Open Sans', fontSize: '15px', color: '#6B7280' }} className="mb-6">
                Access your brand assets by connecting your Google Drive account
              </p>
              
              <div className="text-left mb-8 inline-block">
                {['Quick access to brand assets', 'No need to download and re-upload', 'Always up-to-date files'].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-[#2990C6]" />
                    <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#6B7280' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={handleConnect}
                className="bg-[#2990C6] hover:bg-[#2176AD] text-white h-12 px-8 text-base"
                style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              >
                Connect Google Drive
              </Button>
              
              <button 
                className="mt-4 text-[#2990C6] underline text-sm"
                style={{ fontFamily: 'Open Sans' }}
              >
                Learn more about permissions
              </button>
            </div>
          </div>
        ) : (
          // Connected State - Two Column Layout
          <div className="flex-1 flex overflow-hidden">
            {/* Left Column: Folder Navigation */}
            <div className="w-[280px] bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
              {/* Quick Access */}
              <div className="mb-4">
                <p style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px', color: '#6B7280' }} className="uppercase mb-2">
                  Quick Access
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => setCurrentFolder('root')}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors text-left"
                    style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#1a1a1a' }}
                  >
                    <Folder className="w-4 h-4 text-[#2990C6]" />
                    My Drive
                  </button>
                </div>
              </div>

              {/* Folder Tree */}
              {folders.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <FolderTree 
                    folders={folders} 
                    currentFolder={currentFolder} 
                    onFolderClick={setCurrentFolder}
                    level={0}
                  />
                </div>
              )}
            </div>

            {/* Right Column: File Grid */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* View Controls */}
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  {/* File Type Filters */}
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: 'All Files' },
                      { value: 'image', label: 'Images', icon: '🖼️' },
                      { value: 'video', label: 'Videos', icon: '🎥' },
                      { value: 'document', label: 'Documents', icon: '📄' }
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value as any)}
                        className={`px-3 py-1.5 rounded-full transition-colors ${
                          activeFilter === filter.value
                            ? 'bg-[#2990C6] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '13px' }}
                      >
                        {filter.icon && <span className="mr-1">{filter.icon}</span>}
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* View Switcher */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`w-8 h-8 flex items-center justify-center transition-colors ${
                        viewMode === 'grid' ? 'bg-[#2990C6] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`w-8 h-8 flex items-center justify-center transition-colors border-l border-gray-300 ${
                        viewMode === 'list' ? 'bg-[#2990C6] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="pl-10"
                    style={{ fontFamily: 'Open Sans' }}
                  />
                </div>
              </div>

              {/* File Display */}
              <div className="flex-1 overflow-y-auto p-5">
                {error ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', color: '#e84e1c' }}>
                      {error}
                    </p>
                    <Button onClick={loadFiles} className="mt-4">
                      Try Again
                    </Button>
                  </div>
                ) : isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="w-12 h-12 text-[#2990C6] animate-spin mb-4" />
                    <p style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#6B7280' }}>
                      Loading files...
                    </p>
                  </div>
                ) : files.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Folder className="w-16 h-16 text-gray-300 mb-4" />
                    <p style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', color: '#6B7280' }}>
                      {searchQuery ? 'No files found' : 'This folder is empty'}
                    </p>
                    <p style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#9CA3AF' }} className="mt-2">
                      {searchQuery ? 'Try a different search term' : 'Try a different folder or upload files to Drive'}
                    </p>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-4 gap-5">
                    {files.map(file => (
                      <FileCardGrid
                        key={file.id}
                        file={file}
                        isSelected={!!selectedFiles.find(f => f.id === file.id)}
                        onToggle={() => toggleFileSelection(file)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map(file => (
                      <FileCardList
                        key={file.id}
                        file={file}
                        isSelected={!!selectedFiles.find(f => f.id === file.id)}
                        onToggle={() => toggleFileSelection(file)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {isConnected && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#6B7280' }}>
                {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
              </span>
              {selectedFiles.length > 0 && (
                <button
                  onClick={() => setSelectedFiles([])}
                  className="text-[#2990C6] hover:underline text-sm"
                  style={{ fontFamily: 'Open Sans' }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="h-10"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleInsert}
                disabled={selectedFiles.length === 0 || isInserting}
                className="bg-[#2990C6] hover:bg-[#2176AD] text-white h-10 transition-transform hover:scale-105"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                {isInserting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Inserting...
                  </>
                ) : (
                  `Insert ${selectedFiles.length} ${selectedFiles.length === 1 ? 'File' : 'Files'}`
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Folder Tree Component
function FolderTree({ 
  folders, 
  currentFolder, 
  onFolderClick, 
  level 
}: { 
  folders: GoogleDriveFolder[]; 
  currentFolder: string; 
  onFolderClick: (id: string) => void;
  level: number;
}) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleExpand = (folderId: string) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter(id => id !== folderId));
    } else {
      setExpandedFolders([...expandedFolders, folderId]);
    }
  };

  return (
    <div>
      {folders.map(folder => (
        <div key={folder.id}>
          <button
            onClick={() => {
              onFolderClick(folder.id);
              if (folder.subfolders) toggleExpand(folder.id);
            }}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-left ${
              currentFolder === folder.id
                ? 'bg-blue-50 text-blue-900 border-l-3 border-[#2990C6]'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            style={{ 
              fontFamily: 'Open Sans', 
              fontSize: '14px',
              paddingLeft: `${8 + (level * 16)}px`
            }}
          >
            {folder.subfolders && folder.subfolders.length > 0 && (
              expandedFolders.includes(folder.id) ? 
                <ChevronDown className="w-3 h-3 flex-shrink-0" /> : 
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
            )}
            <Folder className="w-4 h-4 flex-shrink-0 text-blue-500" />
            <span className="truncate">{folder.name}</span>
          </button>
          {folder.subfolders && expandedFolders.includes(folder.id) && (
            <FolderTree 
              folders={folder.subfolders} 
              currentFolder={currentFolder} 
              onFolderClick={onFolderClick}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Grid View File Card
function FileCardGrid({ 
  file, 
  isSelected, 
  onToggle 
}: { 
  file: GoogleDriveFile; 
  isSelected: boolean; 
  onToggle: () => void;
}) {
  const getFileIcon = () => {
    if (file.mime_type.startsWith('video/')) {
      return <Video className="w-8 h-8 text-gray-400" />;
    } else if (file.mime_type.includes('pdf') || file.mime_type.includes('document')) {
      return <FileText className="w-8 h-8 text-gray-400" />;
    }
    return <ImageIcon className="w-8 h-8 text-gray-400" />;
  };

  const thumbnail = file.thumbnail_link || (file.mime_type.startsWith('image/') ? file.download_url : null);

  return (
    <button
      onClick={onToggle}
      className={`group relative bg-white rounded-lg border-2 transition-all hover:shadow-md hover:scale-105 ${
        isSelected ? 'border-[#2990C6]' : 'border-gray-200'
      }`}
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center relative">
        {thumbnail ? (
          <img src={thumbnail} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          getFileIcon()
        )}
        {file.mime_type.startsWith('video/') && thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
              <Video className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        )}
        {/* Checkbox */}
        <div className={`absolute top-2 right-2 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          isSelected 
            ? 'bg-[#2990C6] border-[#2990C6]' 
            : 'bg-white border-gray-300 group-hover:border-[#2990C6]'
        }`}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
      
      {/* Info */}
      <div className="p-2">
        <p 
          className="text-left text-sm text-gray-900 truncate mb-1" 
          style={{ fontFamily: 'Open Sans' }}
          title={file.name}
        >
          {file.name}
        </p>
        <span 
          className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
          style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
        >
          {file.file_extension.toUpperCase()}
        </span>
      </div>
    </button>
  );
}

// List View File Card
function FileCardList({ 
  file, 
  isSelected, 
  onToggle 
}: { 
  file: GoogleDriveFile; 
  isSelected: boolean; 
  onToggle: () => void;
}) {
  const getFileIcon = () => {
    if (file.mime_type.startsWith('video/')) {
      return <Video className="w-5 h-5 text-gray-400" />;
    } else if (file.mime_type.includes('pdf') || file.mime_type.includes('document')) {
      return <FileText className="w-5 h-5 text-gray-400" />;
    }
    return <ImageIcon className="w-5 h-5 text-gray-400" />;
  };

  const thumbnail = file.thumbnail_link || (file.mime_type.startsWith('image/') ? file.download_url : null);

  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      {/* Checkbox */}
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        isSelected ? 'bg-[#2990C6] border-[#2990C6]' : 'bg-white border-gray-300'
      }`}>
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>

      {/* Thumbnail */}
      <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
        {thumbnail ? (
          <img src={thumbnail} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          getFileIcon()
        )}
      </div>

      {/* File name */}
      <p className="flex-1 text-left truncate" style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#1a1a1a' }}>
        {file.name}
      </p>

      {/* File type */}
      <span className="w-20 text-right text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
        {file.file_extension.toUpperCase()}
      </span>

      {/* File size */}
      <span className="w-20 text-right text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
        {file.size_readable}
      </span>

      {/* Date */}
      <span className="w-32 text-right text-sm text-gray-500" style={{ fontFamily: 'Open Sans' }}>
        {new Date(file.modified_time).toLocaleDateString()}
      </span>
    </button>
  );
}
