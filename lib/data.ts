import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export const getCategories = unstable_cache(
  async () => prisma.category.findMany({ orderBy: { order: 'asc' } }),
  ['categories'],
  { revalidate: 300 }
);

export const getFeaturedProducts = unstable_cache(
  async () =>
    prisma.product.findMany({
      where: { isFeatured: true },
      include: { category: true },
      orderBy: { updatedAt: 'desc' },
      take: 6
    }),
  ['featured-products'],
  { revalidate: 300 }
);

export const getProducts = unstable_cache(
  async () =>
    prisma.product.findMany({
      include: { category: true },
      orderBy: { updatedAt: 'desc' }
    }),
  ['products'],
  { revalidate: 120 }
);

export const getPageContent = unstable_cache(
  async (key: string) => prisma.contentPage.findUnique({ where: { key } }),
  ['content-page'],
  { revalidate: 300 }
);
