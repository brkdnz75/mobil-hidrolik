import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck2, Download } from 'lucide-react';
import { Section } from '@/components/system/section';
import { Heading } from '@/components/system/heading';
import { SurfaceCard } from '@/components/system/surface-card';
import { CTASection } from '@/components/system/cta-section';
import { Reveal, RevealItem, RevealStagger } from '@/components/shared/reveal';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Sertifikalar',
  description: 'Kalite, test ve uygunluk belgeleri.'
};

const certificates = [
  { name: 'ISO 9001 Kalite Yönetim Sistemi', detail: 'Belge No: TR-9001-2026 (placeholder)', pdf: '#' },
  { name: 'Üretim Uygunluk Raporu', detail: 'Laboratuvar test ve performans doğrulama (placeholder)', pdf: '#' },
  { name: 'Çevresel Uyum Beyanı', detail: 'Atık yönetimi ve çevresel süreçlere uyum (placeholder)', pdf: '#' }
];

export default function CertificatesPage() {
  return (
    <PageShell theme="neutral">
      <PageHero
        variant="image"
        title="Sertifikalar"
        subtitle="Kalite güvence, test ve uygunluk belgelerimizle şeffaf süreç yönetimi."
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80"
        breadcrumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Sertifikalar' }]}
      />

      <Section>
        <Reveal>
          <Heading title="Belge Merkezi" description="PDF ve görsel sertifika alanları (placeholder) ile kolay erişim." />
        </Reveal>
        <RevealStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <RevealItem key={certificate.name}>
              <SurfaceCard variant="solid">
                <FileCheck2 className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{certificate.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{certificate.detail}</p>
                <div className="mt-4 rounded-xl border border-dashed bg-slate-50 p-6 text-xs text-muted-foreground">PDF / Görsel Önizleme Alanı</div>
                <Link href={certificate.pdf} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <Download className="h-4 w-4" /> PDF İndir
                </Link>
              </SurfaceCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <CTASection />
    </PageShell>
  );
}
