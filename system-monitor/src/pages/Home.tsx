import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Download,
  MoreHorizontal,
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import UsageChart from '../components/UsageChart';

const Home = () => (
  <div className="page-stack">
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          TUESDAY, OCTOBER 7, 2026 <span className="heading-separator">/</span>{' '}
          10:42:18 AM
        </div>
        <h1>System overview</h1>
        <p>Real-time health and resource usage for this machine.</p>
      </div>
      <button className="secondary-button" type="button">
        <Download size={15} />
        Export report
      </button>
    </div>
    <section className="metric-grid" aria-label="System resource summary">
      <MetricCard
        label="CPU usage"
        value="24"
        unit="%"
        detail="8 cores · 3.4 GHz"
        change="3.2%"
        direction="down"
        tone="green"
        icon="cpu"
      />
      <MetricCard
        label="Memory"
        value="11.8"
        unit="GB"
        detail="of 32 GB · 36.9% used"
        change="1.8%"
        direction="up"
        tone="blue"
        icon="memory"
      />
      <MetricCard
        label="Disk usage"
        value="68"
        unit="%"
        detail="NVMe · 1.2 TB of 2 TB"
        change="0.4%"
        direction="up"
        tone="amber"
        icon="disk"
      />
      <MetricCard
        label="Network"
        value="1.42"
        unit="MB/s"
        detail="↓ 0.38 · ↑ 1.04 MB/s"
        change="12.6%"
        direction="up"
        tone="teal"
        icon="network"
      />
    </section>
    <section className="chart-panel">
      <div className="panel-heading">
        <div>
          <h2>Resource utilization</h2>
          <p>Usage across your system over time</p>
        </div>
        <div className="chart-controls">
          <div className="chart-legend">
            <span>
              <i className="legend-dot cpu-dot" />
              CPU
            </span>
            <span>
              <i className="legend-dot memory-dot" />
              Memory
            </span>
          </div>
          <button className="period-select" type="button">
            Last hour <span>⌄</span>
          </button>
          <button
            className="icon-button"
            aria-label="More chart options"
            type="button"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      <UsageChart variant="overview" />
    </section>
    <section className="bottom-grid">
      <div className="panel process-panel">
        <div className="panel-heading compact-heading">
          <div>
            <h2>Top processes</h2>
            <p>Ranked by CPU utilization</p>
          </div>
          <a className="text-link" href="#/processes">
            View all <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="process-list">
          <div className="process-row">
            <span className="process-app app-blue">C</span>
            <div className="process-name">
              <strong>Code</strong>
              <span>Visual Studio Code</span>
            </div>
            <div className="process-meter">
              <i style={{ width: '78%' }} />
            </div>
            <strong className="process-value">8.4%</strong>
          </div>
          <div className="process-row">
            <span className="process-app app-green">N</span>
            <div className="process-name">
              <strong>node</strong>
              <span>Renderer process</span>
            </div>
            <div className="process-meter">
              <i style={{ width: '48%' }} />
            </div>
            <strong className="process-value">5.2%</strong>
          </div>
          <div className="process-row">
            <span className="process-app app-violet">B</span>
            <div className="process-name">
              <strong>Browser</strong>
              <span>Google Chrome</span>
            </div>
            <div className="process-meter">
              <i style={{ width: '31%' }} />
            </div>
            <strong className="process-value">3.1%</strong>
          </div>
          <div className="process-row">
            <span className="process-app app-orange">F</span>
            <div className="process-name">
              <strong>File Manager</strong>
              <span>System process</span>
            </div>
            <div className="process-meter">
              <i style={{ width: '16%' }} />
            </div>
            <strong className="process-value">1.6%</strong>
          </div>
        </div>
      </div>
      <div className="panel health-panel">
        <div className="panel-heading compact-heading">
          <div>
            <h2>System health</h2>
            <p>Everything is running smoothly</p>
          </div>
          <span className="health-check">✓</span>
        </div>
        <div className="health-score">
          <span>92</span>
          <small>/ 100</small>
          <div className="score-label">
            <span className="status-dot" />
            Excellent condition
          </div>
        </div>
        <div className="health-foot">
          <span>
            <Clock3 size={14} />
            Uptime <strong>4d 12h 38m</strong>
          </span>
          <span>
            <ArrowDownRight size={14} />
            Load average <strong>0.82</strong>
          </span>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
