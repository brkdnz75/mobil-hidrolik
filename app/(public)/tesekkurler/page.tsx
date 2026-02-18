import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThanksPage() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-semibold">Teşekkürler</h1>
        <p className="mt-2 text-muted-foreground">Talebiniz başarıyla alındı. Teknik ekibimiz sizinle en kısa sürede iletişime geçecek.</p>
        <Link href="/">
          <Button className="mt-6">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </section>
  );
}
