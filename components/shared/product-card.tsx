import Link from 'next/link';
import { Product, Category } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { SurfaceCard } from '@/components/system/surface-card';

interface ProductCardProps {
  product: Product & { category: Category };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <SurfaceCard variant="solid" className="h-full p-0">
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{product.isoVg}</Badge>
          {product.isFeatured ? <Badge variant="accent">Popüler</Badge> : null}
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.shortDesc}</p>
        <p className="text-xs text-muted-foreground">Kategori: {product.category.name}</p>
        <Link href={`/urunler/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          Detayları İncele <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </SurfaceCard>
  );
}
