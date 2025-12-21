import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, Edit, Download, Share2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Blog {
  id: string;
  title: string;
  featured_image_url?: string;
  word_count: number;
  estimated_reading_time: number;
}

interface BlogPreviewModalProps {
  blog: Blog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onPublish: () => void;
}

export function BlogPreviewModal({ blog, open, onOpenChange, onEdit, onPublish }: BlogPreviewModalProps) {
  const [schemaOpen, setSchemaOpen] = useState(false);

  const mockContent = `
    <h2 id="introduction">Introduction</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    
    <h2 id="key-concepts">Key Concepts</h2>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <h3>Concept 1: Understanding the Basics</h3>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
    
    <h3>Concept 2: Advanced Techniques</h3>
    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.</p>
    
    <h2 id="best-practices">Best Practices</h2>
    <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
    
    <h2 id="conclusion">Conclusion</h2>
    <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
  `;

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'key-concepts', title: 'Key Concepts' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  const faqs = [
    {
      question: 'What is the main topic of this blog?',
      answer: 'This blog covers comprehensive strategies and best practices for the topic at hand.'
    },
    {
      question: 'Who should read this blog?',
      answer: 'This blog is ideal for professionals looking to improve their understanding and implementation of these concepts.'
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "wordCount": blog.word_count,
    "author": {
      "@type": "Organization",
      "name": "BAIV"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] p-0">
        <DialogTitle className="sr-only">{blog.title} - Blog Preview</DialogTitle>
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
            </Button>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
              Preview
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                <Download className="h-4 w-4 mr-2" />
                Export
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>HTML</DropdownMenuItem>
                <DropdownMenuItem>Markdown</DropdownMenuItem>
                <DropdownMenuItem>PDF</DropdownMenuItem>
                <DropdownMenuItem>DOCX</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              onClick={onPublish}
              className="bg-[#02a4bf] hover:bg-[#028a9f]"
              style={{ fontFamily: 'Poppins', fontWeight: 600 }}
            >
              Publish
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8">
            {/* Featured Image */}
            {blog.featured_image_url && (
              <div className="mb-8">
                <img 
                  src={blog.featured_image_url} 
                  alt={blog.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Title */}
            <h1 
              className="text-[#005260] mb-4" 
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px' }}
            >
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-200">
              <span>{blog.word_count.toLocaleString()} words</span>
              <span>•</span>
              <span>{blog.estimated_reading_time} min read</span>
              <span>•</span>
              <span>January 15, 2025</span>
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 
                className="text-[#005260] mb-4" 
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
              >
                Table of Contents
              </h2>
              <nav>
                <ol className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`}
                        className="text-[#02a4bf] hover:underline"
                        style={{ fontFamily: 'Open Sans' }}
                      >
                        {index + 1}. {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              style={{ fontFamily: 'Open Sans' }}
              dangerouslySetInnerHTML={{ __html: mockContent }}
            />

            {/* FAQs */}
            <div className="mb-12">
              <h2 
                className="text-[#005260] mb-6" 
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '28px' }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 
                      className="text-[#005260] mb-2" 
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                    >
                      {faq.question}
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Open Sans' }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schema Markup */}
            <Collapsible open={schemaOpen} onOpenChange={setSchemaOpen}>
              <div className="border border-gray-200 rounded-lg">
                <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#02a4bf]/10 text-[#02a4bf] hover:bg-[#02a4bf]/10">
                      JSON-LD
                    </Badge>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                      Schema Markup
                    </span>
                  </div>
                  <span className="text-gray-400">
                    {schemaOpen ? '−' : '+'}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-4">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                      {JSON.stringify(schemaMarkup, null, 2)}
                    </pre>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
