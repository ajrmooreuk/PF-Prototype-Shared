import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Eye, 
  Edit, 
  Download, 
  Trash2,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface FAQLibraryProps {
  onGenerateNew: () => void;
}

export function FAQLibrary({ onGenerateNew }: FAQLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Mock data
  const faqSets = [
    {
      id: 'faq_1',
      topic: 'AI Visibility Optimization',
      questionCount: 10,
      keywords: ['ai seo', 'chatgpt visibility', 'ai citations'],
      status: 'published',
      created: '2 days ago',
      discoveryEnhanced: true
    },
    {
      id: 'faq_2',
      topic: 'Content Gap Analysis',
      questionCount: 8,
      keywords: ['content gaps', 'seo strategy', 'competitor analysis'],
      status: 'draft',
      created: '5 days ago',
      discoveryEnhanced: false
    },
    {
      id: 'faq_3',
      topic: 'Social Media Best Practices',
      questionCount: 15,
      keywords: ['social media', 'engagement', 'content strategy'],
      status: 'published',
      created: '1 week ago',
      discoveryEnhanced: true
    }
  ];

  const mockQuestions = [
    { id: 'q1', question: 'What is AI visibility optimization?', answer: 'AI visibility optimization is...', schemaStatus: 'valid' },
    { id: 'q2', question: 'How does citation tracking work?', answer: 'Citation tracking monitors...', schemaStatus: 'valid' },
    { id: 'q3', question: 'Why is AI SEO important?', answer: 'AI SEO is important because...', schemaStatus: 'valid' }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-[#6b7280] text-white',
      published: 'bg-[#10b981] text-white',
      archived: 'bg-[#f59e0b] text-white'
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const getSchemaIcon = (status: string) => {
    if (status === 'valid') return <span className="text-[#10b981]">✓</span>;
    if (status === 'warning') return <span className="text-[#f59e0b]">⚠</span>;
    return <span className="text-[#ef4444]">✗</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#005260]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
          FAQ Library
        </h2>
        <Button
          onClick={onGenerateNew}
          className="bg-[#02a4bf] hover:bg-[#028a9f]"
          style={{ fontFamily: 'Poppins', fontSize: '14px' }}
        >
          + Generate New
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="pl-10 rounded-lg"
              style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
            />
          </div>

          {/* Status Filter */}
          <div className="w-[160px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="w-[180px]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most-questions">Most Questions</SelectItem>
                <SelectItem value="topic-az">Topic A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setSortBy('recent');
            }}
            className="text-[#02a4bf]"
            style={{ fontFamily: 'Open Sans', fontSize: '14px' }}
          >
            Clear all
          </Button>
        </div>
      </Card>

      {/* FAQ Sets Table */}
      <Card className="overflow-hidden rounded-xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#005260] hover:bg-[#005260]">
              <TableHead className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                Topic
              </TableHead>
              <TableHead className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                Questions
              </TableHead>
              <TableHead className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                Keywords
              </TableHead>
              <TableHead className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                Status
              </TableHead>
              <TableHead className="text-white" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                Created
              </TableHead>
              <TableHead className="text-white text-right" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqSets.map((faqSet) => (
              <>
                <TableRow 
                  key={faqSet.id}
                  className="hover:bg-[#02a4bf]/10 cursor-pointer"
                  onClick={() => setExpandedRow(expandedRow === faqSet.id ? null : faqSet.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {expandedRow === faqSet.id ? (
                        <ChevronDown className="h-4 w-4 text-[#02a4bf]" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                      <div>
                        <p className="text-[#111827]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                          {faqSet.topic}
                        </p>
                        {faqSet.discoveryEnhanced && (
                          <Badge 
                            variant="secondary" 
                            className="bg-[#eff6ff] text-[#1e40af] text-xs mt-1"
                          >
                            🎯 Discovery Enhanced
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className="bg-[#02a4bf]/10 text-[#02a4bf] hover:bg-[#02a4bf]/20"
                      style={{ fontFamily: 'Poppins', fontSize: '12px' }}
                    >
                      {faqSet.questionCount} questions
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {faqSet.keywords.slice(0, 2).map((keyword, i) => (
                        <Badge 
                          key={i}
                          variant="secondary"
                          className="bg-[#f3f4f6] text-[#374151]"
                          style={{ fontSize: '11px' }}
                        >
                          {keyword}
                        </Badge>
                      ))}
                      {faqSet.keywords.length > 2 && (
                        <Badge 
                          variant="secondary"
                          className="bg-[#f3f4f6] text-[#374151]"
                          style={{ fontSize: '11px' }}
                        >
                          +{faqSet.keywords.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(faqSet.status)}>
                      {faqSet.status.charAt(0).toUpperCase() + faqSet.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                    {faqSet.created}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="h-4 w-4 text-[#6b7280] hover:text-[#02a4bf]" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="h-4 w-4 text-[#6b7280] hover:text-[#02a4bf]" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Download className="h-4 w-4 text-[#6b7280] hover:text-[#02a4bf]" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="h-4 w-4 text-[#6b7280] hover:text-[#ef4444]" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Row - Question List */}
                {expandedRow === faqSet.id && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-[#f9fafb] p-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[5%]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>#</TableHead>
                            <TableHead className="w-[35%]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Question</TableHead>
                            <TableHead className="w-[50%]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Answer Preview</TableHead>
                            <TableHead className="w-[10%]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>Schema</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockQuestions.map((q, index) => (
                            <TableRow key={q.id} className="hover:bg-white">
                              <TableCell className="text-[#6b7280]" style={{ fontFamily: 'Roboto Mono', fontSize: '13px' }}>
                                {index + 1}
                              </TableCell>
                              <TableCell className="text-[#111827]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                                {q.question}
                              </TableCell>
                              <TableCell className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '13px' }}>
                                {q.answer.substring(0, 100)}...
                              </TableCell>
                              <TableCell className="text-center">
                                {getSchemaIcon(q.schemaStatus)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-[#6b7280]" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
          Showing 1-{faqSets.length} of {faqSets.length}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-[#02a4bf] text-white hover:bg-[#028a9f]">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
