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
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

type SearchParams = {
  edit?: string;
  q?: string;
  categoryId?: string;
};

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = (params.q || '').trim();
  const categoryId = (params.categoryId || '').trim();

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      where: {
        ...(categoryId ? { categoryId } : {}),
        ...(query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { slug: { contains: query, mode: 'insensitive' } },
                { shortDesc: { contains: query, mode: 'insensitive' } }
              ]
            }
          : {})
      },
      orderBy: { updatedAt: 'desc' }
    }),
    prisma.category.findMany({ orderBy: { order: 'asc' } })
  ]);

  const editing = params.edit ? products.find((item) => item.id === params.edit) : null;
  const docs = (editing?.documents as { tdsUrl?: string; msdsUrl?: string }) || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Ürün Yönetimi</h1>
        <p className="text-sm text-muted-foreground">Ürün ekleyin, teknik değerleri güncelleyin ve katalog akışını yönetin.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editing ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveProductAction} className="grid gap-4">
            <input type="hidden" name="id" defaultValue={editing?.id} />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Ürün Adı</Label>
                <Input id="name" name="name" defaultValue={editing?.name} required />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" defaultValue={editing?.slug} required />
              </div>
              <div>
                <Label htmlFor="categoryId">Kategori</Label>
                <Select id="categoryId" name="categoryId" defaultValue={editing?.categoryId} required>
                  <option value="">Seçiniz</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="isoVg">ISO VG</Label>
                <Input id="isoVg" name="isoVg" defaultValue={editing?.isoVg} required />
              </div>
              <div>
                <Label htmlFor="viscosityIndex">Viskozite İndeksi</Label>
                <Input id="viscosityIndex" name="viscosityIndex" defaultValue={editing?.viscosityIndex || ''} type="number" step="0.1" />
              </div>
              <div>
                <Label htmlFor="density">Yoğunluk</Label>
                <Input id="density" name="density" defaultValue={editing?.density || ''} type="number" step="0.001" />
              </div>
              <div>
                <Label htmlFor="pourPoint">Akma Noktası (°C)</Label>
                <Input id="pourPoint" name="pourPoint" defaultValue={editing?.pourPoint || ''} type="number" step="0.1" />
              </div>
              <div>
                <Label htmlFor="flashPoint">Parlama Noktası (°C)</Label>
                <Input id="flashPoint" name="flashPoint" defaultValue={editing?.flashPoint || ''} type="number" step="0.1" />
              </div>
            </div>

            <div>
              <Label htmlFor="shortDesc">Kısa Açıklama</Label>
              <Input id="shortDesc" name="shortDesc" defaultValue={editing?.shortDesc} required />
            </div>
            <div>
              <Label htmlFor="longDesc">Uzun Açıklama</Label>
              <Textarea id="longDesc" name="longDesc" defaultValue={editing?.longDesc} rows={5} required />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="packagingText">Paketler (virgül)</Label>
                <Input id="packagingText" name="packagingText" defaultValue={((editing?.packaging as string[]) || []).join(', ')} required />
              </div>
              <div>
                <Label htmlFor="highlightsText">Öne Çıkanlar (virgül)</Label>
                <Input id="highlightsText" name="highlightsText" defaultValue={((editing?.highlights as string[]) || []).join(', ')} required />
              </div>
              <div>
                <Label htmlFor="imagesText">Görsel URL listesi (virgül)</Label>
                <Input id="imagesText" name="imagesText" defaultValue={((editing?.images as string[]) || []).join(', ')} required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="tdsUrl">TDS URL</Label>
                <Input id="tdsUrl" name="tdsUrl" defaultValue={docs.tdsUrl || ''} />
              </div>
              <div>
                <Label htmlFor="msdsUrl">MSDS URL</Label>
                <Input id="msdsUrl" name="msdsUrl" defaultValue={docs.msdsUrl || ''} />
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
          <CardTitle>Ürün Listesi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="grid gap-3 md:grid-cols-[1fr_240px_auto]" method="get">
            <Input name="q" defaultValue={query} placeholder="Ürün, slug veya kısa açıklama ara" />
            <Select name="categoryId" defaultValue={categoryId}>
              <option value="">Tüm kategoriler</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Button type="submit">Filtrele</Button>
          </form>

          {products.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ürün</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>ISO VG</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Güncelleme</TableHead>
                  <TableHead>İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">/{product.slug}</p>
                    </TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.isoVg}</TableCell>
                    <TableCell>{product.isFeatured ? <Badge variant="accent">Öne Çıkan</Badge> : <Badge variant="secondary">Standart</Badge>}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{formatDate(product.updatedAt)}</TableCell>
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
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center">
              <p className="text-base font-medium">Filtreye uygun ürün bulunamadı.</p>
              <p className="mt-1 text-sm text-muted-foreground">Arama kriterlerini değiştirip tekrar deneyin.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
