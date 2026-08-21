import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Hammer,
  FolderKanban,
  Image,
  Package,
  MessageSquareQuote,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Leads', path: '/admin/leads', icon: Users },
  { label: 'Services', path: '/admin/services', icon: Hammer },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Gallery', path: '/admin/gallery', icon: Image },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Content', path: '/admin/content', icon: FileText },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-nova-bg text-nova-text">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-nova-border bg-nova-bg-secondary lg:flex">
        <div className="flex items-center justify-center border-b border-nova-border px-6 py-5">
          <img src="/logo.png" alt="Nova Hardscapes" className="h-20 w-auto" />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-nova-gold/10 text-nova-gold' : 'text-nova-text-secondary hover:bg-white/5 hover:text-nova-text'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-nova-border p-4">
          <p className="truncate text-sm font-medium text-nova-text">{admin?.name}</p>
          <p className="truncate text-xs text-nova-text-secondary">{admin?.email}</p>
          <button
            onClick={handleLogout}
            className="focus-ring mt-3 flex w-full items-center gap-2 rounded-lg border border-nova-border px-3 py-2 text-sm text-nova-text-secondary hover:border-nova-gold hover:text-nova-gold"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-nova-border bg-nova-bg-secondary px-5 py-4 lg:hidden">
          <img src="/logo.png" alt="Nova Hardscapes" className="h-8 w-auto" />
          <button onClick={handleLogout} className="focus-ring text-sm text-nova-text-secondary">
            Logout
          </button>
        </header>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
