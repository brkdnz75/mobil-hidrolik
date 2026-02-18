import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ select: { slug: true, updatedAt: true } });

  const staticRoutes = ['', '/urunler', '/uygulamalar', '/hakkimizda', '/sertifikalar', '/iletisim', '/kvkk', '/gizlilik'].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date()
    })
  );

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/urunler/${product.slug}`,
    lastModified: product.updatedAt
  }));

  return [...staticRoutes, ...productRoutes];
}
