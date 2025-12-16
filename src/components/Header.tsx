import { RefreshCw } from 'lucide-react';
import { TimeWindow } from '../App';
import { useEffect, useState } from 'react';

interface HeaderProps {
  timeWindow: TimeWindow;
  onTimeWindowChange: (window: TimeWindow) => void;
}

export function Header({ timeWindow, onTimeWindowChange }: HeaderProps) {
  const [uptime, setUptime] = useState('14d 7h 32m');
  const [lastRefresh, setLastRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh((prev) => (prev + 1) % 3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeWindows: TimeWindow[] = ['15m', '1h', '24h'];

  return (
    <header className="bg-[#080b1f] border-b border-cyan-500/20 px-6 py-4 relative z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-xs text-gray-500 tracking-wider">HOSTNAME</div>
            <div className="text-sm text-cyan-400 tracking-wide">prod-server-01</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 tracking-wider">OPERATING SYSTEM</div>
            <div className="text-sm text-cyan-400 tracking-wide">Ubuntu 22.04 LTS</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 tracking-wider">UPTIME</div>
            <div className="text-sm text-cyan-400 tracking-wide">{uptime}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${lastRefresh === 0 ? 'animate-spin' : ''}`} />
            <span>Auto-refresh: 3s</span>
          </div>

          <div className="flex gap-1 bg-[#0a0e27] rounded-lg p-1 border border-cyan-500/20">
            {timeWindows.map((window) => (
              <button
                key={window}
                onClick={() => onTimeWindowChange(window)}
                className={`px-4 py-1.5 rounded-md text-sm transition-all tracking-wide ${
                  timeWindow === window
                    ? 'bg-cyan-500 text-[#0a0e27] shadow-lg shadow-cyan-500/50'
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
              >
                Last {window}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
