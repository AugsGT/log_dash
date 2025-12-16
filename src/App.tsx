import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { SystemHealth } from './components/SystemHealth';
import { ResourceBehavior } from './components/ResourceBehavior';
import { LogActivity } from './components/LogActivity';
import { Settings } from './components/Settings';

export type TimeWindow = '15m' | '1h' | '24h';
export type Page = 'overview' | 'system-health' | 'resource-behavior' | 'log-activity' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('1h');

  return (
    <div className="flex h-screen bg-[#0a0e27] text-gray-100 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1 flex flex-col relative z-10">
        <Header timeWindow={timeWindow} onTimeWindowChange={setTimeWindow} />
        
        <main className="flex-1 overflow-auto p-6">
          {currentPage === 'overview' && <Overview />}
          {currentPage === 'system-health' && <SystemHealth timeWindow={timeWindow} />}
          {currentPage === 'resource-behavior' && <ResourceBehavior />}
          {currentPage === 'log-activity' && <LogActivity />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
