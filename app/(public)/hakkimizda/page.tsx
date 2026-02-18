import type { Metadata } from 'next';
import { Award, Clock3, Compass, Sparkles } from 'lucide-react';
import { getPageContent } from '@/lib/data';
import { Section } from '@/components/system/section';
import { Heading } from '@/components/system/heading';
import { FeatureGrid } from '@/components/system/feature-grid';
import { SurfaceCard } from '@/components/system/surface-card';
import { CTASection } from '@/components/system/cta-section';
import { StatsBand } from '@/components/system/stats-band';
import { MarkdownView } from '@/components/shared/markdown-view';
import { Reveal, RevealItem, RevealStagger } from '@/components/shared/reveal';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'HidrolikPro firma hikayesi, misyon ve vizyon.'
};

const timeline = [
  { year: '2011', text: 'Endüstriyel yağ tedariğinde ilk saha operasyonları başladı.' },
  { year: '2016', text: 'Teknik danışmanlık ve analiz odaklı ekip kuruldu.' },
  { year: '2020', text: 'Bölgesel stok ve hızlı sevkiyat modeli devreye alındı.' },
  { year: '2024', text: 'Premium ürün ailesi ve B2B dijital kanal büyütüldü.' }
];

export default async function AboutPage() {
  const content = await getPageContent('hakkimizda');

  return (
    <PageShell theme="neutral">
      <PageHero
        variant="image"
        title="Hakkımızda"
        subtitle="Teknik uzmanlık, güvenilir tedarik ve sürdürülebilir performans odağıyla çalışıyoruz."
        backgroundImage="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1800&q=80"
        breadcrumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hakkımızda' }]}
      />

      <StatsBand />

      <Section>
        <Reveal>
          <Heading label="Kurumsal" title="Hikâyemiz" description="Müşterilerimize süreklilik, verim ve güvenlik sağlayan teknik çözümler sunuyoruz." />
        </Reveal>
        <RevealStagger className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <RevealItem>
            <SurfaceCard variant="glass">
              <MarkdownView content={content?.content || 'İçerik yakında eklenecek.'} />
            </SurfaceCard>
          </RevealItem>
          <RevealItem>
            <SurfaceCard variant="solid" className="overflow-hidden p-0">
              <img
                src="https://images.unsplash.com/photo-1581091870622-2f2de6e2f12f?auto=format&fit=crop&w=1200&q=80"
                alt="Endüstriyel tesis"
                className="h-full w-full min-h-[360px] object-cover"
              />
            </SurfaceCard>
          </RevealItem>
        </RevealStagger>
      </Section>

      <Section tone="muted">
        <Heading title="Zaman Çizelgesi" description="Büyümemizi operasyonel disiplin ve teknik gelişimle sürdürdük." />
        <RevealStagger className="mt-10 grid gap-4 md:grid-cols-2">
          {timeline.map((item) => (
            <RevealItem key={item.year}>
              <SurfaceCard variant="solid">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">{item.year}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </SurfaceCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section>
        <Heading title="Değerlerimiz" description="Kaliteyi süreçle, güveni sürdürülebilir performansla kuruyoruz." />
        <div className="mt-10">
          <FeatureGrid
            columns={4}
            items={[
              { id: 'v1', title: 'Kalite', description: 'Standartlara bağlı, izlenebilir ürün kalitesi.', icon: <Award className="h-5 w-5" /> },
              { id: 'v2', title: 'Hız', description: 'İhtiyaca zamanında cevap veren çevik operasyon.', icon: <Clock3 className="h-5 w-5" /> },
              { id: 'v3', title: 'Odak', description: 'Müşteri uygulamasına uygun teknik yönlendirme.', icon: <Compass className="h-5 w-5" /> },
              { id: 'v4', title: 'İnovasyon', description: 'Sahadan öğrenen ve gelişen ürün yaklaşımı.', icon: <Sparkles className="h-5 w-5" /> }
            ]}
          />
        </div>
      </Section>

      <CTASection />
    </PageShell>
  );
}
