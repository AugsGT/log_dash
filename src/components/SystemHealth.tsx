import { Card } from './Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeWindow } from '../App';

interface SystemHealthProps {
  timeWindow: TimeWindow;
}

// Generate mock data based on time window
function generateMockData(timeWindow: TimeWindow) {
  const points = timeWindow === '15m' ? 15 : timeWindow === '1h' ? 60 : 96;
  const data = [];
  
  for (let i = 0; i < points; i++) {
    data.push({
      time: i,
      cpu: 30 + Math.random() * 30 + Math.sin(i / 10) * 15,
      memory: 60 + Math.random() * 15 + Math.sin(i / 8) * 10,
      gpu: 65 + Math.random() * 20 + Math.cos(i / 12) * 10,
    });
  }
  
  return data;
}

export function SystemHealth({ timeWindow }: SystemHealthProps) {
  const data = generateMockData(timeWindow);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#080b1f] border border-cyan-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-gray-400 mb-1">Time: {payload[0].payload.time}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card glow>
        <div className="mb-6">
          <h2 className="text-gray-100 mb-1 tracking-wider">CPU USAGE OVER TIME</h2>
          <p className="text-sm text-gray-500">Processor utilization across all cores</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
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
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#00d4ff"
              strokeWidth={2}
              dot={false}
              name="CPU"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.8))',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card glow>
        <div className="mb-6">
          <h2 className="text-gray-100 mb-1 tracking-wider">MEMORY USAGE OVER TIME</h2>
          <p className="text-sm text-gray-500">RAM utilization percentage</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
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
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="memory"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Memory"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.8))',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card glow>
        <div className="mb-6">
          <h2 className="text-gray-100 mb-1 tracking-wider">GPU TEMPERATURE OVER TIME</h2>
          <p className="text-sm text-gray-500">Graphics processor thermal readings</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
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
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="gpu"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              name="GPU Temp"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
