import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { updateInquiryStatusAction } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InquiryDetailDialog } from '@/components/admin/inquiry-detail-dialog';
import { formatDate } from '@/lib/utils';

const statuses = ['ALL', 'NEW', 'READ', 'ARCHIVED'] as const;

type SearchParams = {
  status?: string;
  q?: string;
};

export default async function AdminInquiriesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const selectedStatus = statuses.includes((params.status || 'ALL') as (typeof statuses)[number]) ? (params.status as (typeof statuses)[number]) : 'ALL';
  const query = (params.q || '').trim();

  const where = {
    ...(selectedStatus !== 'ALL' ? { status: selectedStatus } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { email: { contains: query, mode: 'insensitive' as const } },
            { subject: { contains: query, mode: 'insensitive' as const } }
          ]
        }
      : {})
  };

  const [inquiries, counts] = await Promise.all([
    prisma.inquiry.findMany({ include: { product: true }, where, orderBy: { createdAt: 'desc' } }),
    prisma.inquiry.groupBy({ by: ['status'], _count: { status: true } })
  ]);

  const statusCount = {
    NEW: counts.find((item) => item.status === 'NEW')?._count.status ?? 0,
    READ: counts.find((item) => item.status === 'READ')?._count.status ?? 0,
    ARCHIVED: counts.find((item) => item.status === 'ARCHIVED')?._count.status ?? 0
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Form Talepleri</h1>
          <p className="text-sm text-muted-foreground">Gelen teklif/iletişim kayıtlarını inceleyin ve durumlarını güncelleyin.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">NEW: {statusCount.NEW}</Badge>
          <Badge variant="secondary">READ: {statusCount.READ}</Badge>
          <Badge>ARCHIVED: {statusCount.ARCHIVED}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-[220px_1fr_auto]" method="get">
            <Select name="status" defaultValue={selectedStatus}>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <Input name="q" defaultValue={query} placeholder="Ad, e-posta veya konu ara" />
            <Button type="submit">Filtrele</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Talepler ({inquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Kişi</TableHead>
                  <TableHead>Konu</TableHead>
                  <TableHead>Ürün</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Detay / İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                    <TableCell>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                    </TableCell>
                    <TableCell>{inquiry.subject}</TableCell>
                    <TableCell>{inquiry.product?.name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={inquiry.status === 'NEW' ? 'accent' : inquiry.status === 'READ' ? 'secondary' : 'default'}>
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-y-2">
                      <InquiryDetailDialog
                        title={inquiry.subject}
                        content={{
                          name: inquiry.name,
                          email: inquiry.email,
                          phone: inquiry.phone,
                          company: inquiry.company,
                          message: inquiry.message
                        }}
                      />
                      <form action={updateInquiryStatusAction} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={inquiry.id} />
                        <Select name="status" defaultValue={inquiry.status}>
                          <option value="NEW">NEW</option>
                          <option value="READ">READ</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </Select>
                        <Button size="sm" type="submit">
                          Kaydet
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <p className="text-base font-medium">Filtreye uygun talep bulunamadı.</p>
              <p className="mt-1 text-sm text-muted-foreground">Filtreleri temizleyip tekrar deneyin.</p>
              <Link href="/admin/talepler" className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
                Filtreleri temizle
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}