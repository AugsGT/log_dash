import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 bg-cyan-500/10 rounded border border-cyan-500/30 flex items-center justify-center rotate-45 relative">
        <div className="absolute inset-0 bg-cyan-500/20 rounded blur-lg" />
        <Icon className="w-6 h-6 text-cyan-400 -rotate-45 relative z-10" />
      </div>
      <div className="text-xs text-gray-500 tracking-wider">{label}</div>
      <div className="text-xl text-cyan-400">{value}</div>
    </div>
  );
}
