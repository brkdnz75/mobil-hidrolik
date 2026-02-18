import { cn } from '@/lib/utils';

export function SurfaceCard({
  children,
  className,
  variant = 'solid'
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'outline';
}) {
  return (
    <article
      className={cn(
        'rounded-2xl p-6 shadow-[0_12px_40px_-24px_rgba(2,6,23,0.45)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_-24px_rgba(2,6,23,0.55)]',
        variant === 'solid' && 'border border-slate-200/70 bg-white dark:border-white/10 dark:bg-slate-900',
        variant === 'glass' && 'border border-white/60 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-white/5',
        variant === 'outline' && 'border border-slate-300/70 bg-transparent shadow-none dark:border-white/20',
        className
      )}
    >
      {children}
    </article>
  );
}
