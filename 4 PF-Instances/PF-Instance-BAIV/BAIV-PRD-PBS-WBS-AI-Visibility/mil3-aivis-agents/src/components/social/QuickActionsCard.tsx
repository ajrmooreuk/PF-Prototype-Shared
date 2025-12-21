import { FileText, BarChart3, Calendar } from 'lucide-react';

export function QuickActionsCard() {
  const actions = [
    {
      label: 'View All Posts',
      icon: FileText,
      onClick: () => {
        // Navigate to /social-media/posts
        window.alert('Navigate to Posts page (to be implemented)');
      },
      variant: 'primary' as const
    },
    {
      label: 'Analytics Dashboard',
      icon: BarChart3,
      onClick: () => {
        // Navigate to /social-media/analytics
        window.alert('Navigate to Analytics page (to be implemented)');
      },
      variant: 'secondary' as const
    },
    {
      label: 'Postiz Calendar',
      icon: Calendar,
      onClick: () => {
        // Open Postiz calendar
        window.open('https://social.eccoai.ai/calendar', '_blank');
      },
      variant: 'secondary' as const
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-[#005260] mb-4" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
        Quick Actions
      </h3>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                action.variant === 'primary'
                  ? 'bg-[#02a4bf] hover:bg-[#028a9f] text-white'
                  : 'bg-white hover:bg-[#02a4bf]/5 text-[#02a4bf] border-2 border-[#02a4bf]'
              }`}
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
