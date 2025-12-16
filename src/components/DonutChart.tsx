interface DonutChartProps {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  showLegend?: boolean;
}

export function DonutChart({ data, showLegend = false }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const largeArc = angle > 180 ? 1 : 0;

    const x1 = 60 + 50 * Math.cos(startRad);
    const y1 = 60 + 50 * Math.sin(startRad);
    const x2 = 60 + 50 * Math.cos(endRad);
    const y2 = 60 + 50 * Math.sin(endRad);

    const path = `M 60 60 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { ...item, path, percentage };
  });

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        {/* Background circle */}
        <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1f3a" strokeWidth="20" />
        
        {/* Segments */}
        {segments.map((segment, i) => (
          <g key={i}>
            <path d={segment.path} fill={segment.color} opacity="0.8" />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={segment.color}
              strokeWidth="20"
              strokeDasharray={`${(segment.percentage / 100) * 314} 314`}
              strokeDashoffset={-314 * (segments.slice(0, i).reduce((sum, s) => sum + s.percentage, 0) / 100)}
              transform="rotate(-90 60 60)"
              style={{
                filter: `drop-shadow(0 0 8px ${segment.color})`,
              }}
            />
          </g>
        ))}

        {/* Center circle */}
        <circle cx="60" cy="60" r="30" fill="#080b1f" />
      </svg>

      {showLegend && (
        <div className="mt-4 space-y-2 w-full">
          {segments.map((segment, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: segment.color,
                    boxShadow: `0 0 8px ${segment.color}`,
                  }}
                />
                <span className="text-gray-400">{segment.label}</span>
              </div>
              <span className="text-cyan-400">{segment.percentage.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
