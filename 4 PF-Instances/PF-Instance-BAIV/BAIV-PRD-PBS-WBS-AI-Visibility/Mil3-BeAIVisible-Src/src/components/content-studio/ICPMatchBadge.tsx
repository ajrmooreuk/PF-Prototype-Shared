import { Target } from 'lucide-react';

interface ICPMatchBadgeProps {
  score: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ICPMatchBadge({ score, showIcon = true, size = 'sm' }: ICPMatchBadgeProps) {
  const getMatchLevel = (score: number) => {
    if (score >= 80) return { label: 'High Match', color: 'bg-green-500', textColor: 'text-white' };
    if (score >= 50) return { label: 'Medium Match', color: 'bg-yellow-500', textColor: 'text-gray-900' };
    return { label: 'Low Match', color: 'bg-gray-400', textColor: 'text-white' };
  };

  const match = getMatchLevel(score);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full ${match.color} ${match.textColor} ${sizeClasses[size]}`}
      style={{ fontFamily: 'Poppins', fontWeight: 600 }}
    >
      {showIcon && <Target className={iconSizes[size]} />}
      <span>ICP Match: {score}%</span>
    </div>
  );
}

export function ICPKeywordBadge({ isICPMatch }: { isICPMatch: boolean }) {
  if (!isICPMatch) return null;
  
  return (
    <Target className="w-3 h-3 text-[#2990C6] inline-block ml-1" title="From ICP Profile" />
  );
}
