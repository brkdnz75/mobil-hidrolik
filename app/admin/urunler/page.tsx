import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { saveProductAction, deleteProductAction } from '@/app/actions/admin';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.category.findMany({ orderBy: { order: 'asc' } })
  ]);

  const editing = params.edit ? products.find((item) => item.id === params.edit) : null;
  const docs = (editing?.documents as { tdsUrl?: string; msdsUrl?: string }) || {};

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Ürün Yönetimi</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editing ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveProductAction} className="grid gap-4">
            <input type="hidden" name="id" defaultValue={editing?.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Ürün Adı</Label>
                <Input name="name" defaultValue={editing?.name} required />
              </div>
              <div>
                <Label>Slug</Label>
                <Input name="slug" defaultValue={editing?.slug} required />
              </div>
              <div>
                <Label>Kategori</Label>
                <Select name="categoryId" defaultValue={editing?.categoryId} required>
                  <option value="">Seçiniz</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>ISO VG</Label>
                <Input name="isoVg" defaultValue={editing?.isoVg} required />
              </div>
              <div>
                <Label>Viskozite İndeksi</Label>
                <Input name="viscosityIndex" defaultValue={editing?.viscosityIndex || ''} type="number" step="0.1" />
              </div>
              <div>
                <Label>Yoğunluk</Label>
                <Input name="density" defaultValue={editing?.density || ''} type="number" step="0.001" />
              </div>
            </div>

            <div>
              <Label>Kısa Açıklama</Label>
              <Input name="shortDesc" defaultValue={editing?.shortDesc} required />
            </div>
            <div>
              <Label>Uzun Açıklama</Label>
              <Textarea name="longDesc" defaultValue={editing?.longDesc} required />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Paketler (virgül)</Label>
                <Input name="packagingText" defaultValue={((editing?.packaging as string[]) || []).join(', ')} required />
              </div>
              <div>
                <Label>Öne Çıkanlar (virgül)</Label>
                <Input name="highlightsText" defaultValue={((editing?.highlights as string[]) || []).join(', ')} required />
              </div>
              <div>
                <Label>Görsel URLleri (virgül)</Label>
                <Input name="imagesText" defaultValue={((editing?.images as string[]) || []).join(', ')} required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>TDS URL</Label>
                <Input name="tdsUrl" defaultValue={docs.tdsUrl || ''} />
              </div>
              <div>
                <Label>MSDS URL</Label>
                <Input name="msdsUrl" defaultValue={docs.msdsUrl || ''} />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="isFeatured" defaultChecked={editing?.isFeatured} /> Öne çıkan ürün
            </label>

            <div className="flex gap-2">
              <Button type="submit">{editing ? 'Güncelle' : 'Kaydet'}</Button>
              {editing ? (
                <Link href="/admin/urunler">
                  <Button type="button" variant="outline">
                    İptal
                  </Button>
                </Link>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ürünler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>ISO VG</TableHead>
                <TableHead>İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.isoVg}</TableCell>
                  <TableCell className="flex gap-2">
                    <Link href={`/admin/urunler?edit=${product.id}`}>
                      <Button size="sm" variant="outline">
                        Düzenle
                      </Button>
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <Button size="sm" type="submit" variant="secondary">
                        Sil
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

