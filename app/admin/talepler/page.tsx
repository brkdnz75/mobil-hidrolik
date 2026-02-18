import { prisma } from '@/lib/prisma';
import { updateInquiryStatusAction } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InquiryDetailDialog } from '@/components/admin/inquiry-detail-dialog';
import { formatDate } from '@/lib/utils';

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ include: { product: true }, orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Form Talepleri</h1>

      <Card>
        <CardHeader>
          <CardTitle>Talepler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>Kisi</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead>Ürün</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Detay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                  <TableCell>{inquiry.name}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell>{inquiry.product?.name || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={inquiry.status === 'NEW' ? 'accent' : inquiry.status === 'READ' ? 'secondary' : 'default'}>
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
