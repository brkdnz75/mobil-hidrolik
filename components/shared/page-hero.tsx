import { cn } from '@/lib/utils';

export function PageHero({ title, description, className }: { title: string; description: string; className?: string }) {
  return (
    <section className={cn('border-b bg-white/70', className)}>
      <div className="container py-12 md:py-16">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
