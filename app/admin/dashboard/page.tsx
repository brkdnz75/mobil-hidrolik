import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, inquiryCount, latestInquiry] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.inquiry.count(),
    prisma.inquiry.findFirst({ orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Toplam Ürün</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{productCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Toplam Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{categoryCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Toplam Talep</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{inquiryCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son Talep</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {latestInquiry ? (
            <p>
              {latestInquiry.name} - {latestInquiry.subject} ({formatDate(latestInquiry.createdAt)})
            </p>
          ) : (
            <p>Henuz talep yok.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
