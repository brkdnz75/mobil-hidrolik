import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeroVariant = 'image' | 'gradient' | 'video';

export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumbs,
  backgroundImage,
  variant = 'image',
  videoSrc,
  className
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  breadcrumbs?: { label: string; href?: string }[];
  backgroundImage?: string;
  variant?: HeroVariant;
  videoSrc?: string;
  className?: string;
}) {
  const imageUrl =
    backgroundImage ||
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1800&q=80';

  return (
    <header className={cn('relative overflow-hidden border-b border-white/20', className)}>
      {variant === 'video' ? (
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : variant === 'image' ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.92),rgba(15,23,42,0.85)_40%,rgba(30,64,175,0.65))]" />
      )}

      {variant !== 'gradient' ? <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/25" /> : null}

      <div className="container relative py-20 md:min-h-[420px] md:py-24">
        {breadcrumbs?.length ? (
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {breadcrumbs.map((item, idx) => (
              <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-2">
                {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                {idx < breadcrumbs.length - 1 ? <ChevronRight className="h-3 w-3" /> : null}
              </span>
            ))}
          </div>
        ) : null}

        {eyebrow ? (
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">{subtitle}</p>
      </div>
    </header>
  );
}
