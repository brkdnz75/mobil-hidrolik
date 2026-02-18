"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Droplets } from 'lucide-react';
import { useState } from 'react';
import { navItems, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-sky-400 text-white shadow-sm">
            <Droplets className="h-4 w-4" />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition hover:bg-muted/70',
                pathname === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/iletisim" className="ml-2">
            <Button size="sm" className="shadow-sm">
              Teklif Al
            </Button>
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 hover:bg-muted md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Menü"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen} side="right">
        <SheetHeader>
          <SheetTitle>Menü</SheetTitle>
          <SheetClose onClick={() => setOpen(false)} />
        </SheetHeader>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block rounded-md px-3 py-2 text-sm',
                pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Sheet>
    </header>
  );
}
