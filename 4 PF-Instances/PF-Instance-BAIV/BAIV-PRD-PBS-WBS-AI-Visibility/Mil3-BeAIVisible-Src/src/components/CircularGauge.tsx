interface CircularGaugeProps {
  value: number;
}

export function CircularGauge({ value }: CircularGaugeProps) {
  // Handle undefined or NaN values
  const safeValue = !isNaN(value) && value !== undefined && value !== null ? value : 0;
  
  const getColor = (score: number) => {
    if (score >= 70) return '#2990C6';
    if (score >= 40) return '#e84e1c';
    return '#DC2626';
  };

  const color = getColor(safeValue);
  const radius = 60;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="relative">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            strokeLinecap: 'round'
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          style={{ 
            fontFamily: 'Poppins', 
            fontWeight: 700, 
            fontSize: '48px',
            color: color,
            lineHeight: '1'
          }}
        >
          {safeValue}
        </span>
      </div>
    </div>
  );
}