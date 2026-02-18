import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Download, FileText, Package, ShieldCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';
import { Section } from '@/components/system/section';
import { CTASection } from '@/components/system/cta-section';
import { SurfaceCard } from '@/components/system/surface-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InquiryForm } from '@/components/sections/inquiry-form';
import { Reveal, RevealItem, RevealStagger } from '@/components/shared/reveal';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: 'Ürün Bulunamadı' };

  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: { title: product.name, description: product.shortDesc, type: 'article' }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { category: true } });
  if (!product) notFound();

  const images = ((product.images as string[]) || []).slice(0, 3);
  const highlights = (product.highlights as string[]) || [];
  const packaging = (product.packaging as string[]) || [];
  const documents = (product.documents as { tdsUrl?: string; msdsUrl?: string }) || {};

  return (
    <PageShell theme="catalog">
      <PageHero
        variant="image"
        title={product.name}
        subtitle={product.shortDesc}
        backgroundImage={images[0] || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=80'}
        breadcrumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Ürünler', href: '/urunler' }, { label: product.name }]}
      />

      <Section size="xl" className="py-24">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="space-y-4">
              <SurfaceCard variant="glass" className="overflow-hidden p-0">
                <img src={images[0]} alt={product.name} className="h-[420px] w-full object-cover" />
              </SurfaceCard>
              <RevealStagger className="grid grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <RevealItem key={`${img}-${i}`}>
                    <SurfaceCard variant="outline" className="overflow-hidden p-0">
                      <img src={img} alt={`${product.name} ${i + 1}`} className="h-28 w-full object-cover" />
                    </SurfaceCard>
                  </RevealItem>
                ))}
              </RevealStagger>
              <div className="flex flex-wrap gap-2">
                <Badge>{product.isoVg}</Badge>
                <Badge variant="secondary">{product.category.name}</Badge>
                {product.isFeatured ? <Badge variant="accent">Popüler</Badge> : null}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <SurfaceCard variant="solid" className="space-y-6">
              <p className="text-muted-foreground">{product.longDesc}</p>

              <Tabs defaultValue="specs">
                <TabsList>
                  <TabsTrigger value="specs">Teknik Tablo</TabsTrigger>
                  <TabsTrigger value="usage">Kullanım</TabsTrigger>
                  <TabsTrigger value="docs">Doküman</TabsTrigger>
                </TabsList>

                <TabsContent value="specs" className="space-y-2 text-sm text-muted-foreground">
                  <p>Viskozite İndeksi: {product.viscosityIndex ?? '-'}</p>
                  <p>Akma Noktası: {product.pourPoint ?? '-'}°C</p>
                  <p>Parlama Noktası: {product.flashPoint ?? '-'}°C</p>
                  <p>Yoğunluk: {product.density ?? '-'}</p>
                </TabsContent>

                <TabsContent value="usage">
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {packaging.map((item) => (
                      <Badge key={item} variant="secondary">
                        <Package className="mr-1 h-3.5 w-3.5" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="docs" className="space-y-3">
                  <Link href={documents.tdsUrl || '#'} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <FileText className="h-4 w-4" /> TDS İndir
                  </Link>
                  <br />
                  <Link href={documents.msdsUrl || '#'} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <Download className="h-4 w-4" /> MSDS İndir
                  </Link>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3">
                <Link href={`/iletisim?productId=${product.id}`}>
                  <Button>Teklif Al</Button>
                </Link>
                <Button variant="secondary">
                  <ShieldCheck className="mr-2 h-4 w-4" /> Teknik Uyum
                </Button>
              </div>
            </SurfaceCard>
          </Reveal>
        </div>
      </Section>

      <Section size="lg" className="pt-0">
        <SurfaceCard variant="glass">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Bu ürün için teklif isteyin</h2>
          <InquiryForm presetProductId={product.id} />
        </SurfaceCard>
      </Section>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.shortDesc,
            brand: siteConfig.name,
            category: product.category.name
          })
        }}
      />
    </PageShell>
  );
}
