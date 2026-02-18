import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { getCategories } from '@/lib/data';
import { siteConfig } from '@/lib/site';

export async function SiteFooter() {
  const categories = await getCategories();

  return (
    <footer className="border-t bg-gradient-to-b from-white to-slate-50/80">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{siteConfig.description}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Kategoriler</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link href={`/urunler?kategori=${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">İletişim</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> {siteConfig.address}
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> {siteConfig.phone}
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> {siteConfig.email}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Yasal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/kvkk" className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> KVKK
              </Link>
            </li>
            <li>
              <Link href="/gizlilik">Gizlilik</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
