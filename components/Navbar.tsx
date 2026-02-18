"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Droplets } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const topState = !isScrolled;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        topState
          ? 'border-transparent bg-transparent'
          : 'border-b border-slate-200/60 bg-white/70 shadow-[0_12px_34px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className={cn(
            'inline-flex items-center gap-2 text-lg font-semibold tracking-tight',
            topState ? 'text-white/95' : 'text-slate-900'
          )}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-sky-400 text-white shadow-sm">
            <Droplets className="h-4 w-4" />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative pb-1 text-sm transition-colors',
                  topState ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-950',
                  active && (topState ? 'text-white' : 'text-slate-950')
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-current transition-transform duration-300 group-hover:scale-x-100',
                    active && 'scale-x-100'
                  )}
                />
              </Link>
            );
          })}
          <Link href="/iletisim">
            <Button size="sm">Teklif Al</Button>
          </Link>
        </nav>

        <button
          type="button"
          className={cn('rounded-md p-2 md:hidden', topState ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-100')}
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
                pathname === item.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/iletisim" onClick={() => setOpen(false)} className="block px-3 pt-2">
            <Button className="w-full">Teklif Al</Button>
          </Link>
        </div>
      </Sheet>
    </header>
  );
}

