import { prisma } from '@/lib/prisma';
import { saveContentAction } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const editableKeys = ['hakkimizda', 'kvkk', 'gizlilik'];

export default async function AdminContentsPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const params = await searchParams;
  const pages = await prisma.contentPage.findMany({ orderBy: { key: 'asc' } });
  const selectedKey = params.key || editableKeys[0];
  const selected = pages.find((page) => page.key === selectedKey) || pages[0];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">İçerik Yönetimi</h1>

      <Card>
        <CardHeader>
          <CardTitle>Sayfa Düzenle</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveContentAction} className="space-y-4">
            <div>
              <Label>Sayfa Anahtarı</Label>
              <Select name="key" defaultValue={selected?.key || editableKeys[0]}>
                {editableKeys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Başlık</Label>
              <Input name="title" defaultValue={selected?.title} required />
            </div>
            <div>
              <Label>Kısa Açıklama</Label>
              <Input name="description" defaultValue={selected?.description || ''} />
            </div>
            <div>
              <Label>İçerik (Markdown destekli)</Label>
              <Textarea name="content" defaultValue={selected?.content} className="min-h-[280px]" required />
            </div>
            <Button type="submit">Kaydet</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
