import { PostPill } from './PostPill';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

interface CalendarGridProps {
  currentMonth: number;
  currentYear: number;
  posts: any[];
  onDateClick: (date: Date) => void;
  onPostClick: (post: any) => void;
  onMonthChange: (month: number, year: number) => void;
}

export function CalendarGrid({
  currentMonth,
  currentYear,
  posts,
  onDateClick,
  onPostClick,
  onMonthChange,
}: CalendarGridProps) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(
      currentMonth === 1 ? 12 : currentMonth - 1,
      currentMonth === 1 ? currentYear - 1 : currentYear
    );
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        isCurrentMonth: false,
        month: currentMonth === 1 ? 12 : currentMonth - 1,
        year: currentMonth === 1 ? currentYear - 1 : currentYear,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        month: currentMonth,
        year: currentYear,
      });
    }

    // Next month days
    const remainingDays = 35 - days.length; // 5 weeks
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        month: currentMonth === 12 ? 1 : currentMonth + 1,
        year: currentMonth === 12 ? currentYear + 1 : currentYear,
      });
    }

    return days;
  };

  const getPostsForDate = (day: any) => {
    const dateStr = `${day.year}-${String(day.month).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
    return posts.filter(post => {
      const postDate = new Date(post.scheduled_for).toISOString().split('T')[0];
      return postDate === dateStr;
    });
  };

  const isToday = (day: any) => {
    const today = new Date();
    return day.date === today.getDate() && 
           day.month === today.getMonth() + 1 && 
           day.year === today.getFullYear();
  };

  const isPast = (day: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cellDate = new Date(day.year, day.month - 1, day.date);
    return cellDate < today;
  };

  const calendarDays = generateCalendarDays();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  const handleToday = () => {
    const today = new Date();
    onMonthChange(today.getMonth() + 1, today.getFullYear());
  };

  return (
    <div>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevMonth}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-[#0099b1] hover:text-white hover:border-[#0099b1] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-[#231f20]" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '24px' }}>
            {monthNames[currentMonth - 1]} {currentYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-[#0099b1] hover:text-white hover:border-[#0099b1] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleToday}
            variant="outline"
            className="h-10 border-[#0099b1] text-[#0099b1] hover:bg-[#0099b1] hover:text-white"
            style={{ fontFamily: 'Poppins', fontSize: '14px', fontWeight: 500 }}
          >
            Today
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-px mb-4 pb-3 border-b border-gray-200">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-[#6b7280] uppercase"
              style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500 }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const dayPosts = getPostsForDate(day);
            const isTodayCell = isToday(day);
            const isPastCell = isPast(day);

            return (
              <div
                key={index}
                onClick={() => {
                  if (day.isCurrentMonth && !isPastCell) {
                    onDateClick(new Date(day.year, day.month - 1, day.date));
                  }
                }}
                className={`
                  min-h-[120px] p-3 border rounded-lg transition-all
                  ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                  ${isTodayCell ? 'border-[3px] border-[#0099b1] bg-[#e6f7f9]' : 'border-gray-200'}
                  ${day.isCurrentMonth && !isPastCell ? 'cursor-pointer hover:bg-[#f0f9fb]' : ''}
                  ${isPastCell ? 'opacity-60' : ''}
                `}
              >
                <div
                  className={`text-right mb-2 ${isTodayCell ? 'text-[#0099b1]' : day.isCurrentMonth ? 'text-[#231f20]' : 'text-gray-400'}`}
                  style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 600 }}
                >
                  {day.date}
                </div>

                <div className="space-y-2">
                  {dayPosts.slice(0, 3).map((post) => (
                    <PostPill key={post.id} post={post} onClick={() => onPostClick(post)} />
                  ))}
                  {dayPosts.length > 3 && (
                    <div className="text-center py-1 px-2 bg-gray-100 text-[#231f20] rounded text-xs">
                      +{dayPosts.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
