import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-10 text-center">
        <h1 className="text-3xl font-semibold">Sayfa Bulunamadı</h1>
        <p className="mt-2 text-muted-foreground">Aradiginiz sayfa tasinmis veya kaldirilmis olabilir.</p>
        <Link href="/">
          <Button className="mt-6">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </section>
  );
}
