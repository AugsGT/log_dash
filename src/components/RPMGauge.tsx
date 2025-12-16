import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import React, { useMemo } from 'react';

// --- GEOMETRY CONSTANTS (Reverted to Radial Sweep) ---
const START_ANGLE_RADIAL = -135; // Bottom-left
const END_ANGLE_RADIAL = 135;   // Bottom-right
const FULL_ARC_ANGLE_RADIAL = 270; // Total sweep
const ARC_RADIUS = 70;
const ARC_CENTER = 100;
const STROKE_WIDTH = 14;

// Helper function to convert polar to cartesian coordinates
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// Helper function to describe the full 270-degree arc path
function describeFullArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  // SVG arcs are drawn from start point to end point.
  const start = polarToCartesian(x, y, radius, endAngle); // We start drawing from the end angle
  const end = polarToCartesian(x, y, radius, startAngle); // And end drawing at the start angle

  // Since the arc is 270 degrees, the largeArcFlag must be '1'
  const largeArcFlag = '1'; 
  const sweepFlag = '0'; // Draw counter-clockwise (up and over)
  
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

interface RPMGaugeProps {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  detail: string;
  temperature: number;
}

export function RPMGauge({ label, value, maxValue, unit, detail, temperature }: RPMGaugeProps) {
  const percentage = Math.min(100, (value / maxValue) * 100); 

  // --- Color Logic (Same as before) ---
  const getColor = (percent: number) => {
    if (percent < 50) return { 
      primary: '#00d4ff', secondary: '#0891b2', glow: 'rgba(0, 212, 255, 0.6)',
      text: 'text-cyan-400', shadow: 'shadow-cyan-500/50'
    };
    if (percent < 75) return { 
      primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.6)',
      text: 'text-green-400', shadow: 'shadow-green-500/50'
    };
    if (percent < 90) return { 
      primary: '#f59e0b', secondary: '#d97706', glow: 'rgba(245, 158, 11, 0.6)',
      text: 'text-yellow-400', shadow: 'shadow-yellow-500/50'
    };
    return { 
      primary: '#ef4444', secondary: '#dc2626', glow: 'rgba(239, 68, 68, 0.6)',
      text: 'text-red-400', shadow: 'shadow-red-500/50'
    };
  };

  const colors = getColor(percentage);

  // Stroke offset calculation: 100% means 0 offset (fully drawn)
  const strokeOffset = 100 - percentage; 
  
  // Calculate the final angle for the needle rotation
  // Initial Rotation is START_ANGLE_RADIAL (-135)
  // Final Rotation is START_ANGLE_RADIAL + (270 * percentage / 100)
  const needleFinalRotation = START_ANGLE_RADIAL + (percentage / 100) * FULL_ARC_ANGLE_RADIAL;

  const fullArcPath = useMemo(() => 
    describeFullArc(ARC_CENTER, ARC_CENTER, ARC_RADIUS, START_ANGLE_RADIAL, END_ANGLE_RADIAL), 
    []
  );

  return (
    <div className="relative">
      {/* Backdrop glow */}
      <div 
        className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
        style={{ backgroundColor: colors.primary }}
      />

      {/* Main container */}
      <div className="relative bg-[#080b1f]/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-4">
        {/* Header */}
        <div className="text-center mb-3">
          <h3 className="text-sm text-cyan-400 tracking-[0.2em] mb-1">{label}</h3>
          <p className="text-xs text-gray-600">{detail}</p>
        </div>

        {/* RPM Gauge */}
        <div className="relative w-full aspect-square max-w-[180px] mx-auto">
          <svg className="w-full h-full transform" viewBox="0 0 200 200">
            <defs>
              {/* Gradient & Filter Definitions */}
              <linearGradient id={`gauge-gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.primary} />
                <stop offset="100%" stopColor={colors.secondary} />
              </linearGradient>
              <filter id={`gauge-glow-${label}`}>
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background arc */}
            <path
              d={fullArcPath} 
              fill="none"
              stroke="#1f2937"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
            />

            {/* Value arc - Smooth fill animation */}
            <motion.path
              d={fullArcPath} 
              fill="none"
              stroke={`url(#gauge-gradient-${label})`}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              filter={`url(#gauge-glow-${label})`}
              pathLength="100" 
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: strokeOffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ strokeDasharray: '100 100' }} 
            />

            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((tick) => {
              // Calculate angles for the 270-degree sweep
              const angle = START_ANGLE_RADIAL + (tick / 100) * FULL_ARC_ANGLE_RADIAL; 
              const innerRadius = 58;
              const outerRadius = 68;
              const angleRad = (angle * Math.PI) / 180;
              
              const x1 = 100 + innerRadius * Math.cos(angleRad);
              const y1 = 100 + innerRadius * Math.sin(angleRad);
              const x2 = 100 + outerRadius * Math.cos(angleRad);
              const y2 = 100 + outerRadius * Math.sin(angleRad);
              
              return (
                <line
                  key={tick}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#4b5563"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Needle */}
            <motion.line
              x1="100"
              y1="100"
              x2="100"
              y2="35"
              stroke={colors.primary}
              strokeWidth="3"
              strokeLinecap="round"
              filter={`url(#gauge-glow-${label})`}
              initial={{ rotate: START_ANGLE_RADIAL }}
              animate={{ rotate: needleFinalRotation }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: '100px 100px' }}
            />

          </svg>

          {/* Center value display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
            <motion.div
              className={`text-4xl ${colors.text}`}
              style={{ textShadow: `0 0 20px ${colors.glow}` }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {value}
            </motion.div>
            <div className="text-xs text-gray-500">{unit}</div>
          </div>
        </div>

        {/* Temperature indicator */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
          <Thermometer className="w-3 h-3 text-gray-500" />
          <span className={colors.text}>{temperature}°C</span>
        </div>
      </div>
    </div>
  );
}