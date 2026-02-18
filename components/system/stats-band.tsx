import { Clock3, PackageCheck, ShieldCheck, Wrench } from 'lucide-react';
import { RevealItem, RevealStagger } from '@/components/shared/reveal';
import { SurfaceCard } from '@/components/system/surface-card';
import { Section } from '@/components/system/section';

export function StatsBand() {
  const stats = [
    { value: '15+', label: 'Yıl Tecrübe', icon: ShieldCheck },
    { value: '1200+', label: 'Anlık Stok SKU', icon: PackageCheck },
    { value: '7/24', label: 'Teknik Destek', icon: Wrench },
    { value: '<24s', label: 'Hızlı Geri Dönüş', icon: Clock3 }
  ];

  return (
    <Section className="py-12">
      <RevealStagger className="grid gap-4 rounded-2xl border border-white/60 bg-white/92 p-6 shadow-xl shadow-slate-900/10 backdrop-blur md:grid-cols-4">
        {stats.map((item) => (
          <RevealItem key={item.label}>
            <SurfaceCard variant="solid" className="p-5">
              <item.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </SurfaceCard>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
