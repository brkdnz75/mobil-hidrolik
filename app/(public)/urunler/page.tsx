import type { Metadata } from 'next';
import { getCategories, getProducts } from '@/lib/data';
import { siteConfig } from '@/lib/site';
import { ProductFilters } from '@/components/sections/product-filters';
import { Section } from '@/components/system/section';
import { CTASection } from '@/components/system/cta-section';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Ürünler',
  description: `${siteConfig.name} hidrolik yağ ürün kataloğu.`
};

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const [products, categories, params] = await Promise.all([getProducts(), getCategories(), searchParams]);

  return (
    <PageShell theme="catalog">
      <PageHero
        variant="image"
        eyebrow="Katalog"
        title="Ürün Kataloğu"
        subtitle="Kategori, viskozite ve uygulama alanına göre premium ürün portföyünü filtreleyin."
        backgroundImage="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1800&q=80"
        breadcrumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Ürünler' }]}
      />

      <Section size="lg" className="py-24">
        <ProductFilters products={products} categories={categories} initialCategory={params.kategori} />
      </Section>

      <CTASection />
    </PageShell>
  );
}
