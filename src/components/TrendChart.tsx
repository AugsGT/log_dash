export function TrendChart() {
  const data = [30, 45, 35, 50, 45, 60, 55, 70, 65, 80, 75, 85];
  const max = Math.max(...data);
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 200;
    const y = 80 - (value / max) * 60;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,80 ${points} 200,80`;

  return (
    <div className="relative">
      <svg viewBox="0 0 200 80" className="w-full h-24">
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            y1={20 * i}
            x2="200"
            y2={20 * i}
            stroke="rgba(0, 212, 255, 0.1)"
            strokeWidth="0.5"
          />
        ))}

        {/* Area fill */}
        <polygon points={areaPoints} fill="url(#trendGradient)" />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.8))',
          }}
        />

        {/* Points */}
        {data.map((value, i) => {
          const x = (i / (data.length - 1)) * 200;
          const y = 80 - (value / max) * 60;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="#00d4ff"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 1))',
              }}
            />
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>Monday</span>
        <span>Sunday</span>
      </div>
    </div>
  );
}
