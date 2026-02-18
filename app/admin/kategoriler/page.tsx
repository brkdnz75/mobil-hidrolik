import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { saveCategoryAction, deleteCategoryAction } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type SearchParams = { edit?: string };

export default async function AdminCategoriesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { products: true } } }
  });

  const editing = params.edit ? categories.find((item) => item.id === params.edit) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Kategori Yönetimi</h1>
        <p className="text-sm text-muted-foreground">Kategori oluşturun, sıralayın ve ürün bağlılıklarını izleyin.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editing ? 'Kategori Düzenle' : 'Yeni Kategori'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveCategoryAction} className="grid gap-4 md:grid-cols-4">
            <input type="hidden" name="id" defaultValue={editing?.id} />
            <div>
              <Label htmlFor="name">Ad</Label>
              <Input id="name" name="name" defaultValue={editing?.name} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={editing?.slug} required />
            </div>
            <div>
              <Label htmlFor="order">Sıra</Label>
              <Input id="order" name="order" type="number" defaultValue={editing?.order ?? 0} required />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit">{editing ? 'Güncelle' : 'Kaydet'}</Button>
              {editing ? (
                <Link href="/admin/kategoriler">
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
          <CardTitle>Kategoriler ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Sıra</TableHead>
                  <TableHead>Ürün Adedi</TableHead>
                  <TableHead>İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.order}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{category._count.products}</Badge>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Link href={`/admin/kategoriler?edit=${category.id}`}>
                        <Button size="sm" variant="outline">
                          Düzenle
                        </Button>
                      </Link>
                      <form action={deleteCategoryAction}>
                        <input type="hidden" name="id" value={category.id} />
                        <Button size="sm" variant="secondary" type="submit" disabled={category._count.products > 0}>
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
              <p className="text-base font-medium">Henüz kategori eklenmedi.</p>
              <p className="mt-1 text-sm text-muted-foreground">Yukarıdaki formu kullanarak ilk kategoriyi ekleyin.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}