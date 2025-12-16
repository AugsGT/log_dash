import { Card } from './Card';
import { FileText, AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const logSummary = [
  { label: 'Total Logs', value: '12,847', icon: FileText, color: 'cyan' },
  { label: 'Errors', value: '23', icon: AlertCircle, color: 'red' },
  { label: 'Warnings', value: '156', icon: AlertTriangle, color: 'yellow' },
  { label: 'Service Restarts', value: '4', icon: RefreshCw, color: 'blue' },
];

const logs = [
  { timestamp: '2025-12-13 14:32:18', level: 'ERROR', source: 'nginx', message: 'Connection timeout to upstream service' },
  { timestamp: '2025-12-13 14:31:45', level: 'WARNING', source: 'docker', message: 'Container memory usage above 80%' },
  { timestamp: '2025-12-13 14:30:22', level: 'INFO', source: 'systemd', message: 'Service redis-server.service started' },
  { timestamp: '2025-12-13 14:29:58', level: 'ERROR', source: 'postgres', message: 'Slow query detected: 2.4s execution time' },
  { timestamp: '2025-12-13 14:28:33', level: 'WARNING', source: 'kernel', message: 'CPU temperature above threshold: 85°C' },
  { timestamp: '2025-12-13 14:27:10', level: 'INFO', source: 'node', message: 'Application server listening on port 3000' },
  { timestamp: '2025-12-13 14:26:42', level: 'ERROR', source: 'nginx', message: 'Failed to resolve DNS for api.example.com' },
  { timestamp: '2025-12-13 14:25:19', level: 'WARNING', source: 'docker', message: 'Image pull rate limit approaching' },
  { timestamp: '2025-12-13 14:24:05', level: 'INFO', source: 'systemd', message: 'Service postgresql.service reloaded' },
  { timestamp: '2025-12-13 14:22:48', level: 'INFO', source: 'cron', message: 'Daily backup job completed successfully' },
  { timestamp: '2025-12-13 14:21:33', level: 'WARNING', source: 'disk', message: 'Partition /var approaching 80% capacity' },
  { timestamp: '2025-12-13 14:20:11', level: 'INFO', source: 'ssh', message: 'User admin authenticated from 192.168.1.100' },
];

export function LogActivity() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'WARNING':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'INFO':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getSummaryColor = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'red':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'yellow':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'blue':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Log Summary */}
      <div className="grid grid-cols-4 gap-6">
        {logSummary.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} glow>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getSummaryColor(item.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400">{item.label}</span>
              </div>
              <div className="text-3xl text-cyan-400">{item.value}</div>
            </Card>
          );
        })}
      </div>

      {/* Log Table */}
      <Card glow>
        <div className="mb-6">
          <h2 className="text-gray-100 mb-1 tracking-wider">RECENT LOGS</h2>
          <p className="text-sm text-gray-500">System and application log entries</p>
        </div>
        <div className="overflow-auto max-h-[600px]">
          <table className="w-full">
            <thead className="sticky top-0 bg-[#080b1f] border-b border-cyan-500/20">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-cyan-400 tracking-wider">TIMESTAMP</th>
                <th className="text-left py-3 px-4 text-sm text-cyan-400 tracking-wider">LEVEL</th>
                <th className="text-left py-3 px-4 text-sm text-cyan-400 tracking-wider">SOURCE</th>
                <th className="text-left py-3 px-4 text-sm text-cyan-400 tracking-wider">MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="py-3 px-4 text-sm text-gray-400 font-mono">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs border ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-cyan-300">{log.source}</td>
                  <td className="py-3 px-4 text-sm text-gray-300">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
