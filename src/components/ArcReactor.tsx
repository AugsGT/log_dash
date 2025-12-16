import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ArcReactorProps {
  fanSpeed: number;
  systemLoad: number;
}

export function ArcReactor({ fanSpeed, systemLoad }: ArcReactorProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Rotate based on fan speed
    const rotationSpeed = (fanSpeed / 2000) * 360; // degrees per second
    const interval = setInterval(() => {
      setRotation((prev) => (prev + rotationSpeed / 60) % 360);
    }, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, [fanSpeed]);

  // Color based on system load
  const getColor = (load: number) => {
    if (load < 50) return { primary: '#00d4ff', secondary: '#0891b2', glow: 'rgba(0, 212, 255, 0.8)' };
    if (load < 75) return { primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.8)' };
    if (load < 90) return { primary: '#f59e0b', secondary: '#d97706', glow: 'rgba(245, 158, 11, 0.8)' };
    return { primary: '#ef4444', secondary: '#dc2626', glow: 'rgba(239, 68, 68, 0.8)' };
  };

  const colors = getColor(systemLoad);

  return (
    <div className="relative h-[600px] overflow-visible">
      {/* Title at the top with more spacing */}
      <div className="absolute top-12 left-0 right-0 text-center z-20">
        <h3 className="text-lg text-cyan-400 tracking-[0.3em] mb-2">CORE REACTOR</h3>
        <p className="text-xs text-gray-600">Fan Speed: {fanSpeed} RPM | System Load: {systemLoad}%</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pt-32">
        {/* Grid floor effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(${colors.primary}40 1px, transparent 1px),
                linear-gradient(90deg, ${colors.primary}40 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              transform: 'perspective(600px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }}
          />
        </div>

        {/* Main reactor container */}
        <div className="relative w-96 h-96">
          {/* Outer pulsing rings */}
          {[0, 1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: colors.primary,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: ring * (fanSpeed/10000000),
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-0"
            style={{ rotate: rotation }}
          >
            <svg className="w-full h-full" viewBox="0 0 384 384">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.5" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer ring segments */}
              {[0, 1, 2, 3, 4, 5].map((segment) => {
                const angle = (segment * 60);
                const startAngle = angle - 25;
                const endAngle = angle + 25;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const innerRadius = 160;
                const outerRadius = 185;
                
                const x1 = 192 + outerRadius * Math.cos(startRad);
                const y1 = 192 + outerRadius * Math.sin(startRad);
                const x2 = 192 + outerRadius * Math.cos(endRad);
                const y2 = 192 + outerRadius * Math.sin(endRad);
                const x3 = 192 + innerRadius * Math.cos(endRad);
                const y3 = 192 + innerRadius * Math.sin(endRad);
                const x4 = 192 + innerRadius * Math.cos(startRad);
                const y4 = 192 + innerRadius * Math.sin(startRad);
                
                return (
                  <path
                    key={segment}
                    d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                    fill="url(#ringGradient)"
                    filter="url(#glow)"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Middle rotating ring - opposite direction */}
          <motion.div
            className="absolute inset-16"
            style={{ rotate: -rotation * 1.5 }}
          >
            <svg className="w-full h-full" viewBox="0 0 256 256">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((segment) => {
                const angle = (segment * 45);
                const startAngle = angle - 15;
                const endAngle = angle + 15;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const innerRadius = 90;
                const outerRadius = 115;
                
                const x1 = 128 + outerRadius * Math.cos(startRad);
                const y1 = 128 + outerRadius * Math.sin(startRad);
                const x2 = 128 + outerRadius * Math.cos(endRad);
                const y2 = 128 + outerRadius * Math.sin(endRad);
                const x3 = 128 + innerRadius * Math.cos(endRad);
                const y3 = 128 + innerRadius * Math.sin(endRad);
                const x4 = 128 + innerRadius * Math.cos(startRad);
                const y4 = 128 + innerRadius * Math.sin(startRad);
                
                return (
                  <path
                    key={segment}
                    d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                    fill="url(#ringGradient)"
                    filter="url(#glow)"
                    opacity="0.7"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Inner rotating ring - same direction as outer */}
          <motion.div
            className="absolute inset-24"
            style={{ rotate: rotation * 0.8 }}
          >
            <svg className="w-full h-full" viewBox="0 0 192 192">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((segment) => {
                const angle = (segment * 30);
                const startAngle = angle - 10;
                const endAngle = angle + 10;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const innerRadius = 60;
                const outerRadius = 80;
                
                const x1 = 96 + outerRadius * Math.cos(startRad);
                const y1 = 96 + outerRadius * Math.sin(startRad);
                const x2 = 96 + outerRadius * Math.cos(endRad);
                const y2 = 96 + outerRadius * Math.sin(endRad);
                const x3 = 96 + innerRadius * Math.cos(endRad);
                const y3 = 96 + innerRadius * Math.sin(endRad);
                const x4 = 96 + innerRadius * Math.cos(startRad);
                const y4 = 96 + innerRadius * Math.sin(startRad);
                
                return (
                  <path
                    key={segment}
                    d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                    fill="url(#ringGradient)"
                    filter="url(#glow)"
                    opacity="0.5"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Core sphere */}
          <div className="absolute inset-28" position="relative">
            <motion.div
              className="w-full h-full rounded-full relative"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${colors.primary}, ${colors.secondary}, #001a2e)`,
                boxShadow: `
                  0 0 80px ${colors.glow},
                  0 0 160px ${colors.glow},
                  inset 0 0 80px rgba(0, 0, 0, 0.5)
                `,
              }}
              animate={{
                boxShadow: [
                  `0 0 80px ${colors.glow}, 0 0 160px ${colors.glow}, inset 0 0 80px rgba(0, 0, 0, 0.5)`,
                  `0 0 100px ${colors.glow}, 0 0 200px ${colors.glow}, inset 0 0 80px rgba(0, 0, 0, 0.5)`,
                  `0 0 80px ${colors.glow}, 0 0 160px ${colors.glow}, inset 0 0 80px rgba(0, 0, 0, 0.5)`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Inner light */}
                <div
   className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full blur-3xl
             -translate-x-1/2 -translate-y-1/2"
  style={{ background: 'rgba(255, 255, 255, 0.55)' }}
/>


              {/* Energy particles inside */}
              {[...Array(16)].map((_, i) => {
                const angle = (i * 22.5 * Math.PI) / 180;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: colors.primary,
                      boxShadow: `0 0 10px ${colors.glow}`,
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(angle) * 60, 0],
                      y: [0, Math.sin(angle) * 60, 0],
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Connection beams */}
          {[0, 90, 180, 270].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-3 h-48 left-1/2 top-1/2 origin-bottom"
              style={{
                background: `linear-gradient(to top, ${colors.primary}, transparent)`,
                transform: `rotate(${angle}deg) translateY(-100%) translateX(-50%)`,
                filter: `drop-shadow(0 0 6px ${colors.glow})`,
              }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: angle / 360,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Orbiting data points */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute left-1/2 top-1/2"
              animate={{
                rotate: [angle, angle + 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
            >
              <div
                className="w-4 h-4 rounded-full -ml-2 -mt-2"
                style={{
                  backgroundColor: colors.primary,
                  boxShadow: `0 0 16px ${colors.glow}`,
                  transform: 'translateY(-200px)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Center display */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-32">
          <div className="text-center">
            <motion.div
              className="text-7xl mb-2"
              style={{
                color: colors.primary,
                textShadow: `0 0 30px ${colors.glow}`,
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {systemLoad}
            </motion.div>
            <div className="text-sm text-gray-400 tracking-[0.3em]">SYSTEM LOAD</div>
          </div>
        </div>
      </div>
    </div>
  );
}
