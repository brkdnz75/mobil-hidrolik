import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { saveCategoryAction, deleteCategoryAction } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function AdminCategoriesPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } });
  const editing = params.edit ? categories.find((item) => item.id === params.edit) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Kategori Yönetimi</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editing ? 'Kategori D?zenle' : 'Yeni Kategori'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveCategoryAction} className="grid gap-4 md:grid-cols-4">
            <input type="hidden" name="id" defaultValue={editing?.id} />
            <div>
              <Label>Ad</Label>
              <Input name="name" defaultValue={editing?.name} required />
            </div>
            <div>
              <Label>Slug</Label>
              <Input name="slug" defaultValue={editing?.slug} required />
            </div>
            <div>
              <Label>Sira</Label>
              <Input name="order" type="number" defaultValue={editing?.order ?? 0} required />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit">{editing ? 'Guncelle' : 'Kaydet'}</Button>
              {editing ? (
                <Link href="/admin/kategoriler">
                  <Button type="button" variant="outline">
                    Iptal
                  </Button>
                </Link>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kategoriler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Sira</TableHead>
                <TableHead>Islem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category.order}</TableCell>
                  <TableCell className="flex gap-2">
                    <Link href={`/admin/kategoriler?edit=${category.id}`}>
                      <Button size="sm" variant="outline">
                        D?zenle
                      </Button>
                    </Link>
                    <form action={deleteCategoryAction}>
                      <input type="hidden" name="id" value={category.id} />
                      <Button size="sm" variant="secondary" type="submit">
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
