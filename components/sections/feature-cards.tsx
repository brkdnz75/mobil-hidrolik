import Link from 'next/link';
import { ArrowRight, FlaskConical, Gauge, ShieldAlert, Zap } from 'lucide-react';
import { Reveal, RevealItem, RevealStagger } from '@/components/shared/reveal';

const miniFeatures = [
  {
    title: 'Aşınma Koruması',
    text: 'Yüksek basınç altında ekipman ömrünü uzatan katkı paketi.',
    icon: ShieldAlert
  },
  {
    title: 'Isıl Kararlılık',
    text: 'Sıcaklık dalgalanmalarında stabil viskozite davranışı.',
    icon: Gauge
  },
  {
    title: 'Verimlilik',
    text: 'Düşük sürtünme ile enerji kayıplarını azaltan performans.',
    icon: Zap
  }
];

interface PrimaryItem {
  id: string;
  name: string;
  desc: string;
  href: string;
}

export function FeatureCards({ primaryItems }: { primaryItems: PrimaryItem[] }) {
  return (
    <section className="py-24">
      <div className="container space-y-14">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary/80">Öne Çıkan Portföy</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Premium sınıfta ürün ve teknik değer odağı</h2>
            <p className="mt-4 text-lg text-muted-foreground">İki farklı kart yapısıyla hem hızlı tarama hem de karar odaklı bilgi mimarisi.</p>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-4 md:grid-cols-3">
          {miniFeatures.map((item) => (
            <RevealItem key={item.title}>
              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                <item.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>

        <RevealStagger className="grid gap-5 lg:grid-cols-3">
          {primaryItems.map((item) => (
            <RevealItem key={item.id}>
              <article className="rounded-2xl border border-white/70 bg-gradient-to-b from-white to-slate-50 p-7 shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl">
                <div className="inline-flex rounded-full bg-primary/10 p-2 text-primary">
                  <FlaskConical className="h-4 w-4" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{item.name}</h3>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Detayları Gör <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
