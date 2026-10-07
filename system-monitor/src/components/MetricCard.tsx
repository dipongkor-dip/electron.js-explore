import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
} from 'lucide-react';

const icons = {
  cpu: Cpu,
  memory: MemoryStick,
  disk: HardDrive,
  network: Network,
};

type MetricCardProps = {
  label: string;
  value: string;
  unit: string;
  detail: string;
  change: string;
  direction: 'up' | 'down';
  tone: 'green' | 'blue' | 'amber' | 'teal';
  icon: keyof typeof icons;
};

const MetricCard = ({
  label,
  value,
  unit,
  detail,
  change,
  direction,
  tone,
  icon,
}: MetricCardProps) => {
  const Icon = icons[icon];
  const TrendIcon = direction === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className="metric-label">{label}</span>
        <span className={`metric-icon ${tone}`}>
          <Icon size={15} />
        </span>
      </div>
      <div className="metric-value">
        {value}
        <small>{unit}</small>
      </div>
      <div className="metric-footer">
        <span className="metric-detail">{detail}</span>
        <span className={`metric-change ${direction}`}>
          <TrendIcon size={12} />
          {change}
        </span>
      </div>
    </article>
  );
};

export default MetricCard;
