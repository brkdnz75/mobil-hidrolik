"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FileText, FolderTree, LayoutDashboard, LogOut, PackageSearch, SendHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const items = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/urunler', label: 'Ürünler', icon: PackageSearch },
  { href: '/admin/kategoriler', label: 'Kategoriler', icon: FolderTree },
  { href: '/admin/talepler', label: 'Talepler', icon: SendHorizontal },
  { href: '/admin/icerikler', label: 'İçerikler', icon: FileText }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-xl border bg-white p-4 lg:sticky lg:top-20 lg:h-fit">
      <div className="mb-4 border-b pb-4">
        <p className="text-sm text-muted-foreground">Admin Panel</p>
        <p className="text-lg font-semibold tracking-tight">HidrolikPro</p>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition',
                active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Button variant="outline" className="mt-6 w-full" onClick={() => signOut({ callbackUrl: '/admin' })}>
        <LogOut className="mr-2 h-4 w-4" /> Çıkış
      </Button>
    </aside>
  );
}