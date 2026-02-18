import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/reveal';

export function HeroVideo() {
  return (
    <section className="relative -mt-16 min-h-[92vh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1800&q=80"
      >
        <source src="https://cdn.coverr.co/videos/coverr-industrial-metal-workshop-1579/1080p.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-900/62 to-slate-900/35" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative flex min-h-[92vh] items-center pt-16">
        <div className="max-w-3xl space-y-6 text-white">
          <Reveal>
            <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/90">
              Premium Endüstriyel B2B Çözüm
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-[56px] font-semibold leading-[1.02] tracking-tight md:text-[64px]">
              Kritik hidrolik sistemler için güvenilir yağ teknolojisi
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Ağır saha şartlarında stabil çalışma, düşük arıza riski ve uzun ekipman ömrü için formüle edilmiş premium ürün portföyü.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/urunler">
                <Button size="lg" className="h-12 px-7">
                  Ürünleri İncele
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="lg" variant="outline" className="h-12 border-white/45 bg-white/5 px-7 text-white hover:bg-white/10">
                  Teklif Al <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-4 text-sm text-white/90">
                <PlayCircle className="h-4 w-4" /> Üretim Süreci
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
