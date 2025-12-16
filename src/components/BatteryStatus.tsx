import { Card } from './Card';
import { Battery, Zap, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface BatteryStatusProps {
  percentage: number;
  isCharging: boolean;
  powerDraw: number;
  timeRemaining: string;
  voltage: number;
  current: number;
}

export function BatteryStatus({
  percentage,
  isCharging,
  powerDraw,
  timeRemaining,
  voltage,
  current,
}: BatteryStatusProps) {
  const getColor = (percent: number) => {
    if (percent > 60) return { text: 'text-green-400', bg: 'bg-green-500' };
    if (percent > 30) return { text: 'text-yellow-400', bg: 'bg-yellow-500' };
    return { text: 'text-red-400', bg: 'bg-red-500' };
  };

  const colors = getColor(percentage);

  return (
    <Card glow>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-700 bg-gray-800">
            <Battery className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div>
            <h3 className="text-gray-100 tracking-wider">BATTERY</h3>
            <p className="text-xs text-gray-500">
              {isCharging ? 'Charging' : 'Discharging'}
            </p>
          </div>
        </div>
        {isCharging && <Zap className="w-5 h-5 text-green-400 animate-pulse" />}
      </div>

      {/* Battery visualization */}
      <div className="mb-6 relative">
        {/* Battery shell */}
        <div className="relative w-full h-16 border-2 border-gray-700 rounded-lg overflow-hidden">
          {/* Battery fill */}
          <motion.div
            className={`h-full ${colors.bg}/20`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className={`absolute inset-0 ${colors.bg}/30 blur-sm`} />
          </motion.div>

          {/* Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl text-gray-100">{percentage}%</span>
          </div>

          {/* Charging shimmer */}
          {isCharging && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>

      
      </div>

      {/* Battery stats */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Power Draw</span>
          <span className={colors.text}>{powerDraw}W</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Voltage</span>
          <span className={colors.text}>{voltage}V</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Current</span>
          <span className={colors.text}>{current}A</span>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-gray-500">Time Remaining</span>
          </div>
          <span className={colors.text}>{timeRemaining}</span>
        </div>
      </div>
    </Card>
  );
}
