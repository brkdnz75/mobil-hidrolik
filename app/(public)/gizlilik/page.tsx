import type { Metadata } from 'next';
import { getPageContent } from '@/lib/data';
import { PageHero } from '@/components/shared/page-hero';
import { MarkdownView } from '@/components/shared/markdown-view';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Gizlilik ve çerez politikası'
};

export default async function PrivacyPage() {
  const content = await getPageContent('gizlilik');

  return (
    <>
      <PageHero title="Gizlilik" description="Veri işleme ve çerez kullanımı hakkında bilgilendirme." />
      <section className="container py-10">
        <div className="rounded-xl border bg-white p-6 md:p-10">
          <MarkdownView content={content?.content || 'Gizlilik metni yakında eklenecek.'} />
        </div>
      </section>
    </>
  );
}
