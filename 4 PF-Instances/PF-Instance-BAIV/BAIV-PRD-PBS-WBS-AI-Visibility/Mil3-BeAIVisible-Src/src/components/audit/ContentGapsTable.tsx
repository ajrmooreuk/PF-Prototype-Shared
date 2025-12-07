import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Download, Filter } from 'lucide-react';

interface ContentGap {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  gapType: string;
  rrfScore: number;
  impact: string;
}

interface ContentGapsTableProps {
  gaps: ContentGap[];
}

export function ContentGapsTable({ gaps }: ContentGapsTableProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-500 text-white hover:bg-red-500';
      case 'MEDIUM':
        return 'bg-yellow-500 text-white hover:bg-yellow-500';
      case 'LOW':
        return 'bg-blue-500 text-white hover:bg-blue-500';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return '🔴';
      case 'MEDIUM':
        return '🟡';
      case 'LOW':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const getRRFScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#e84e1c]';
    if (score >= 60) return 'text-yellow-500';
    return 'text-gray-500';
  };

  return (
    <Card className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 
            className="text-[#005260] mb-1" 
            style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px' }}
          >
            🎯 Content Opportunities - RRF Optimized
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9fafb] border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Priority
              </th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Gap Title
              </th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Gap Type
              </th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                RRF Score
              </th>
              <th className="text-left py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Impact
              </th>
              <th className="text-right py-3 px-4 text-gray-600 text-sm" style={{ fontFamily: 'Open Sans', fontWeight: 600 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {gaps.map((gap, index) => (
              <tr 
                key={gap.id}
                className={`border-b border-gray-100 hover:bg-[#f0f9fa] transition-colors cursor-pointer ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                }`}
                style={{ height: '72px' }}
              >
                <td className="py-4 px-4">
                  <Badge 
                    className={`${getPriorityColor(gap.priority)} px-3 py-1 rounded-full`}
                    style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '12px' }}
                  >
                    {getPriorityIcon(gap.priority)} {gap.priority}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <span 
                    className="text-[#005260]"
                    style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '14px' }}
                  >
                    {gap.title}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Badge 
                    className="bg-[#02a4bf]/10 text-[#02a4bf] hover:bg-[#02a4bf]/10 border-0"
                    style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                  >
                    {gap.gapType}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <span 
                    className={getRRFScoreColor(gap.rrfScore)}
                    style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px' }}
                  >
                    {gap.rrfScore}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-600 text-sm" style={{ fontFamily: 'Open Sans' }}>
                    {gap.impact}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      className="bg-[#02a4bf] hover:bg-[#028a9f] text-white"
                      style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                    >
                      {gap.priority === 'HIGH' ? 'Create Content' : gap.gapType === 'Platform' ? 'Optimize' : 'Create'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-600 hover:text-[#02a4bf] hover:bg-[#02a4bf]/5"
                      style={{ fontFamily: 'Open Sans', fontWeight: 600 }}
                    >
                      Details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-600" style={{ fontFamily: 'Open Sans' }}>
        <span>Showing 4 of 12 gaps</span>
        <div className="flex items-center gap-1 ml-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-[#02a4bf] text-white hover:bg-[#028a9f] hover:text-white">
            1
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            2
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            3
          </Button>
          <span>...</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            →
          </Button>
        </div>
      </div>
    </Card>
  );
}
