import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, Download, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MetaDetailModalProps {
  meta: any;
  isOpen: boolean;
  onClose: () => void;
}

export function MetaDetailModal({ meta, isOpen, onClose }: MetaDetailModalProps) {
  const copyField = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copied to clipboard!`);
  };

  const copyAllHTML = () => {
    const html = `<!-- SEO Meta Tags -->
<title>${meta.generated_title}</title>
<meta name="description" content="${meta.meta_description}">
<link rel="canonical" href="https://yourdomain.com/${meta.generated_title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">

<!-- Open Graph -->
<meta property="og:title" content="${meta.generated_title}">
<meta property="og:description" content="${meta.meta_description}">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${meta.generated_title}">
<meta name="twitter:description" content="${meta.meta_description}">`;
    
    navigator.clipboard.writeText(html);
    toast.success('All meta tags copied as HTML!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {meta.discovery_enhanced && (
                <Badge className="bg-[#8b5cf6]/10 text-[#8b5cf6]">
                  🔍 Discovery Enhanced
                </Badge>
              )}
              <Badge className="bg-[#02a4bf] text-white">
                {meta.rrf_impact_score} RRF
              </Badge>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <DialogTitle className="text-[#231f20] mt-3" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}>
            {meta.generated_title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* SEO Tags */}
          <div className="space-y-4">
            <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              SEO Meta Tags
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280] text-sm font-medium">Title Tag</label>
                  <button
                    onClick={() => copyField(meta.generated_title, 'Title')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[#231f20]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  {meta.generated_title}
                </p>
                <span className="text-[#6b7280] text-xs">{meta.generated_title.length}/60</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#6b7280] text-sm font-medium">Meta Description</label>
                  <button
                    onClick={() => copyField(meta.meta_description, 'Description')}
                    className="text-[#02a4bf] hover:text-[#018a9f]"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[#231f20]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                  {meta.meta_description}
                </p>
                <span className="text-[#6b7280] text-xs">{meta.meta_description.length}/160</span>
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <h3 className="text-[#231f20] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              Target Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {meta.keywords.map((keyword: string, i: number) => (
                <Badge key={i} variant="secondary" className="bg-[#e6f7f9] text-[#02a4bf]">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Platform Scores */}
          <div>
            <h3 className="text-[#231f20] mb-3" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
              AI Platform Optimization
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(meta.platform_scores).map(([platform, score]) => (
                <div key={platform} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="capitalize text-[#231f20] font-medium">{platform}</p>
                    <div className={`text-2xl font-bold ${(score as number) > 80 ? 'text-[#10b981]' : (score as number) > 60 ? 'text-[#f59e0b]' : 'text-[#6b7280]'}`}>
                      {score}%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xl font-bold">{platform[0].toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t mt-6">
          <div className="text-sm text-[#6b7280]">
            <p>Created: {meta.created_at}</p>
            <p>Client: {meta.client_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={copyAllHTML}
              variant="outline"
              className="border-[#02a4bf] text-[#02a4bf]"
            >
              <Download className="h-4 w-4 mr-2" />
              Export HTML
            </Button>
            <Button
              className="bg-[#02a4bf] hover:bg-[#018a9f] text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="ghost"
              className="text-[#ef4444] hover:text-[#ef4444] hover:bg-[#ef4444]/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
