interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  icon: string;
}

export function ProgressBar({ label, value, max, icon }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">{label}</span>
          <span className="text-cyan-400">{value}</span>
        </div>
        <div className="h-1.5 bg-[#0a0e27] rounded-full overflow-hidden border border-cyan-500/20">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-cyan-400/50 blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
