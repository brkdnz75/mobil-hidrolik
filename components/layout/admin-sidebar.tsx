"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { adminNavItems } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-xl border bg-white p-4 lg:w-64 lg:sticky lg:top-20 lg:h-fit">
      <div className="mb-4 border-b pb-4">
        <p className="text-sm text-muted-foreground">Admin Panel</p>
        <p className="text-lg font-semibold">HidrolikPro</p>
      </div>

      <nav className="space-y-1">
        {adminNavItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={cn(
              'block rounded-md px-3 py-2 text-sm',
              pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Button
        variant="outline"
        className="mt-6 w-full"
        onClick={() => signOut({ callbackUrl: '/admin' })}
      >
        <LogOut className="mr-2 h-4 w-4" /> Çıkış
      </Button>
    </aside>
  );
}
