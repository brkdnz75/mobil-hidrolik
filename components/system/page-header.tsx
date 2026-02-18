import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/system/container';

export function PageHeader({
  title,
  description,
  image,
  breadcrumb,
  className
}: {
  title: string;
  description: string;
  image?: string;
  breadcrumb?: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <header className={cn('relative overflow-hidden border-b border-white/60', className)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80'})`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/86 via-slate-900/72 to-slate-900/52" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />

      <Container className="relative py-24">
        {breadcrumb?.length ? (
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {breadcrumb.map((item, idx) => (
              <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-2">
                {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                {idx < breadcrumb.length - 1 ? <ChevronRight className="h-3 w-3" /> : null}
              </span>
            ))}
          </div>
        ) : null}

        <h1 className="max-w-4xl text-[56px] font-semibold leading-[1.04] tracking-tight text-white md:text-[64px]">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">{description}</p>
      </Container>
    </header>
  );
}
