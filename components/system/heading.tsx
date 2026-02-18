import { cn } from '@/lib/utils';

export function Heading({
  label,
  title,
  description,
  align = 'left',
  className
}: {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {label ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">{label}</p> : null}
      <h2 className="mt-3 text-[38px] font-semibold tracking-tight md:text-[48px]">{title}</h2>
      {description ? <p className="mt-4 text-lg text-muted-foreground">{description}</p> : null}
    </div>
  );
}
