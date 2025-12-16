import { LucideIcon } from 'lucide-react';
import { Card } from './Card';
import { motion } from 'motion/react';

interface DetailCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  detail: string;
  color: 'cyan' | 'yellow' | 'green' | 'blue' | 'red';
}

export function DetailCard({ icon: Icon, label, value, unit, detail, color }: DetailCardProps) {
  const colorMap = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  const barColor = {
    cyan: 'bg-cyan-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      
      <div className="flex items-baseline gap-1.5 mb-2">
        <motion.span
          className="text-3xl text-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
      
      <div className="text-xs text-gray-600 mb-3">{detail}</div>
      
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${barColor[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </Card>
  );
}
