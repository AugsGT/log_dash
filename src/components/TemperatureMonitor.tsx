import { Card } from './Card';
import { Thermometer } from 'lucide-react';
import { motion } from 'motion/react';

interface TemperatureMonitorProps {
  cpuTemp: number;
  gpuTemp: number;
  motherboardTemp: number;
  nvmeTemp: number;
}

export function TemperatureMonitor({ cpuTemp, gpuTemp, motherboardTemp, nvmeTemp }: TemperatureMonitorProps) {
  const getTempColor = (temp: number) => {
    if (temp < 50) return { color: '#10b981', text: 'text-green-400', bg: 'bg-green-500' };
    if (temp < 70) return { color: '#f59e0b', text: 'text-yellow-400', bg: 'bg-yellow-500' };
    return { color: '#ef4444', text: 'text-red-400', bg: 'bg-red-500' };
  };

  const temps = [
    { label: 'CPU', value: cpuTemp, max: 100 },
    { label: 'GPU', value: gpuTemp, max: 100 },
    { label: 'Motherboard', value: motherboardTemp, max: 80 },
    { label: 'NVMe SSD', value: nvmeTemp, max: 80 },
  ];

  return (
    <Card glow>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
          <Thermometer className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-gray-100 tracking-wider">TEMPERATURES</h3>
          <p className="text-xs text-gray-500">System thermal monitoring</p>
        </div>
      </div>

      <div className="space-y-4">
        {temps.map((temp) => {
          const colors = getTempColor(temp.value);
          const percentage = (temp.value / temp.max) * 100;

          return (
            <div key={temp.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{temp.label}</span>
                <span className={`text-sm ${colors.text}`}>{temp.value}°C</span>
              </div>
              
              <div className="relative h-2 bg-[#0a0e27] rounded-full overflow-hidden border border-cyan-500/20">
                <motion.div
                  className={`h-full relative`}
                  style={{ backgroundColor: colors.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <div 
                    className="absolute inset-0 blur-sm" 
                    style={{ backgroundColor: colors.color, opacity: 0.5 }}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Average temp */}
      <div className="mt-6 pt-4 border-t border-cyan-500/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Average Temperature</span>
          <span className="text-lg text-cyan-400">
            {Math.round((cpuTemp + gpuTemp + motherboardTemp + nvmeTemp) / 4)}°C
          </span>
        </div>
      </div>
    </Card>
  );
}
