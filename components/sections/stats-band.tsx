import { Clock3, PackageCheck, ShieldCheck, Wrench } from 'lucide-react';
import { RevealItem, RevealStagger } from '@/components/shared/reveal';

const stats = [
  { value: '15+', label: 'Yıl Tecrübe', icon: ShieldCheck },
  { value: '1200+', label: 'Anlık Stok SKU', icon: PackageCheck },
  { value: '7/24', label: 'Teknik Destek', icon: Wrench },
  { value: '<24s', label: 'Hızlı Geri Dönüş', icon: Clock3 }
];

export function StatsBand() {
  return (
    <section className="relative z-10 -mt-20 pb-8">
      <div className="container">
        <RevealStagger className="grid gap-4 rounded-2xl border border-white/60 bg-white/92 p-6 shadow-xl shadow-slate-900/10 backdrop-blur md:grid-cols-4">
          {stats.map((item) => (
            <RevealItem key={item.label}>
              <div className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
