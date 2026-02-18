import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { saveContentAction } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const editableKeys = ['hakkimizda', 'kvkk', 'gizlilik'] as const;

type SearchParams = { key?: string };

export default async function AdminContentsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const pages = await prisma.contentPage.findMany({ orderBy: { key: 'asc' } });
  const selectedKey = editableKeys.includes((params.key || 'hakkimizda') as (typeof editableKeys)[number])
    ? (params.key as (typeof editableKeys)[number]) || 'hakkimizda'
    : 'hakkimizda';

  const selected = pages.find((page) => page.key === selectedKey) || pages[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">İçerik Yönetimi</h1>
        <p className="text-sm text-muted-foreground">Kurumsal metinleri Markdown formatında düzenleyin.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sayfa Seçimi</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {editableKeys.map((key) => (
            <Link key={key} href={`/admin/icerikler?key=${key}`}>
              <Badge variant={selected?.key === key ? 'accent' : 'secondary'} className="cursor-pointer px-3 py-1.5">
                {key}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sayfa Düzenle</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveContentAction} className="space-y-4">
            <div>
              <Label htmlFor="key">Sayfa Anahtarı</Label>
              <Input id="key" name="key" defaultValue={selected?.key} readOnly />
            </div>
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input id="title" name="title" defaultValue={selected?.title} required />
            </div>
            <div>
              <Label htmlFor="description">Kısa Açıklama</Label>
              <Input id="description" name="description" defaultValue={selected?.description || ''} />
            </div>
            <div>
              <Label htmlFor="content">İçerik (Markdown)</Label>
              <Textarea id="content" name="content" defaultValue={selected?.content} className="min-h-[280px]" required />
              <p className="mt-1 text-xs text-muted-foreground">Satır sonları ve başlıklar için Markdown kullanabilirsiniz.</p>
            </div>
            <Button type="submit">Kaydet</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}