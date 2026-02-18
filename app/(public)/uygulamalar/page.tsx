import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Factory, Tractor, Truck, Wrench } from 'lucide-react';
import { getProducts } from '@/lib/data';
import { Section } from '@/components/system/section';
import { Heading } from '@/components/system/heading';
import { FeatureGrid } from '@/components/system/feature-grid';
import { SurfaceCard } from '@/components/system/surface-card';
import { CTASection } from '@/components/system/cta-section';
import { Reveal, RevealItem, RevealStagger } from '@/components/shared/reveal';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Uygulamalar',
  description: 'Sektörel kullanım senaryoları ve ürün önerileri.'
};

const sectors = [
  { id: 'insaat', name: 'İnşaat Makinaları', description: 'Ekskavatör, dozer ve vinç sistemlerinde yüksek yük dayanımı.', iso: 'ISO VG 46 / 68', icon: <Factory className="h-5 w-5" /> },
  { id: 'uretim', name: 'Üretim Hatları', description: 'Pres ve otomasyon hatlarında termal stabilite odaklı formül.', iso: 'ISO VG 32 / 46', icon: <Wrench className="h-5 w-5" /> },
  { id: 'tarim', name: 'Tarım Ekipmanları', description: 'Mevsim geçişlerinde akışkanlığı koruyan saha güveni.', iso: 'ISO VG 46 / 68', icon: <Tractor className="h-5 w-5" /> },
  { id: 'lojistik', name: 'Lojistik ve Kaldırma', description: 'Forklift ve platformlarda aşınma önleyici koruma.', iso: 'ISO VG 32 / 46', icon: <Truck className="h-5 w-5" /> }
];

export default async function ApplicationsPage() {
  const products = await getProducts();

  return (
    <PageShell theme="neutral">
      <PageHero
        variant="image"
        title="Uygulama Alanları"
        subtitle="Sektöre özel kullanım senaryoları ve teknik olarak eşleşen ürün önerileri."
        backgroundImage="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1800&q=80"
        breadcrumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Uygulamalar' }]}
      />

      <Section>
        <Reveal>
          <Heading label="Sektör Çözümleri" title="Endüstriyel uygulamaya göre önerilen ürün setleri" description="Her kartta kullanım alanı, önerilen viskozite sınıfı ve ilgili ürün geçişi bulunur." />
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 md:grid-cols-2">
          {sectors.map((sector) => (
            <RevealItem key={sector.id}>
              <SurfaceCard variant="solid" className="p-7">
                <div className="mb-3 text-primary">{sector.icon}</div>
                <h3 className="text-2xl font-semibold tracking-tight">{sector.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{sector.description}</p>
                <p className="mt-4 text-sm font-medium">Önerilen Sınıf: {sector.iso}</p>
                <div className="mt-4 space-y-1">
                  {products.slice(0, 2).map((product) => (
                    <Link key={`${sector.id}-${product.id}`} href={`/urunler/${product.slug}`} className="inline-flex items-center gap-1 text-sm text-primary">
                      {product.name} <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </SurfaceCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section tone="muted" size="lg">
        <Reveal>
          <Heading title="Uygulama Güvenceleri" description="Her sektörde aynı kalite standardını sürdürmek için operasyonel disiplin." />
        </Reveal>
        <div className="mt-10">
          <FeatureGrid
            columns={3}
            items={[
              { id: 'a', title: 'Saha Uyumu', description: 'Makine tipine göre ürün eşleştirme ve geçiş planı.' },
              { id: 'b', title: 'Stok Planlama', description: 'Kritik ürünlerde düzenli tedarik ve sevkiyat takibi.' },
              { id: 'c', title: 'Teknik İzleme', description: 'Kullanım sonrası teknik geri bildirim ve optimizasyon.' }
            ]}
          />
        </div>
      </Section>

      <CTASection />
    </PageShell>
  );
}
