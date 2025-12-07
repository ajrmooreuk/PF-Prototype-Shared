import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Save, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Blog {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  featured_image_url?: string;
  status: string;
}

interface BlogEditorModalProps {
  blog: Blog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogEditorModal({ blog, open, onOpenChange }: BlogEditorModalProps) {
  const [title, setTitle] = useState(blog.title);
  const [slug, setSlug] = useState(blog.slug);
  const [metaDescription, setMetaDescription] = useState(blog.meta_description);
  const [titleTag, setTitleTag] = useState(blog.title);
  const [status, setStatus] = useState(blog.status);
  const [content, setContent] = useState('<p>Your blog content goes here...</p>');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Blog saved successfully');
    setIsSaving(false);
    onOpenChange(false);
  };

  const handlePublish = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Blog published successfully');
    setIsSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <div className="flex h-full">
          {/* Left Panel - Editor */}
          <div className="flex-1 flex flex-col border-r border-gray-200">
            <DialogHeader className="border-b border-gray-200 px-6 py-4">
              <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                Edit Blog
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Title */}
              <div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog Title"
                  className="text-2xl border-0 px-0 focus-visible:ring-0"
                  style={{ fontFamily: 'Poppins', fontWeight: 600 }}
                />
              </div>

              {/* Content Editor */}
              <div className="border border-gray-200 rounded-lg p-4 min-h-[500px]">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[450px] border-0 focus-visible:ring-0"
                  placeholder="Write your content here..."
                />
              </div>

              {/* Character Count */}
              <div className="text-sm text-gray-500 flex justify-between">
                <span>{content.length} characters</span>
                <span>{content.split(/\s+/).filter(w => w.length > 0).length} words</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Metadata */}
          <div className="w-[400px] flex flex-col bg-gray-50">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                Metadata & Settings
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Slug */}
              <div>
                <Label htmlFor="slug" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  URL Slug
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Meta Description */}
              <div>
                <Label htmlFor="metaDescription" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={160}
                  className="mt-2"
                  rows={3}
                />
                <div className="text-sm text-right mt-1">
                  <span className={metaDescription.length > 160 ? 'text-red-600' : 'text-gray-500'}>
                    {metaDescription.length}/160
                  </span>
                </div>
              </div>

              {/* Title Tag */}
              <div>
                <Label htmlFor="titleTag" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Title Tag
                </Label>
                <Input
                  id="titleTag"
                  value={titleTag}
                  onChange={(e) => setTitleTag(e.target.value)}
                  maxLength={60}
                  className="mt-2"
                />
                <div className="text-sm text-right mt-1">
                  <span className={titleTag.length > 60 ? 'text-red-600' : 'text-gray-500'}>
                    {titleTag.length}/60
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <Label style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Featured Image
                </Label>
                {blog.featured_image_url ? (
                  <div className="mt-2 relative">
                    <img 
                      src={blog.featured_image_url} 
                      alt="Featured"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-white"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                )}
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 p-6 space-y-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                variant="outline"
                className="w-full"
                style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isSaving}
                className="w-full bg-[#02a4bf] hover:bg-[#028a9f]"
                style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
