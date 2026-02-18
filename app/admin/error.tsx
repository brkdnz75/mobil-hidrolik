"use client";

import { Button } from '@/components/ui/button';

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container py-16">
      <div className="rounded-xl border bg-white p-8 text-center">
        <h2 className="text-2xl font-semibold">Admin panelde hata olustu</h2>
        <p className="mt-2 text-muted-foreground">Lütfen islemi tekrar deneyin.</p>
        <Button className="mt-4" onClick={() => reset()}>
          Tekrar Dene
        </Button>
      </div>
    </section>
  );
}
