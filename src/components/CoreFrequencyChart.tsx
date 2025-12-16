import { Card } from './Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu } from 'lucide-react';

const data = [
  { time: '0s', freq: 3.6, boost: 4.2 },
  { time: '5s', freq: 3.8, boost: 4.5 },
  { time: '10s', freq: 4.2, boost: 4.8 },
  { time: '15s', freq: 4.5, boost: 5.0 },
  { time: '20s', freq: 4.8, boost: 5.2 },
  { time: '25s', freq: 5.1, boost: 5.2 },
  { time: '30s', freq: 5.0, boost: 5.2 },
  { time: '35s', freq: 4.6, boost: 5.1 },
  { time: '40s', freq: 4.2, boost: 4.8 },
  { time: '45s', freq: 3.9, boost: 4.4 },
  { time: '50s', freq: 3.7, boost: 4.1 },
  { time: '55s', freq: 3.6, boost: 4.0 },
  { time: '60s', freq: 3.6, boost: 3.9 },
];

export function CoreFrequencyChart() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#080b1f] border border-cyan-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-gray-400 mb-1">{payload[0].payload.time}</p>
          <p className="text-sm text-cyan-400">Base: {payload[0].value} GHz</p>
          <p className="text-sm text-yellow-400">Boost: {payload[1].value} GHz</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card glow>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-gray-100 tracking-wider">CORE FREQUENCY</h3>
            <p className="text-xs text-gray-500">Real-time clock speed monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" style={{ boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)' }} />
            <span className="text-xs text-gray-400">Base Clock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" style={{ boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)' }} />
            <span className="text-xs text-gray-400">Boost Clock</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="freqGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="boostGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <filter id="areaGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <XAxis
            dataKey="time"
            stroke="rgba(0, 212, 255, 0.3)"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(0, 212, 255, 0.2)' }}
          />
          <YAxis
            stroke="rgba(0, 212, 255, 0.3)"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(0, 212, 255, 0.2)' }}
            domain={[3, 6]}
            label={{ value: 'GHz', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="freq"
            stroke="#00d4ff"
            strokeWidth={2}
            fill="url(#freqGradient)"
            filter="url(#areaGlow)"
          />
          <Area
            type="monotone"
            dataKey="boost"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#boostGradient)"
            filter="url(#areaGlow)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Current stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-cyan-500/20">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Current</div>
          <div className="text-xl text-cyan-400">3.6 GHz</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Boost</div>
          <div className="text-xl text-yellow-400">5.2 GHz</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Utilization</div>
          <div className="text-xl text-green-400">42%</div>
        </div>
      </div>
    </Card>
  );
}
