import { ArcReactor } from './ArcReactor';
import { RPMGauge } from './RPMGauge';
import { BatteryStatus } from './BatteryStatus';
import { DailySummary } from './DailySummary';
import { CoreFrequencyChart } from './CoreFrequencyChart';
import { TemperatureMonitor } from './TemperatureMonitor';
import { NetworkMonitor } from './NetworkMonitor';

export function Overview() {
  const cpuUsage = 12;
  const memoryUsage = 68;
  const gpuUsage = 75;
  const diskUsage = 54;
  const fanSpeed = 2500; // RPM

  return (
    <div className="space-y-8 pb-12">
      {/* Top Section - Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <DailySummary />
        <NetworkMonitor />
        <TemperatureMonitor
          cpuTemp={58}
          gpuTemp={72}
          motherboardTemp={45}
          nvmeTemp={42}
        />
      </div>

      {/* RPM Gauges - Floating without containers */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-20">
          <div className="grid grid-cols-4 gap-8">
            <RPMGauge
              label="CPU"
              value={cpuUsage}
              maxValue={100}
              unit="%"
              detail="i9-13900K"
              temperature={58}
            />
            <RPMGauge
              label="MEMORY"
              value={memoryUsage}
              maxValue={100}
              unit="%"
              detail="32GB DDR5"
              temperature={45}
            />
            <RPMGauge
              label="GPU"
              value={gpuUsage}
              maxValue={100}
              unit="%"
              detail="RTX 4080"
              temperature={72}
            />
            <RPMGauge
              label="DISK"
              value={diskUsage}
              maxValue={100}
              unit="%"
              detail="NVMe SSD"
              temperature={42}
            />
          </div>
        </div>
      </div>

      {/* Arc Reactor - Large centerpiece without container */}
      <div className="pt-80">
        <ArcReactor fanSpeed={fanSpeed} systemLoad={cpuUsage} />
      </div>

      {/* Spacer to prevent overlap */}
      <div className="h-32" />

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        <BatteryStatus
          percentage={87}
          isCharging={true}
          powerDraw={45}
          timeRemaining="2h 34m"
          voltage={12.6}
          current={3.57}
        />
        <CoreFrequencyChart />
      </div>
    </div>
  );
}
