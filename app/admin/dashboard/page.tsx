import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

export default async function AdminDashboardPage() {
  const [
    productCount,
    featuredProductCount,
    categoryCount,
    inquiryCount,
    newInquiryCount,
    readInquiryCount,
    archivedInquiryCount,
    latestInquiry,
    latestInquiries,
    latestProducts
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isFeatured: true } }),
    prisma.category.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
    prisma.inquiry.count({ where: { status: 'READ' } }),
    prisma.inquiry.count({ where: { status: 'ARCHIVED' } }),
    prisma.inquiry.findFirst({ orderBy: { createdAt: 'desc' } }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { product: { select: { name: true } } }
    }),
    prisma.product.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: { category: { select: { name: true } } }
    })
  ]);

  const statCards = [
    { title: 'Toplam Ürün', value: productCount, detail: `${featuredProductCount} öne çıkan` },
    { title: 'Toplam Kategori', value: categoryCount, detail: 'Katalog yapısı' },
    { title: 'Toplam Talep', value: inquiryCount, detail: `${newInquiryCount} yeni talep` },
    { title: 'Yanıtlanan Talep', value: readInquiryCount + archivedInquiryCount, detail: 'READ + ARCHIVED' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Sistem özeti, son talepler ve ürün güncellemeleri.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/talepler">
            <Button variant="outline">Talepleri Gör</Button>
          </Link>
          <Link href="/admin/urunler">
            <Button>Yeni Ürün</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son 5 Talep</CardTitle>
          </CardHeader>
          <CardContent>
            {latestInquiries.length ? (
              <div className="space-y-3">
                {latestInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium">{inquiry.subject}</p>
                      <Badge variant={inquiry.status === 'NEW' ? 'accent' : inquiry.status === 'READ' ? 'secondary' : 'default'}>{inquiry.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{inquiry.name} · {inquiry.email}</p>
                    <p className="text-xs text-muted-foreground">{inquiry.product?.name || 'Ürün belirtilmedi'} · {formatDate(inquiry.createdAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Henüz talep yok.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son 5 Ürün Güncellemesi</CardTitle>
          </CardHeader>
          <CardContent>
            {latestProducts.length ? (
              <div className="space-y-3">
                {latestProducts.map((product) => (
                  <div key={product.id} className="rounded-lg border p-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category.name} · {product.isoVg}</p>
                    <p className="text-xs text-muted-foreground">Güncelleme: {formatDate(product.updatedAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Henüz ürün bulunmuyor.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>En Son Talep Özeti</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {latestInquiry ? (
            <p>
              {latestInquiry.name} · {latestInquiry.subject} ({formatDate(latestInquiry.createdAt)})
            </p>
          ) : (
            <p>Henüz talep yok.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}