import { RevealItem, RevealStagger } from '@/components/shared/reveal';
import { SurfaceCard } from '@/components/system/surface-card';

export function FeatureGrid({
  items,
  columns = 3
}: {
  items: { id: string; title: string; description: string; icon?: React.ReactNode }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = columns === 4 ? 'lg:grid-cols-4' : columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  return (
    <RevealStagger className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
      {items.map((item) => (
        <RevealItem key={item.id}>
          <SurfaceCard variant="solid">
            {item.icon ? <div className="mb-3 text-primary">{item.icon}</div> : null}
            <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </SurfaceCard>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
