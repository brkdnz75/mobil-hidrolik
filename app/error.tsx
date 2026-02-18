"use client";

import { Button } from '@/components/ui/button';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="tr">
      <body>
        <section className="container py-20">
          <div className="rounded-xl border bg-white p-10 text-center">
            <h1 className="text-3xl font-semibold">Sistem Hatası</h1>
            <p className="mt-2 text-muted-foreground">Beklenmeyen bir hata olustu.</p>
            <Button onClick={() => reset()} className="mt-6">
              Tekrar Dene
            </Button>
          </div>
        </section>
      </body>
    </html>
  );
}
