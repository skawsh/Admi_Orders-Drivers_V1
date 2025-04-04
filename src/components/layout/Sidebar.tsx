import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  Truck, 
  ClipboardList, 
  BarChart2, 
  IndianRupee, 
  Users, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const getActivePage = () => {
    if (currentPath.includes('/drivers')) return 'drivers';
    if (currentPath === '/') return 'orders';
    if (currentPath.includes('/settings')) return 'settings';
    return currentPath.split('/')[1] || '';
  };
  
  const activePage = getActivePage();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'studios', label: 'Studios', icon: Store, path: '/studios' },
    { id: 'services', label: 'Services', icon: ShoppingBag, path: '/services' },
    { id: 'drivers', label: 'Drivers', icon: Truck, path: '/drivers' },
    { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, hasChildren: true, path: '/analytics' },
    { id: 'revenue', label: 'Revenue', icon: IndianRupee, path: '/revenue' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className={cn("w-[250px] h-screen bg-white border-r border-gray-200 flex flex-col py-4 animate-fade-in", className)}>
      <div className="px-6 mt-2 mb-4 flex justify-center">
        <img 
          src="/lovable-uploads/f17b54d9-c1da-4b89-b411-fe787ffe1ecf.png" 
          alt="Skawsh Logo" 
          className="w-36 h-auto"
        />
      </div>
      
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => (
          <Link 
            key={item.id}
            to={item.path}
            className={cn(
              "nav-item group flex items-center text-sm rounded-md px-3 py-2 transition-all duration-200",
              activePage === item.id 
                ? "bg-blue-50 text-laundry-blue font-medium border-l-4 border-laundry-blue shadow-sm" 
                : "text-gray-700"
            )}
          >
            <item.icon 
              size={20} 
              className={cn(
                "flex-shrink-0 mr-3 transition-colors",
                activePage === item.id ? "text-laundry-blue" : "text-gray-500"
              )} 
            />
            <span>{item.label}</span>
            {item.hasChildren && (
              <span className="ml-auto transform transition-transform">›</span>
            )}
          </Link>
        ))}
      </nav>
      
      <div className="px-4 mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-laundry-blue to-laundry-blue-light text-white flex items-center justify-center font-medium shadow-blue-glow">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Saiteja Samala</span>
            <span className="text-xs text-gray-500">saitejasamala@skawsh.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
