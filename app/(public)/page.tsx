import type { Metadata } from 'next';
import { ArrowRight, Cog, Factory, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { getCategories, getFeaturedProducts, getProducts } from '@/lib/data';
import { siteConfig } from '@/lib/site';
import { HeroVideo } from '@/components/sections/hero-video';
import { FeatureCards } from '@/components/sections/feature-cards';
import { Reveal, RevealItem, RevealStagger } from '@/components/shared/reveal';
import { Card, CardContent } from '@/components/ui/card';
import { InquiryForm } from '@/components/sections/inquiry-form';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatsBand } from '@/components/system/stats-band';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Ana Sayfa',
  description: siteConfig.description
};

const industries = ['İnşaat', 'Ağır Sanayi', 'Tarım Ekipmanları', 'Madencilik', 'Lojistik', 'Otomotiv'];

export default async function HomePage() {
  const [categories, featuredProducts, products] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getProducts()
  ]);

  const primaryItems = featuredProducts.slice(0, 3).map((item) => ({
    id: item.id,
    name: item.name,
    desc: item.shortDesc,
    href: `/urunler/${item.slug}`
  }));

  return (
    <PageShell theme="neutral">
      <HeroVideo />
      <StatsBand />

      <FeatureCards primaryItems={primaryItems} />

      <section className="relative overflow-hidden py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container">
          <Reveal>
            <SectionHeading
              title="Kategori Bazlı Hızlı Geçiş"
              description="İhtiyaca göre ürün gamını hızla filtreleyin ve teknik ekiple doğru spesifikasyona geçin."
            />
          </Reveal>

          <RevealStagger className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <RevealItem key={category.id}>
                <Card className="rounded-2xl border-white/70 bg-white/90 p-1 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">Kategori</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{category.name}</h3>
                    <Link href={`/urunler?kategori=${category.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Ürünleri Aç <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-100/70 py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              title="Neden HidrolikPro"
              description="Saha gerçekliği, tedarik gücü ve teknik uzmanlığı tek noktada birleştiriyoruz."
            />
          </Reveal>

          <RevealStagger className="grid gap-4 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Kalite Standardı', text: 'OEM beklentilerine uygun, izlenebilir kalite süreçleri.' },
              { icon: Factory, title: 'Stok Sürekliliği', text: 'Kritik SKU’larda düzenli stok ve planlı sevkiyat yapısı.' },
              { icon: Cog, title: 'Teknik Eşleşme', text: 'Uygulamaya göre doğru viskozite ve ürün geçiş danışmanlığı.' }
            ].map((item) => (
              <RevealItem key={item.title}>
                <article className="rounded-2xl border border-white/70 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              title="Uygulama Alanları"
              description="Endüstriyel hissiyatla tasarlanmış operasyon alanları ve ürün önerileri."
            />
          </Reveal>

          <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <RevealItem key={industry}>
                <article className="relative overflow-hidden rounded-2xl border border-white/70 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <h3 className="text-xl font-semibold tracking-tight">{industry}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Sektöre özel teknik yağ yönetimi yaklaşımı.</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="border-y bg-white py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              title="Teklif ve Teknik Danışmanlık"
              description="Talebinizi iletin, ürün ve uygulama özelinde hızlı geri dönüş sağlayalım."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <InquiryForm products={products.map((product) => ({ id: product.id, name: product.name }))} />
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
            email: siteConfig.email,
            telephone: siteConfig.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.address,
              addressCountry: 'TR'
            }
          })
        }}
      />
    </PageShell>
  );
}
