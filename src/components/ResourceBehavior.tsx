import { Card } from './Card';
import { ArrowDown, ArrowUp, Cpu, Thermometer, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const cpuCores = [
  { id: 0, usage: 45, frequency: 4.2, temperature: 58, powerDraw: 8.2 },
  { id: 1, usage: 38, frequency: 3.9, temperature: 56, powerDraw: 7.1 },
  { id: 2, usage: 62, frequency: 4.8, temperature: 65, powerDraw: 10.5 },
  { id: 3, usage: 41, frequency: 4.0, temperature: 59, powerDraw: 7.8 },
  { id: 4, usage: 55, frequency: 4.5, temperature: 62, powerDraw: 9.3 },
  { id: 5, usage: 33, frequency: 3.7, temperature: 54, powerDraw: 6.5 },
  { id: 6, usage: 48, frequency: 4.3, temperature: 60, powerDraw: 8.6 },
  { id: 7, usage: 52, frequency: 4.4, temperature: 61, powerDraw: 9.0 },
];

const topProcessesCPU = [
  { name: 'docker', pid: 1234, usage: 18.4 },
  { name: 'node', pid: 5678, usage: 12.8 },
  { name: 'postgres', pid: 2341, usage: 9.3 },
  { name: 'nginx', pid: 8765, usage: 6.7 },
  { name: 'redis', pid: 4321, usage: 4.2 },
];

const topProcessesMemory = [
  { name: 'postgres', pid: 2341, usage: 22.1 },
  { name: 'docker', pid: 1234, usage: 18.9 },
  { name: 'node', pid: 5678, usage: 14.3 },
  { name: 'elasticsearch', pid: 9999, usage: 11.7 },
  { name: 'chrome', pid: 3456, usage: 8.4 },
];

export function ResourceBehavior() {
  const avgUsage = cpuCores.reduce((sum, core) => sum + core.usage, 0) / cpuCores.length;
  const avgFreq = cpuCores.reduce((sum, core) => sum + core.frequency, 0) / cpuCores.length;
  const avgTemp = cpuCores.reduce((sum, core) => sum + core.temperature, 0) / cpuCores.length;
  const totalPower = cpuCores.reduce((sum, core) => sum + core.powerDraw, 0);

  const getUsageColor = (usage: number) => {
    if (usage < 50) return { primary: '#00d4ff', glow: 'rgba(0, 212, 255, 0.6)', text: 'text-cyan-400' };
    if (usage < 75) return { primary: '#10b981', glow: 'rgba(16, 185, 129, 0.6)', text: 'text-green-400' };
    if (usage < 90) return { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.6)', text: 'text-yellow-400' };
    return { primary: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)', text: 'text-red-400' };
  };

  const getTempColor = (temp: number) => {
    if (temp < 60) return 'text-green-400';
    if (temp < 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* CPU Core Utilization - Enhanced */}
      <Card glow>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-gray-100 tracking-wider">CPU CORE UTILIZATION</h2>
                <p className="text-sm text-gray-500">Per-core performance metrics</p>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">AVG USAGE</div>
                <div className="text-lg text-cyan-400">{avgUsage.toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">AVG FREQ</div>
                <div className="text-lg text-cyan-400">{avgFreq.toFixed(1)} GHz</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">AVG TEMP</div>
                <div className={`text-lg ${getTempColor(avgTemp)}`}>{avgTemp.toFixed(0)}°C</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">POWER</div>
                <div className="text-lg text-yellow-400">{totalPower.toFixed(1)}W</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Grid */}
        <div className="grid grid-cols-2 gap-4">
          {cpuCores.map((core) => {
            const colors = getUsageColor(core.usage);
            
            return (
              <div
                key={core.id}
                className="relative bg-[#0a0e27] rounded-lg p-4 border border-cyan-500/20 overflow-hidden group hover:border-cyan-500/40 transition-all"
              >
                {/* Background glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"
                  style={{ backgroundColor: colors.primary }}
                />

                {/* Core header */}
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center border"
                      style={{ 
                        borderColor: colors.primary,
                        backgroundColor: `${colors.primary}20`
                      }}
                    >
                      <span className={`text-sm ${colors.text}`}>{core.id}</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">CORE</div>
                      <div className="text-xs text-cyan-400">{core.frequency} GHz</div>
                    </div>
                  </div>
                  
                  {/* Usage percentage */}
                  <div className="text-right">
                    <div className={`text-2xl ${colors.text}`}>{core.usage}%</div>
                  </div>
                </div>

                {/* Usage bar */}
                <div className="relative z-10 mb-3">
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/20">
                    <motion.div
                      className="h-full relative"
                      style={{ backgroundColor: colors.primary }}
                      initial={{ width: 0 }}
                      animate={{ width: `${core.usage}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: core.id * 0.1 }}
                    >
                      <div 
                        className="absolute inset-0 blur-sm" 
                        style={{ backgroundColor: colors.primary, opacity: 0.5 }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Core stats */}
                <div className="relative z-10 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-500">Temp:</span>
                    <span className={getTempColor(core.temperature)}>{core.temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-500">Power:</span>
                    <span className="text-yellow-400">{core.powerDraw}W</span>
                  </div>
                </div>

                {/* Activity indicator */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: core.id * 0.2,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Performance Summary */}
        <div className="mt-6 pt-6 border-t border-cyan-500/20 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">PEAK CORE</div>
            <div className="text-cyan-400">
              Core {cpuCores.reduce((max, core) => core.usage > cpuCores[max].usage ? core.id : max, 0)}
              <span className="text-sm ml-1">({Math.max(...cpuCores.map(c => c.usage))}%)</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">HOTTEST CORE</div>
            <div className="text-red-400">
              Core {cpuCores.reduce((max, core) => core.temperature > cpuCores[max].temperature ? core.id : max, 0)}
              <span className="text-sm ml-1">({Math.max(...cpuCores.map(c => c.temperature))}°C)</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">MAX FREQUENCY</div>
            <div className="text-cyan-400">
              {Math.max(...cpuCores.map(c => c.frequency)).toFixed(1)} GHz
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">EFFICIENCY</div>
            <div className="text-green-400">
              {((avgUsage / (totalPower / 10)) * 10).toFixed(1)}%
            </div>
          </div>
        </div>
      </Card>

      {/* Top Processes */}
      <div className="grid grid-cols-2 gap-6">
        <Card glow>
          <div className="mb-6">
            <h2 className="text-gray-100 mb-1 tracking-wider">TOP PROCESSES BY CPU</h2>
            <p className="text-sm text-gray-500">Highest CPU consumers</p>
          </div>
          <div className="space-y-3">
            {topProcessesCPU.map((process, index) => (
              <div key={process.pid} className="flex items-center gap-3 group hover:bg-cyan-500/5 p-2 rounded-lg transition-all">
                <div className="w-7 h-7 bg-cyan-500/10 rounded flex items-center justify-center text-xs text-cyan-400 border border-cyan-500/30 group-hover:border-cyan-500/50 transition-all">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-200 font-mono">{process.name}</div>
                  <div className="text-xs text-gray-500">PID: {process.pid}</div>
                </div>
                <div>
                  <div className="text-sm text-cyan-400 text-right">{process.usage}%</div>
                  <div className="text-xs text-gray-600 text-right">CPU</div>
                </div>
                {/* Mini usage bar */}
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(process.usage / 20) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card glow>
          <div className="mb-6">
            <h2 className="text-gray-100 mb-1 tracking-wider">TOP PROCESSES BY MEMORY</h2>
            <p className="text-sm text-gray-500">Highest RAM consumers</p>
          </div>
          <div className="space-y-3">
            {topProcessesMemory.map((process, index) => (
              <div key={process.pid} className="flex items-center gap-3 group hover:bg-green-500/5 p-2 rounded-lg transition-all">
                <div className="w-7 h-7 bg-green-500/10 rounded flex items-center justify-center text-xs text-green-400 border border-green-500/30 group-hover:border-green-500/50 transition-all">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-200 font-mono">{process.name}</div>
                  <div className="text-xs text-gray-500">PID: {process.pid}</div>
                </div>
                <div>
                  <div className="text-sm text-green-400 text-right">{process.usage}%</div>
                  <div className="text-xs text-gray-600 text-right">RAM</div>
                </div>
                {/* Mini usage bar */}
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(process.usage / 25) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Disk I/O */}
      <Card glow>
        <div className="mb-6">
          <h2 className="text-gray-100 mb-1 tracking-wider">DISK I/O ACTIVITY</h2>
          <p className="text-sm text-gray-500">Read and write rates</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/30">
                <ArrowDown className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm text-gray-400 tracking-wide">READ RATE</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl text-green-400">142</span>
              <span className="text-gray-400">MB/s</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">/dev/nvme0n1</span>
                <span className="text-green-400">98 MB/s</span>
              </div>
              <div className="h-1.5 bg-[#0a0e27] rounded-full overflow-hidden border border-green-500/20">
                <motion.div
                  className="h-full bg-green-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: '69%' }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-green-400/50 blur-sm" />
                </motion.div>
              </div>
              
              <div className="flex justify-between items-center text-sm mt-3">
                <span className="text-gray-500">/dev/sda1</span>
                <span className="text-green-400">44 MB/s</span>
              </div>
              <div className="h-1.5 bg-[#0a0e27] rounded-full overflow-hidden border border-green-500/20">
                <motion.div
                  className="h-full bg-green-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: '31%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-green-400/50 blur-sm" />
                </motion.div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
                <ArrowUp className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-sm text-gray-400 tracking-wide">WRITE RATE</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl text-cyan-400">87</span>
              <span className="text-gray-400">MB/s</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">/dev/nvme0n1</span>
                <span className="text-cyan-400">62 MB/s</span>
              </div>
              <div className="h-1.5 bg-[#0a0e27] rounded-full overflow-hidden border border-cyan-500/20">
                <motion.div
                  className="h-full bg-cyan-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: '71%' }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-cyan-400/50 blur-sm" />
                </motion.div>
              </div>
              
              <div className="flex justify-between items-center text-sm mt-3">
                <span className="text-gray-500">/dev/sda1</span>
                <span className="text-cyan-400">25 MB/s</span>
              </div>
              <div className="h-1.5 bg-[#0a0e27] rounded-full overflow-hidden border border-cyan-500/20">
                <motion.div
                  className="h-full bg-cyan-500 relative"
                  initial={{ width: 0 }}
                  animate={{ width: '29%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-cyan-400/50 blur-sm" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
