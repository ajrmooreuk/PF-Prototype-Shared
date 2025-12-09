import { Lightbulb, Check, Bot, Calendar } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total_ideas: number;
    ready_to_schedule: number;
    ai_generated: number;
    scheduled: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const aiPercentage = stats.total_ideas > 0 
    ? Math.round((stats.ai_generated / stats.total_ideas) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {/* Total Ideas */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#e6f7f9] flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-[#02a4bf]" />
          </div>
          <div>
            <div
              className="text-[#231f20]"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}
            >
              {stats.total_ideas}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Total Ideas
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Schedule */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <Check className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <div
              className="text-green-500"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}
            >
              {stats.ready_to_schedule}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Ready to Schedule
            </div>
          </div>
        </div>
      </div>

      {/* AI Generated */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div
              className="text-purple-500"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}
            >
              {stats.ai_generated}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              AI Generated
            </div>
            <div className="text-gray-400 mt-0.5" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
              {aiPercentage}% of library
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div
              className="text-orange-500"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', lineHeight: '1' }}
            >
              {stats.scheduled}
            </div>
            <div className="text-gray-600 mt-1" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
              Scheduled Posts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
