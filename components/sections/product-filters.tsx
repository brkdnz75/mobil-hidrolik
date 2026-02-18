"use client";

import { useMemo, useState } from 'react';
import { Category, Product } from '@prisma/client';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/shared/product-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { RevealItem, RevealStagger } from '@/components/shared/reveal';
import { SurfaceCard } from '@/components/system/surface-card';

interface ProductGridProps {
  products: (Product & { category: Category })[];
  categories: Category[];
  initialCategory?: string;
}

export function ProductFilters({ products, categories, initialCategory }: ProductGridProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory || 'all');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    const base = products.filter((product) => {
      const matchQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === 'all' || product.category.slug === category;
      return matchQuery && matchCategory;
    });

    return base.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'tr');
      return +new Date(b.updatedAt) - +new Date(a.updatedAt);
    });
  }, [products, query, category, sort]);

  return (
    <div className="space-y-8">
      <SurfaceCard variant="glass" className="p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Ürün ara..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Tüm Kategoriler</option>
            {categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.slug}>
                {categoryItem.name}
              </option>
            ))}
          </Select>

          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">En Yeni</option>
            <option value="name">Ada Göre</option>
          </Select>
        </div>
        <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" /> {filtered.length} ürün listeleniyor
        </p>
      </SurfaceCard>

      {filtered.length === 0 ? (
        <EmptyState title="Ürün bulunamadı" description="Filtreleri temizleyip tekrar deneyin." />
      ) : (
        <RevealStagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealStagger>
      )}
    </div>
  );
}
