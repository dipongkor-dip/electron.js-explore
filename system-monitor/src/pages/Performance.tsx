import { Activity, Cpu, MemoryStick, Network } from 'lucide-react';
import UsageChart from '../components/UsageChart';

const Performance = () => (
  <div className="page-stack">
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          WORKSPACE <span className="heading-separator">/</span> MONITORING
        </div>
        <h1>Performance</h1>
        <p>Understand how your system resources change over time.</p>
      </div>
      <div className="chart-page-controls">
        <button type="button">1h</button>
        <button className="selected" type="button">
          6h
        </button>
        <button type="button">24h</button>
        <button type="button">7d</button>
      </div>
    </div>
    <section className="metric-grid">
      <div className="metric-card">
        <div className="metric-top">
          <span className="metric-label">Average CPU</span>
          <span className="metric-icon green">
            <Cpu size={15} />
          </span>
        </div>
        <div className="metric-value">
          22.6<small>%</small>
        </div>
        <div className="metric-footer">
          <span className="metric-detail">Across the last 6 hours</span>
          <span className="metric-change">Normal</span>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-top">
          <span className="metric-label">Memory pressure</span>
          <span className="metric-icon blue">
            <MemoryStick size={15} />
          </span>
        </div>
        <div className="metric-value">
          36.9<small>%</small>
        </div>
        <div className="metric-footer">
          <span className="metric-detail">11.8 GB of 32 GB</span>
          <span className="metric-change">Stable</span>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-top">
          <span className="metric-label">Network activity</span>
          <span className="metric-icon teal">
            <Network size={15} />
          </span>
        </div>
        <div className="metric-value">
          1.42<small>MB/s</small>
        </div>
        <div className="metric-footer">
          <span className="metric-detail">Current throughput</span>
          <span className="metric-change">Active</span>
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-top">
          <span className="metric-label">System load</span>
          <span className="metric-icon amber">
            <Activity size={15} />
          </span>
        </div>
        <div className="metric-value">
          0.82<small>avg</small>
        </div>
        <div className="metric-footer">
          <span className="metric-detail">8 logical processors</span>
          <span className="metric-change">Healthy</span>
        </div>
      </div>
    </section>
    <section className="chart-panel">
      <div className="panel-heading">
        <div>
          <h2>CPU &amp; memory utilization</h2>
          <p>Historical resource usage · last 6 hours</p>
        </div>
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
      </div>
      <UsageChart variant="performance" />
    </section>
    <section className="detail-grid">
      <div className="panel detail-card">
        <h2>Processor</h2>
        <div className="detail-line">
          <span>Model</span>
          <strong>8-core processor</strong>
        </div>
        <div className="detail-line">
          <span>Current frequency</span>
          <strong>3.4 GHz</strong>
        </div>
        <div className="detail-line">
          <span>Temperature</span>
          <strong>54 °C</strong>
        </div>
      </div>
      <div className="panel detail-card">
        <h2>Memory</h2>
        <div className="detail-line">
          <span>Installed</span>
          <strong>32 GB</strong>
        </div>
        <div className="detail-line">
          <span>Available</span>
          <strong>20.2 GB</strong>
        </div>
        <div className="detail-line">
          <span>Swap in use</span>
          <strong>0.2 GB</strong>
        </div>
      </div>
    </section>
  </div>
);

export default Performance;
