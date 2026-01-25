'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  TrendingUp,
  Grid3x3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const navigation = [
  {
    name: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    name: 'ANALYTICS',
    items: [
      { name: 'Revenue', href: '/revenue', icon: DollarSign },
      { name: 'Customers', href: '/customers', icon: Users },
      { name: 'Acquisition', href: '/acquisition', icon: TrendingUp },
      { name: 'Cohorts', href: '/cohorts', icon: Grid3x3 },
    ],
  },
  {
    name: 'SETTINGS',
    items: [
      { name: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

/**
 * Collapsible sidebar navigation with active states
 */
export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen bg-zinc-900 border-r border-zinc-800 transition-all duration-300 z-40',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">MetricsHub</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-6 overflow-y-auto">
          {navigation.map((section) => (
            <div key={section.name}>
              {!collapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {section.name}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative',
                        isActive
                          ? 'bg-indigo-500/10 text-indigo-500'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 w-0.5 h-8 bg-indigo-500 rounded-r" />
                      )}
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.name}</span>}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-zinc-800 space-y-3">
          {!collapsed && (
            <>
              {/* Company Switcher */}
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold">
                    A
                  </div>
                  <span className="text-sm font-medium">Acme Inc</span>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>

              {/* User Profile */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
                    RM
                  </div>
                  <div>
                    <p className="text-sm font-medium">Roberto M.</p>
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-zinc-800 relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </div>
            </>
          )}
          {collapsed && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
                RM
              </div>
              <button className="p-1.5 rounded-lg hover:bg-zinc-800 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
