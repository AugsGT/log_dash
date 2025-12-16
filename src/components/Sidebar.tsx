import { Activity, BarChart3, Cpu, FileText, Settings as SettingsIcon } from 'lucide-react';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const menuItems = [
  { id: 'overview' as Page, icon: Activity, label: 'Overview' },
  { id: 'system-health' as Page, icon: Cpu, label: 'System Health' },
  { id: 'resource-behavior' as Page, icon: BarChart3, label: 'Resource Behavior' },
  { id: 'log-activity' as Page, icon: FileText, label: 'Log Activity' },
  { id: 'settings' as Page, icon: SettingsIcon, label: 'Settings' },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#080b1f] border-r border-cyan-500/20 flex flex-col relative z-20">
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center relative">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-xl" />
            <Activity className="w-6 h-6 text-cyan-400 relative z-10" />
          </div>
          <div>
            <h1 className="text-gray-100 tracking-wider">SYSTEM</h1>
            <p className="text-xs text-cyan-400">MONITOR</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-gray-400 hover:text-cyan-300'
                  }`}
                >
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-cyan-500/10 rounded-lg" />
                      <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-xl" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r" />
                    </>
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 text-sm tracking-wide">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-cyan-500/20">
        <div className="text-xs text-gray-600">
          <div className="mb-1">Version 1.0.0</div>
          <div className="text-cyan-400">System Online</div>
        </div>
      </div>
    </aside>
  );
}
