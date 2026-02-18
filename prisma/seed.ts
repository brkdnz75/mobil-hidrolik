import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  { name: 'Endüstriyel Hidrolik', slug: 'endustriyel-hidrolik', order: 1 },
  { name: 'Mobil Hidrolik', slug: 'mobil-hidrolik', order: 2 },
  { name: 'Biyo-Çözünür Seri', slug: 'biyo-cozunur-seri', order: 3 }
];

const products = [
  ['HP Ultra 32', 'hp-ultra-32', 'ISO VG 32'],
  ['HP Ultra 46', 'hp-ultra-46', 'ISO VG 46'],
  ['HP Ultra 68', 'hp-ultra-68', 'ISO VG 68'],
  ['HP MaxGuard 32', 'hp-maxguard-32', 'ISO VG 32'],
  ['HP MaxGuard 46', 'hp-maxguard-46', 'ISO VG 46'],
  ['HP MaxGuard 68', 'hp-maxguard-68', 'ISO VG 68'],
  ['HP EcoFlow 32', 'hp-ecoflow-32', 'ISO VG 32'],
  ['HP EcoFlow 46', 'hp-ecoflow-46', 'ISO VG 46'],
  ['HP HeavyDuty 68', 'hp-heavyduty-68', 'ISO VG 68'],
  ['HP HeavyDuty 100', 'hp-heavyduty-100', 'ISO VG 100']
] as const;

const contentPages = [
  {
    key: 'hakkimizda',
    title: 'Hakkımızda',
    description: 'HidrolikPro kurumsal tanıtım sayfası',
    content:
      '## HidrolikPro\n\n15 yılı aşkın saha deneyimiyle, endüstriyel ve mobil hidrolik sistemler için yüksek performanslı yağ çözümleri geliştiriyoruz.\n\n### Misyon\nMüşterilerimize süreklilik, verim ve güvenlik sağlayan teknik çözümler sunmak.\n\n### Vizyon\nBölgesel pazarda teknik uzmanlığı ve hızlı tedarik kabiliyetiyle referans marka olmak.'
  },
  {
    key: 'kvkk',
    title: 'KVKK Aydınlatma Metni',
    description: '6698 sayılı KVKK kapsamında bilgilendirme',
    content:
      'Kişisel verileriniz 6698 sayılı Kanun kapsamında, teklif ve iletişim süreçlerinin yürütülmesi amacıyla işlenmektedir. Detaylı bilgi için bizimle iletişime geçebilirsiniz.'
  },
  {
    key: 'gizlilik',
    title: 'Gizlilik Politikası',
    description: 'Site gizlilik ve çerez politikası',
    content:
      'Bu web sitesi, hizmet kalitesini artırmak için sınırlı çerezler kullanır. Verileriniz açık rıza veya yasal yükümlülük dışında üçüncü taraflarla paylaşılmaz.'
  }
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@hidrolikpro.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash }
  });

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }

  const categoryRows = await prisma.category.findMany({ orderBy: { order: 'asc' } });

  for (let i = 0; i < products.length; i++) {
    const [name, slug, isoVg] = products[i];
    const category = categoryRows[i % categoryRows.length];

    await prisma.product.upsert({
      where: { slug },
      update: {
        name,
        categoryId: category.id,
        shortDesc: `${name}, ağır yük altında stabil performans ve aşınma koruması sağlar.`,
        longDesc:
          'Yüksek oksidasyon direnci, uzun servis ömrü ve geniş sıcaklık aralığında dengeli çalışma sunan premium hidrolik yağ formülasyonu.',
        isoVg,
        viscosityIndex: 155,
        pourPoint: -33,
        flashPoint: 228,
        density: 0.865,
        packaging: ['1L', '5L', '20L', '205L'],
        highlights: ['Aşınma önleyici katkı', 'Termal kararlılık', 'Uzun değişim aralığı'],
        images: ['https://images.unsplash.com/photo-1581091215367-59ab6dcef9f1?auto=format&fit=crop&w=1200&q=80'],
        documents: {
          tdsUrl: '#',
          msdsUrl: '#'
        },
        isFeatured: i < 4
      },
      create: {
        name,
        slug,
        categoryId: category.id,
        shortDesc: `${name}, ağır yük altında stabil performans ve aşınma koruması sağlar.`,
        longDesc:
          'Yüksek oksidasyon direnci, uzun servis ömrü ve geniş sıcaklık aralığında dengeli çalışma sunan premium hidrolik yağ formülasyonu.',
        isoVg,
        viscosityIndex: 155,
        pourPoint: -33,
        flashPoint: 228,
        density: 0.865,
        packaging: ['1L', '5L', '20L', '205L'],
        highlights: ['Aşınma önleyici katkı', 'Termal kararlılık', 'Uzun değişim aralığı'],
        images: ['https://images.unsplash.com/photo-1581091215367-59ab6dcef9f1?auto=format&fit=crop&w=1200&q=80'],
        documents: {
          tdsUrl: '#',
          msdsUrl: '#'
        },
        isFeatured: i < 4
      }
    });
  }

  for (const page of contentPages) {
    await prisma.contentPage.upsert({
      where: { key: page.key },
      update: page,
      create: page
    });
  }

  console.log('Seed tamamlandı.');
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
