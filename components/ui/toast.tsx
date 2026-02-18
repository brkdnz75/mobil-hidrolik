"use client";

import * as React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface ToastItem {
  id: number;
  message: string;
  variant?: 'default' | 'error';
}

const ToastContext = createContext<{ show: (message: string, variant?: 'default' | 'error') => void } | null>(null);

let id = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const api = useMemo(
    () => ({
      show(message: string, variant: 'default' | 'error' = 'default') {
        const newItem = { id: id++, message, variant };
        setItems((prev) => [...prev, newItem]);
        setTimeout(() => setItems((prev) => prev.filter((item) => item.id !== newItem.id)), 3000);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'rounded-lg px-4 py-2 text-sm text-white shadow-lg',
              item.variant === 'error' ? 'bg-red-600' : 'bg-primary'
            )}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      show: () => undefined
    };
  }
  return context;
}
