import type { Metadata } from 'next';
import { getPageContent } from '@/lib/data';
import { PageHero } from '@/components/shared/page-hero';
import { MarkdownView } from '@/components/shared/markdown-view';

export const metadata: Metadata = {
  title: 'KVKK',
  description: 'KVKK aydınlatma metni'
};

export default async function KvkkPage() {
  const content = await getPageContent('kvkk');

  return (
    <>
      <PageHero title="KVKK" description="Kişisel verilerin korunması hakkında bilgilendirme." />
      <section className="container py-10">
        <div className="rounded-xl border bg-white p-6 md:p-10">
          <MarkdownView content={content?.content || 'KVKK metni yakında eklenecek.'} />
        </div>
      </section>
    </>
  );
}
