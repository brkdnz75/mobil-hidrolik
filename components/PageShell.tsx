import { cn } from '@/lib/utils';

type ShellTheme = 'neutral' | 'catalog' | 'industrial';

const themeClasses: Record<ShellTheme, string> = {
  neutral:
    'bg-slate-50 text-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(2,6,23,0.08),transparent_60%)]',
  catalog:
    'bg-slate-50 text-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(2,6,23,0.06),transparent_62%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] before:bg-[size:30px_30px] before:opacity-35',
  industrial:
    'dark bg-slate-950 text-white bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_60%)]'
};

export function PageShell({
  children,
  theme = 'neutral',
  className
}: {
  children: React.ReactNode;
  theme?: ShellTheme;
  className?: string;
}) {
  return (
    <div data-shell-theme={theme} className={cn('relative min-h-screen', themeClasses[theme], className)}>
      {children}
    </div>
  );
}
