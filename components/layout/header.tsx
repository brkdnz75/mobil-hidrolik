"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Droplets } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = pathname === '/' && !scrolled;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        transparent ? 'border-transparent bg-transparent' : 'border-b border-white/60 bg-white/72 shadow-sm backdrop-blur-xl'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className={cn('inline-flex items-center gap-2 text-lg font-semibold tracking-tight', transparent ? 'text-white' : 'text-foreground')}>
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
                'rounded-md px-3 py-2 text-sm transition',
                transparent ? 'text-white/90 hover:bg-white/15' : 'text-muted-foreground hover:bg-muted/70',
                pathname === item.href && (transparent ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary')
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
          className={cn('rounded-md p-2 md:hidden', transparent ? 'text-white hover:bg-white/15' : 'hover:bg-muted')}
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
        </div>
      </Sheet>
    </header>
  );
}
