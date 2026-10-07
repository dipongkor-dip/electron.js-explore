import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const processes = [
  {
    name: 'Code',
    description: 'Visual Studio Code',
    icon: 'C',
    color: 'app-blue',
    pid: '4218',
    cpu: 8.4,
    memory: '1.24 GB',
    status: 'Running',
  },
  {
    name: 'node',
    description: 'Renderer process',
    icon: 'N',
    color: 'app-green',
    pid: '4382',
    cpu: 5.2,
    memory: '386 MB',
    status: 'Running',
  },
  {
    name: 'Browser',
    description: 'Google Chrome',
    icon: 'B',
    color: 'app-violet',
    pid: '1946',
    cpu: 3.1,
    memory: '892 MB',
    status: 'Running',
  },
  {
    name: 'File Manager',
    description: 'System process',
    icon: 'F',
    color: 'app-orange',
    pid: '1102',
    cpu: 1.6,
    memory: '122 MB',
    status: 'Running',
  },
  {
    name: 'Electron',
    description: 'System Monitor',
    icon: 'E',
    color: 'app-blue',
    pid: '5120',
    cpu: 1.2,
    memory: '214 MB',
    status: 'Running',
  },
  {
    name: 'System',
    description: 'Kernel task',
    icon: 'S',
    color: 'app-green',
    pid: '0001',
    cpu: 0.8,
    memory: '76 MB',
    status: 'Running',
  },
  {
    name: 'Terminal',
    description: 'Shell session',
    icon: 'T',
    color: 'app-orange',
    pid: '4661',
    cpu: 0.4,
    memory: '58 MB',
    status: 'Running',
  },
  {
    name: 'Desktop',
    description: 'Window manager',
    icon: 'D',
    color: 'app-violet',
    pid: '0934',
    cpu: 0.3,
    memory: '181 MB',
    status: 'Running',
  },
];

const Processes = () => {
  const [query, setQuery] = useState('');
  const visibleProcesses = processes.filter((process) =>
    `${process.name} ${process.description} ${process.pid}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            WORKSPACE <span className="heading-separator">/</span> MONITORING
          </div>
          <h1>Processes</h1>
          <p>Inspect active processes and their resource consumption.</p>
        </div>
        <div className="page-title-actions">
          <button className="secondary-button" type="button">
            <SlidersHorizontal size={14} />
            Filter
          </button>
        </div>
      </div>
      <section className="summary-strip">
        <div className="summary-item">
          <span>Active processes</span>
          <strong>128</strong>
        </div>
        <div className="summary-item">
          <span>Total CPU usage</span>
          <strong>24.0%</strong>
        </div>
        <div className="summary-item">
          <span>Memory in use</span>
          <strong>11.8 GB</strong>
        </div>
      </section>
      <section className="panel table-panel">
        <div className="table-toolbar">
          <h2>
            All processes{' '}
            <span className="muted-count">({visibleProcesses.length})</span>
          </h2>
          <label className="table-search">
            <Search size={14} />
            <input
              aria-label="Search processes"
              placeholder="Search processes..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="table-wrap">
          <table className="process-table">
            <thead>
              <tr>
                <th>PROCESS</th>
                <th>PID</th>
                <th>CPU</th>
                <th>MEMORY</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {visibleProcesses.map((process) => (
                <tr key={process.pid}>
                  <td>
                    <span className={`process-app ${process.color}`}>
                      {process.icon}
                    </span>
                    {process.name}
                    <span className="table-description">
                      {process.description}
                    </span>
                  </td>
                  <td className="pid">{process.pid}</td>
                  <td>
                    <span className="usage-cell">
                      <span className="process-meter">
                        <i
                          style={{
                            width: `${Math.min(process.cpu * 7, 100)}%`,
                          }}
                        />
                      </span>
                      {process.cpu.toFixed(1)}%
                    </span>
                  </td>
                  <td>{process.memory}</td>
                  <td>
                    <span className="state-pill">{process.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Processes;
