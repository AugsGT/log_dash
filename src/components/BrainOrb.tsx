import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function BrainOrb() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles in a sphere pattern
    const newParticles = Array.from({ length: 200 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 150;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: Math.random() * 2,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
        <div
          className="w-full h-full opacity-30"
          style={{
            background: 'linear-gradient(to bottom, transparent, #0a0e27)',
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom',
          }}
        />
      </div>

      {/* Particle Field */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [particle.x * 0.5, particle.x, particle.x * 0.5],
              y: [particle.y * 0.5, particle.y, particle.y * 0.5],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Central Brain Orb */}
      <div className="relative w-64 h-64 z-10">
        {/* Outer glow rings */}
        {[0, 1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-cyan-500/30"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: ring * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Main sphere */}
        <div className="absolute inset-8">
          <div
            className="w-full h-full rounded-full relative"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #0099ff, #0066cc, #003366)',
              boxShadow: `
                0 0 60px rgba(0, 212, 255, 0.8),
                0 0 120px rgba(0, 212, 255, 0.6),
                inset 0 0 60px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            {/* Neural network pattern overlay */}
            <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'screen' }}>
              <defs>
                <radialGradient id="brainGlow">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Create neural network lines */}
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 20;
                const centerX = 96;
                const centerY = 96;
                const radius = 40 + Math.random() * 30;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                return (
                  <g key={i}>
                    <motion.line
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      stroke="url(#brainGlow)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="2"
                      fill="#00d4ff"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeInOut',
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Inner highlight */}
            <div
              className="absolute top-8 left-8 w-16 h-16 rounded-full blur-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
              }}
            />

            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
              style={{
                borderStyle: 'dashed',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Data streams */}
        {[0, 1, 2, 3].map((stream) => {
          const angle = (stream * Math.PI * 2) / 4;
          return (
            <motion.div
              key={stream}
              className="absolute w-px h-24 bg-gradient-to-b from-cyan-400 to-transparent"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'top center',
              }}
              animate={{
                rotate: [angle * (180 / Math.PI), (angle * (180 / Math.PI)) + 360],
                scaleY: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: stream * 0.5,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>

      {/* Vertical light beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full">
        <motion.div
          className="w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          style={{ height: '200px' }}
          animate={{
            y: ['-100%', '300%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}
