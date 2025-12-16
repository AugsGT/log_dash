import { Card } from './Card';
import { Calendar, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

export function DailySummary() {
  const events = [
    { time: '14:32', type: 'error', message: 'Service restart: nginx', icon: AlertCircle, color: 'text-red-400' },
    { time: '12:15', type: 'success', message: 'Backup completed successfully', icon: CheckCircle, color: 'text-green-400' },
    { time: '09:45', type: 'warning', message: 'High memory usage detected', icon: TrendingUp, color: 'text-yellow-400' },
    { time: '08:30', type: 'info', message: 'System boot completed', icon: CheckCircle, color: 'text-cyan-400' },
  ];

  return (
    <Card glow>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
          <Calendar className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-gray-100 tracking-wider">DAILY SUMMARY</h3>
          <p className="text-xs text-gray-500">December 13, 2025</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#0a0e27] rounded-lg p-3 border border-cyan-500/20">
          <div className="text-2xl text-green-400 mb-1">98.7%</div>
          <div className="text-xs text-gray-500">Uptime</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-3 border border-cyan-500/20">
          <div className="text-2xl text-cyan-400 mb-1">42</div>
          <div className="text-xs text-gray-500">Events</div>
        </div>
      </div>

      {/* Event timeline */}
      <div className="space-y-3 max-h-[180px] overflow-y-auto">
        {events.map((event, i) => {
          const Icon = event.icon;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={`w-4 h-4 ${event.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400 font-mono">{event.time}</span>
                </div>
                <p className="text-sm text-gray-300 truncate">{event.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily metrics */}
      <div className="mt-4 pt-4 border-t border-cyan-500/20">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-gray-500">Peak Load</span>
          </div>
          <span className="text-green-400">78%</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-2">
          <div className="flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-500">Avg Load</span>
          </div>
          <span className="text-cyan-400">42%</span>
        </div>
      </div>
    </Card>
  );
}
