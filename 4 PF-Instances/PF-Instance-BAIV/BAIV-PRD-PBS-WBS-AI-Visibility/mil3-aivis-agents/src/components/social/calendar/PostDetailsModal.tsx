import { X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';
import { useState } from 'react';

interface PostDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onDelete: () => void;
  onEdit: () => void;
}

const platformInfo: { [key: string]: { name: string; icon: string; color: string } } = {
  linkedin: { name: 'LinkedIn', icon: '💼', color: '#0077b5' },
  twitter: { name: 'Twitter/X', icon: '🐦', color: '#000000' },
  facebook: { name: 'Facebook', icon: '📘', color: '#1877f2' },
  instagram: { name: 'Instagram', icon: '📷', color: '#e4405f' },
};

export function PostDetailsModal({
  isOpen,
  onClose,
  post,
  onDelete,
  onEdit,
}: PostDetailsModalProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!post) return null;

  const getScheduledTime = () => {
    return new Date(post.scheduled_for).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusBadge = () => {
    switch (post.status) {
      case 'pending':
        return { label: 'Scheduled', color: '#f59e0b', bg: '#fef3c7' };
      case 'published':
        return { label: 'Published', color: '#10b981', bg: '#d1fae5' };
      case 'failed':
        return { label: 'Failed', color: '#ef4444', bg: '#fee2e2' };
      default:
        return { label: 'Draft', color: '#6b7280', bg: '#f3f4f6' };
    }
  };

  const statusBadge = getStatusBadge();
  const isScheduled = post.status === 'pending';

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[700px] p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">Post Details - {post.platforms?.join(', ')}</DialogTitle>
          {/* Header */}
          <div className="bg-[#0099b1] p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {post.platforms?.map((platform: string) => {
                  const info = platformInfo[platform];
                  return info ? (
                    <span key={platform} className="text-2xl">{info.icon}</span>
                  ) : null;
                })}
              </div>
              <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="px-3 py-1 rounded-full inline-block"
              style={{
                backgroundColor: statusBadge.bg,
                color: statusBadge.color,
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {statusBadge.label} for {getScheduledTime()}
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="max-h-[60vh]">
            <div className="p-6 space-y-6">
              {/* Post Content */}
              <div>
                <h3
                  className="text-[#231f20] mb-3"
                  style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 600 }}
                >
                  Content
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p
                    className="text-[#374151] whitespace-pre-wrap"
                    style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
                  >
                    {post.content}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div>
                <h3
                  className="text-[#231f20] mb-3"
                  style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 600 }}
                >
                  Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Platforms</div>
                    <div className="flex items-center gap-2">
                      {post.platforms?.map((platform: string) => {
                        const info = platformInfo[platform];
                        return info ? (
                          <span
                            key={platform}
                            className="px-2 py-1 rounded text-white text-xs"
                            style={{ backgroundColor: info.color, fontFamily: 'Open Sans' }}
                          >
                            {info.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-sm mb-1">Scheduled</div>
                    <div className="text-[#231f20]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                      {getScheduledTime()}
                    </div>
                  </div>

                  {post.postiz_post_id && (
                    <div className="col-span-2">
                      <div className="text-gray-500 text-sm mb-1">Postiz ID</div>
                      <div
                        className="text-gray-600 font-mono text-xs"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {post.postiz_post_id}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-5 border-t border-gray-200 flex items-center justify-between">
            {post.postiz_post_id && (
              <Button
                onClick={() => window.open(`https://social.eccoai.ai/posts/${post.postiz_post_id}`, '_blank')}
                variant="outline"
                className="text-gray-600"
                style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View in Postiz
              </Button>
            )}

            <div className="flex gap-2 ml-auto">
              {isScheduled && (
                <Button
                  onClick={onEdit}
                  className="bg-[#0099b1] hover:bg-[#007a8c] text-white h-10"
                  style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => setShowDeleteDialog(true)}
                className="bg-red-500 hover:bg-red-600 text-white h-10"
                style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be removed from all platforms.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
