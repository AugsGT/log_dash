import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  detail?: string;
}

export function MetricCard({ icon: Icon, label, value, unit, status, detail }: MetricCardProps) {
  const statusColors = {
    normal: 'text-green-500 bg-green-500/10 border-green-500/20',
    warning: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    critical: 'text-red-500 bg-red-500/10 border-red-500/20',
  };

  const barColors = {
    normal: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusColors[status]}`}>
          <Icon className={`w-5 h-5 ${statusColors[status].split(' ')[0]}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-gray-400">{label}</h3>
          {detail && <p className="text-xs text-gray-600">{detail}</p>}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl text-gray-100">{value}</span>
        <span className="text-xl text-gray-400">{unit}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full ${barColors[status]}`} style={{ width: `${value}%` }} />
      </div>
    </Card>
  );
}
