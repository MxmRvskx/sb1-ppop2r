"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, LayoutDashboard, FolderKanban, LogOut, Wallet, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/', icon: Home, label: 'Главная' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
  { href: '/projects', icon: FolderKanban, label: 'Проекты' },
  { href: '/finances', icon: Wallet, label: 'Финансы' },
  { href: '/calendar', icon: Calendar, label: 'Календарь' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // Здесь будет логика выхода из системы
    console.log('Выход из системы');
  };

  return (
    <aside className="w-64 bg-secondary p-4 flex flex-col h-full">
      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-primary/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-2">
        <Link
          href="/settings"
          className={`flex items-center space-x-2 p-2 rounded-lg ${
            pathname === '/settings'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-primary/10'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Настройки</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-foreground hover:bg-primary/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Выйти
        </Button>
      </div>
    </aside>
  );
}