import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';

interface ListViewProps {
  posts: any[];
  onViewDetails: (post: any) => void;
  onEdit: (post: any) => void;
  onDelete: (post: any) => void;
}

const platformIcons: { [key: string]: string } = {
  linkedin: '💼',
  twitter: '🐦',
  facebook: '📘',
  instagram: '📷',
};

export function ListView({ posts, onViewDetails, onEdit, onDelete }: ListViewProps) {
  const PAGE_SIZE = 20;
  const [currentPage, setCurrentPage] = React.useState(1);

  const paginatedPosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Scheduled', bg: '#fef3c7', color: '#f59e0b' };
      case 'published':
        return { label: 'Published', bg: '#d1fae5', color: '#10b981' };
      case 'failed':
        return { label: 'Failed', bg: '#fee2e2', color: '#ef4444' };
      default:
        return { label: 'Draft', bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
        <div className="col-span-2">
          <span className="text-gray-600" style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
            Date
          </span>
        </div>
        <div className="col-span-4">
          <span className="text-gray-600" style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
            Content
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-600" style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
            Platforms
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-600" style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
            Status
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-600" style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}>
            Actions
          </span>
        </div>
      </div>

      {/* Table Rows */}
      <div>
        {paginatedPosts.map((post, index) => {
          const { date, time } = formatDateTime(post.scheduled_for);
          const status = getStatusBadge(post.status);

          return (
            <div
              key={post.id}
              className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-[#f0f9fb] transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {/* Date */}
              <div className="col-span-2">
                <div className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600 }}>
                  {date}
                </div>
                <div className="text-gray-500 text-xs" style={{ fontFamily: 'Open Sans' }}>
                  {time}
                </div>
              </div>

              {/* Content */}
              <div className="col-span-4">
                <p
                  className="text-[#231f20] line-clamp-2"
                  style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                >
                  {post.content}
                </p>
              </div>

              {/* Platforms */}
              <div className="col-span-2 flex items-center gap-1">
                {post.platforms?.map((platform: string) => (
                  <span key={platform} className="text-lg">
                    {platformIcons[platform] || '📱'}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center">
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: status.bg,
                    color: status.color,
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {status.label}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-600 hover:text-[#0099b1] transition-colors p-2">
                    <MoreVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails(post)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(post)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(post)}
                      className="text-red-500 focus:text-red-500"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-gray-600" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, posts.length)} of {posts.length} posts
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

// Add React import at the top
import React from 'react';
