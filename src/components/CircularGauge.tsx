import { motion } from 'motion/react';
import { Card } from './Card';

interface CircularGaugeProps {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  color: 'cyan' | 'yellow' | 'green' | 'red';
  detail?: string;
}

export function CircularGauge({ label, value, maxValue, unit, color, detail }: CircularGaugeProps) {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    cyan: {
      from: '#06b6d4',
      to: '#0891b2',
      glow: 'rgba(6, 182, 212, 0.5)',
      text: 'text-cyan-400',
    },
    yellow: {
      from: '#f59e0b',
      to: '#d97706',
      glow: 'rgba(245, 158, 11, 0.5)',
      text: 'text-yellow-400',
    },
    green: {
      from: '#10b981',
      to: '#059669',
      glow: 'rgba(16, 185, 129, 0.5)',
      text: 'text-green-400',
    },
    red: {
      from: '#ef4444',
      to: '#dc2626',
      glow: 'rgba(239, 68, 68, 0.5)',
      text: 'text-red-400',
    },
  };

  const colors = colorMap[color];

  return (
    <Card className="relative overflow-hidden">
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative">
        <h3 className="text-sm text-gray-400 mb-2">{label}</h3>
        {detail && <p className="text-xs text-gray-600 mb-4">{detail}</p>}

        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.from} />
                  <stop offset="100%" stopColor={colors.to} />
                </linearGradient>
                <filter id={`glow-${color}`}>
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Track */}
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="#1f2937"
                strokeWidth="12"
                fill="none"
              />

              {/* Progress */}
              <motion.circle
                cx="96"
                cy="96"
                r="70"
                stroke={`url(#gradient-${color})`}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
                filter={`url(#glow-${color})`}
              />

              {/* Inner ring decoration */}
              <circle
                cx="96"
                cy="96"
                r="58"
                stroke="#374151"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </svg>

            {/* Center value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className={`text-4xl ${colors.text}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {value}
              </motion.div>
              <div className="text-sm text-gray-500">{unit}</div>
              
              {/* Percentage display */}
              <div className="mt-2 text-xs text-gray-600">
                {percentage.toFixed(0)}%
              </div>
            </div>

            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const angle = (tick / 100) * 270 - 135;
              const x1 = 96 + 58 * Math.cos((angle * Math.PI) / 180);
              const y1 = 96 + 58 * Math.sin((angle * Math.PI) / 180);
              const x2 = 96 + 50 * Math.cos((angle * Math.PI) / 180);
              const y2 = 96 + 50 * Math.sin((angle * Math.PI) / 180);

              return (
                <svg key={tick} className="absolute inset-0 w-full h-full">
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#4b5563"
                    strokeWidth="2"
                  />
                </svg>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
