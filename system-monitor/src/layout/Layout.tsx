import { useEffect, useState, type CSSProperties } from 'react';
import {
  Activity,
  ChevronDown,
  CircleHelp,
  Cpu,
  LayoutDashboard,
  MemoryStick,
  Monitor,
  Network,
  Search,
  Settings2,
  SwatchBook,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router';
import { loadTheme, type ThemeColors } from '../theme';

const Layout = () => {
  const [theme, setTheme] = useState(loadTheme);
  const themeStyles = {
    '--app-background': theme.background,
    '--app-text': theme.text,
    '--app-heading': theme.heading,
    '--app-surface': theme.surface,
    '--app-sidebar': theme.sidebar,
    '--app-accent': theme.accent,
  } as CSSProperties;

  useEffect(() => {
    try {
      localStorage.setItem('system-monitor-theme', JSON.stringify(theme));
    } catch {
      // The theme remains active for this session when storage is unavailable.
    }
  }, [theme]);

  const navigation = [
    { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/performance', label: 'Performance', icon: Activity },
    { to: '/processes', label: 'Processes', icon: Cpu },
    { to: '/theme', label: 'Theme', icon: SwatchBook },
  ];

  return (
    <div className="app-shell" style={themeStyles}>
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Activity size={19} strokeWidth={2.5} />
          </div>
          <div>
            <strong>pulsar</strong>
            <span> SYSTEM MONITOR</span>
          </div>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-icon">
            <Monitor size={16} />
          </div>
          <div className="workspace-copy">
            <span>WORKSPACE</span>
            <strong>My workstation</strong>
          </div>
          <ChevronDown size={15} className="muted-icon" />
        </div>
        <div className="nav-label">MONITORING</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              <Icon size={17} strokeWidth={1.9} />
              <span>{label}</span>
              {label === 'Processes' && <span className="nav-count">8</span>}
            </NavLink>
          ))}
        </nav>
        <div className="nav-label system-label">SYSTEM</div>
        <div className="system-links">
          <div>
            <MemoryStick size={16} />
            <span>Memory</span>
          </div>
          <div>
            <Network size={16} />
            <span>Network</span>
          </div>
          <div>
            <Settings2 size={16} />
            <span>Preferences</span>
          </div>
        </div>
        <div className="sidebar-spacer" />
        <div className="sidebar-status">
          <span className="status-dot" />
          All systems operational
        </div>
        <button className="help-link" type="button">
          <CircleHelp size={16} />
          Help &amp; support
        </button>
        <div className="profile-row">
          <div className="avatar">DK</div>
          <div className="profile-copy">
            <strong>Dipongkor</strong>
            <span>Local machine</span>
          </div>
          <ChevronDown size={15} className="muted-icon" />
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-slash">/</span>
            <strong>System monitor</strong>
          </div>
          <div className="topbar-actions">
            <div className="live-indicator">
              <span className="status-dot" />
              Live
            </div>
            <button
              className="icon-button search-button"
              type="button"
              aria-label="Search"
            >
              <Search size={17} />
            </button>
            <span className="topbar-divider" />
            <span className="updated-label">Updated just now</span>
          </div>
        </header>
        <div className="page-content">
          <Outlet
            context={
              { theme, setTheme } satisfies {
                theme: ThemeColors;
                setTheme: typeof setTheme;
              }
            }
          />
        </div>
      </main>
    </div>
  );
};

export default Layout;
