import { motion } from 'motion/react';
import { Card } from './Card';
import { useEffect, useState } from 'react';

interface MemoryOrbProps {
  usage: number;
}

export function MemoryOrb({ usage }: MemoryOrbProps) {
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity((prev) => (prev === 1 ? 1.1 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Color based on memory usage
  const getColor = (usage: number) => {
    if (usage < 50) return { primary: '#06b6d4', secondary: '#0891b2', glow: 'rgba(6, 182, 212, 0.6)' };
    if (usage < 75) return { primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.6)' };
    if (usage < 90) return { primary: '#f59e0b', secondary: '#d97706', glow: 'rgba(245, 158, 11, 0.6)' };
    return { primary: '#ef4444', secondary: '#dc2626', glow: 'rgba(239, 68, 68, 0.6)' };
  };

  const colors = getColor(usage);

  return (
    <Card className="relative overflow-hidden">
      <h3 className="text-sm text-gray-400 mb-2">Memory Usage</h3>
      <p className="text-xs text-gray-600 mb-6">32 GB DDR5-6000</p>

      <div className="relative h-64 flex items-center justify-center">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Central orb visualization */}
        <div className="relative w-48 h-48">
          {/* Outer glow rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: colors.primary,
                opacity: 0.1,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: ring * 0.8,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Main orb */}
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              background: `radial-gradient(circle at 40% 40%, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 0 40px ${colors.glow}, 0 0 80px ${colors.glow}, inset 0 0 40px rgba(0, 0, 0, 0.3)`,
            }}
            animate={{
              scale: [1, pulseIntensity, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Inner highlight */}
            <div
              className="absolute top-4 left-4 w-12 h-12 rounded-full blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
              }}
            />
          </motion.div>

          {/* Orbiting particles */}
          {[0, 1, 2, 3].map((particle) => {
            const angle = (particle * 90 * Math.PI) / 180;
            const radius = 80;
            
            return (
              <motion.div
                key={particle}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: colors.primary,
                  boxShadow: `0 0 10px ${colors.glow}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-4px',
                  marginTop: '-4px',
                }}
                animate={{
                  x: [
                    Math.cos(angle) * radius,
                    Math.cos(angle + Math.PI) * radius,
                    Math.cos(angle) * radius,
                  ],
                  y: [
                    Math.sin(angle) * radius,
                    Math.sin(angle + Math.PI) * radius,
                    Math.sin(angle) * radius,
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: particle * 0.3,
                  ease: 'linear',
                }}
              />
            );
          })}

          {/* Center value display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-5xl text-white"
              style={{ textShadow: `0 0 20px ${colors.glow}` }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {usage}
            </motion.div>
            <div className="text-lg text-gray-300">%</div>
          </div>
        </div>

        {/* Data stream effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 w-px h-8"
              style={{
                background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)`,
                opacity: 0.3,
              }}
              animate={{
                y: [-100, 300],
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* Memory stats below */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="text-xs text-gray-500 mb-1">Used</div>
          <div className="text-sm text-gray-200">21.8 GB</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Available</div>
          <div className="text-sm text-gray-200">10.2 GB</div>
        </div>
      </div>
    </Card>
  );
}
