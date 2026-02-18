"use client";

import { Button } from '@/components/ui/button';

export default function PublicError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container py-20">
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="text-2xl font-semibold">Bir hata olustu</h2>
        <p className="mt-2 text-muted-foreground">Sayfa yuklenirken beklenmeyen bir sorun olustu.</p>
        <Button onClick={() => reset()} className="mt-6">
          Tekrar Dene
        </Button>
      </div>
    </section>
  );
}
