"use client";

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sheet({ open, onOpenChange, side = 'left', children }: { open: boolean; onOpenChange: (open: boolean) => void; side?: 'left' | 'right'; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-foreground/30" onClick={() => onOpenChange(false)}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'absolute top-0 h-full w-[85%] max-w-sm bg-white p-4 shadow-xl',
          side === 'left' ? 'left-0' : 'right-0'
        )}
      >
        {children}
      </aside>
    </div>
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 flex items-center justify-between', className)} {...props} />;
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-semibold', className)} {...props} />;
}

export function SheetClose({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-md p-1 text-muted-foreground hover:bg-muted">
      <X className="h-4 w-4" />
    </button>
  );
}
