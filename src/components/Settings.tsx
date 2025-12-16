import { Card } from './Card';
import { Bell, Database, Globe, Shield } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <Card glow>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
            <Bell className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-gray-100 tracking-wider">NOTIFICATIONS</h2>
            <p className="text-sm text-gray-500">Configure alert thresholds and channels</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-200">CPU Usage Alert</div>
              <div className="text-xs text-gray-500">Trigger when usage exceeds threshold</div>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              defaultValue="85"
              className="w-32 accent-cyan-500"
            />
            <span className="text-sm text-cyan-400 w-12 text-right">85%</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-200">Memory Usage Alert</div>
              <div className="text-xs text-gray-500">Trigger when usage exceeds threshold</div>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              defaultValue="90"
              className="w-32 accent-cyan-500"
            />
            <span className="text-sm text-cyan-400 w-12 text-right">90%</span>
          </div>
        </div>
      </Card>

      <Card glow>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
            <Database className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-gray-100 tracking-wider">DATA RETENTION</h2>
            <p className="text-sm text-gray-500">Configure log and metric storage duration</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-200">Metrics retention</span>
            <select className="bg-[#0a0e27] border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-cyan-400">
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-200">Log retention</span>
            <select className="bg-[#0a0e27] border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-cyan-400">
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card glow>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-gray-100 tracking-wider">NETWORK</h2>
              <p className="text-sm text-gray-500">Connection settings</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Refresh interval</label>
              <select className="w-full bg-[#0a0e27] border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-cyan-400">
                <option>1 second</option>
                <option>3 seconds</option>
                <option>5 seconds</option>
                <option>10 seconds</option>
              </select>
            </div>
          </div>
        </Card>

        <Card glow>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-gray-100 tracking-wider">SECURITY</h2>
              <p className="text-sm text-gray-500">Access control</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-200">Require authentication</span>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-full h-full bg-gray-700 peer-checked:bg-cyan-500 rounded-full transition-colors cursor-pointer shadow-lg peer-checked:shadow-cyan-500/50"></div>
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
