import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Copy, Download, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface JSONPreviewProps {
  schema: any;
  validationStatus: 'valid' | 'invalid' | 'pending' | 'not-generated';
  onSave: () => void;
}

export function JSONPreview({ schema, validationStatus, onSave }: JSONPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      setCopied(true);
      toast.success('Schema copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (schema) {
      const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `schema-${schema['@type']}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      toast.success('Schema downloaded!');
    }
  };

  const handleTest = () => {
    if (schema) {
      const encoded = encodeURIComponent(JSON.stringify(schema));
      window.open(`https://search.google.com/test/rich-results?code=${encoded}`, '_blank');
    }
  };

  const getStatusBadge = () => {
    const styles = {
      valid: { bg: '#10b981', text: 'Valid ✓' },
      invalid: { bg: '#ef4444', text: 'Invalid ✗' },
      pending: { bg: '#f59e0b', text: 'Pending...' },
      'not-generated': { bg: '#6b7280', text: 'Not Generated' }
    };
    const style = styles[validationStatus];
    return (
      <Badge style={{ backgroundColor: style.bg }} className="text-white">
        {style.text}
      </Badge>
    );
  };

  const syntaxHighlight = (json: string) => {
    return json
      .replace(/"([^"]+)":/g, '<span class="text-[#02a4bf]">"$1":</span>')
      .replace(/: "([^"]*)"/g, ': <span class="text-[#10b981]">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="text-[#f59e0b]">$1</span>')
      .replace(/: (true|false)/g, ': <span class="text-[#8b5cf6]">$1</span>')
      .replace(/@context|@type/g, '<span class="text-[#3b82f6]">$&</span>');
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }}>
          Schema Preview
        </h3>
        {getStatusBadge()}
      </div>

      {/* Preview Box */}
      <div className="relative">
        {!schema ? (
          <div className="bg-[#1e1e1e] rounded-lg p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
            <span className="text-5xl mb-4">📋</span>
            <p className="text-gray-400" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Fill out form and generate schema
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white z-10"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            <div className="bg-[#1e1e1e] rounded-lg p-4 max-h-[600px] overflow-auto">
              <pre className="text-[#e2e8f0] text-xs" style={{ fontFamily: 'Roboto Mono', lineHeight: '1.6' }}>
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(schema, null, 2)) }} />
              </pre>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      {schema && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Button
            onClick={handleTest}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Test
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
          <Button
            onClick={onSave}
            size="sm"
            className="bg-[#02a4bf] hover:bg-[#018a9f] text-white text-xs"
          >
            Save
          </Button>
        </div>
      )}
    </Card>
  );
}
