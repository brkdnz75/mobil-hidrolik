import type { Metadata } from 'next';
import { Building2, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { getProducts } from '@/lib/data';
import { siteConfig } from '@/lib/site';
import { InquiryForm } from '@/components/sections/inquiry-form';
import { Section } from '@/components/system/section';
import { SurfaceCard } from '@/components/system/surface-card';
import { Heading } from '@/components/system/heading';
import { CTASection } from '@/components/system/cta-section';
import { RevealItem, RevealStagger } from '@/components/shared/reveal';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Teklif, ürün ve teknik destek talepleriniz için bizimle iletişime geçin.'
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ productId?: string }> }) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);

  return (
    <PageShell theme="neutral">
      <PageHero
        variant="image"
        eyebrow="Teklif"
        title="İletişim ve Teklif"
        subtitle="Formu doldurun, teknik ekibimiz en kısa sürede size dönsün."
        backgroundImage="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1800&q=80"
        breadcrumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'İletişim' }]}
      />

      <Section>
        <RevealStagger className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealItem>
            <SurfaceCard variant="glass">
              <Heading title="Teklif Formu" description="Ürün, uygulama ve teknik destek talepleriniz için formu doldurun." />
              <div className="mt-6">
                <InquiryForm products={products.map((product) => ({ id: product.id, name: product.name }))} presetProductId={params.productId} />
              </div>
            </SurfaceCard>
          </RevealItem>

          <div className="space-y-4">
            <RevealItem>
              <SurfaceCard variant="solid">
                <h3 className="text-xl font-semibold tracking-tight">İletişim Bilgileri</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {siteConfig.address}</li>
                  <li className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {siteConfig.phone}</li>
                  <li className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {siteConfig.email}</li>
                  <li className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" /> {siteConfig.workHours}</li>
                </ul>
              </SurfaceCard>
            </RevealItem>

            <RevealItem>
              <SurfaceCard variant="solid">
                <h3 className="text-xl font-semibold tracking-tight">Lojistik / Ofis</h3>
                <div className="mt-4 aspect-video rounded-xl border bg-slate-100 p-4 text-xs text-muted-foreground">
                  Harita Embed Alanı (placeholder)
                </div>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 text-primary" /> İkitelli OSB / İstanbul
                </p>
              </SurfaceCard>
            </RevealItem>
          </div>
        </RevealStagger>
      </Section>

      <CTASection />
    </PageShell>
  );
}
