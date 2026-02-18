import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/system/section';
import { Heading } from '@/components/system/heading';
import { SurfaceCard } from '@/components/system/surface-card';
import { Reveal } from '@/components/shared/reveal';

export function CTASection({
  title = 'Doğru ürünü birlikte belirleyelim',
  description = 'Sisteminize uygun hidrolik yağ seçimi için teknik ekibimizle hemen iletişime geçin.'
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section size="lg" className="border-y border-white/60 bg-gradient-to-r from-slate-950 to-slate-900 text-white">
      <Reveal>
        <SurfaceCard variant="glass" className="border-white/20 bg-white/10 text-white">
          <Heading title={title} description={description} className="max-w-2xl" />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/iletisim">
              <Button size="lg">Teklif Al</Button>
            </Link>
            <Link href="/urunler">
              <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                Ürünleri Gör <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </SurfaceCard>
      </Reveal>
    </Section>
  );
}
