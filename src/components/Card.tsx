import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function Card({ children, className = '', glow = false }: CardProps) {
  return (
    <div className={`bg-[#080b1f] border border-cyan-500/20 rounded-xl p-6 relative ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-cyan-500/5 rounded-xl blur-xl pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
