import { Card } from './Card';
import { Network, ArrowUp, ArrowDown, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

export function NetworkMonitor() {
  const uploadSpeed = 142.5; // MB/s
  const downloadSpeed = 87.3; // MB/s
  const maxSpeed = 200; // MB/s

  return (
    <Card glow>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
          <Network className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-gray-100 tracking-wider">NETWORK</h3>
          <p className="text-xs text-gray-500">Real-time traffic monitoring</p>
        </div>
      </div>

      {/* Upload */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ArrowUp className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">Upload</span>
          </div>
          <span className="text-sm text-cyan-400">{uploadSpeed} MB/s</span>
        </div>
        <div className="relative h-2 bg-[#0a0e27] rounded-full overflow-hidden border border-cyan-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 relative"
            initial={{ width: 0 }}
            animate={{ width: `${(uploadSpeed / maxSpeed) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-cyan-400/50 blur-sm" />
          </motion.div>
        </div>
      </div>

      {/* Download */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Download</span>
          </div>
          <span className="text-sm text-green-400">{downloadSpeed} MB/s</span>
        </div>
        <div className="relative h-2 bg-[#0a0e27] rounded-full overflow-hidden border border-cyan-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-green-300 relative"
            initial={{ width: 0 }}
            animate={{ width: `${(downloadSpeed / maxSpeed) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-green-400/50 blur-sm" />
          </motion.div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyan-500/20">
        <div className="bg-[#0a0e27] rounded-lg p-3 border border-cyan-500/20">
          <div className="text-xs text-gray-500 mb-1">Packets/s</div>
          <div className="text-lg text-cyan-400">12,847</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-3 border border-cyan-500/20">
          <div className="text-xs text-gray-500 mb-1">Latency</div>
          <div className="text-lg text-green-400">12ms</div>
        </div>
      </div>

      {/* Connection Info */}
      <div className="mt-3 pt-3 border-t border-cyan-500/20">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-500">Interface</span>
          </div>
          <span className="text-cyan-400">eth0</span>
        </div>
      </div>
    </Card>
  );
}
