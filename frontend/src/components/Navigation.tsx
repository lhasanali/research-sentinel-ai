import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/my-learning', label: 'My Learning', icon: '✓' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="sticky top-0 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition">
            <span className="text-2xl">🧪</span>
            <span className="text-xl font-bold">مختبر الذكاء</span>
          </Link>
          <div className="text-sm text-slate-400">Hasan Al-Yasiri Technology Lab</div>
        </div>
        <div className="flex gap-1 flex-wrap">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={`px-4 py-2 rounded transition flex items-center gap-2 ${
                isActive(item.path)
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
