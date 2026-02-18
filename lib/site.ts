export const siteConfig = {
  name: 'HidrolikPro',
  legalName: 'Hidrolik Yağ',
  description:
    'HidrolikPro, endüstriyel ve mobil sistemler için premium hidrolik yağ ve teknik destek çözümleri sunar.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: 'iletisim@hidrolikpro.com',
  phone: '+90 212 000 00 00',
  address: 'İkitelli OSB, İstanbul, Türkiye',
  workHours: 'Pzt-Cmt 08:30 - 18:30',
  socials: {
    linkedin: '#',
    youtube: '#'
  }
};

export const navItems = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/urunler', label: 'Ürünler' },
  { href: '/uygulamalar', label: 'Uygulamalar' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/sertifikalar', label: 'Sertifikalar' },
  { href: '/iletisim', label: 'İletişim' }
];

export const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/urunler', label: 'Ürünler' },
  { href: '/admin/kategoriler', label: 'Kategoriler' },
  { href: '/admin/talepler', label: 'Talepler' },
  { href: '/admin/icerikler', label: 'İçerikler' }
];
