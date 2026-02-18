# uces-hidrolik-web

Next.js 14 + TypeScript ile geliştirilmiş, mobil-öncelikli, SEO uyumlu kurumsal hidrolik yağ web sitesi.

## Özellikler
- Modern public site: ana sayfa, ürün kataloğu, ürün detayı, uygulamalar, hakkımızda, sertifikalar, iletişim, KVKK, gizlilik
- Admin panel: login, ürün CRUD, kategori CRUD, talep yönetimi, içerik yönetimi
- Form akışı: DB kaydı + e-posta gönderimi + kullanıcı geri bildirimi
- Prisma ORM: SQLite (default), Postgres opsiyonel
- next-auth credentials tabanlı admin giriş
- Zod + React Hook Form doğrulama
- Basit rate-limit + honeypot anti-spam
- SEO: metadata, OpenGraph, Organization ve Product JSON-LD

## Teknoloji
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- shadcn-benzeri UI primitiveleri (`Button`, `Card`, `Badge`, `Tabs`, `Dialog`, `Sheet`, `Table`, `Toast`, `Skeleton`)
- Prisma
- next-auth

## Kurulum
1. Bağımlılıkları kur:
```bash
npm install
```
2. Ortam değişkenlerini hazırla:
```bash
copy .env.example .env
```
3. Prisma client + DB:
```bash
npx prisma generate
npx prisma db push
```
4. Seed çalıştır:
```bash
npm run db:seed
```
5. Geliştirme sunucusu:
```bash
npm run dev
```

## Build
```bash
npm run build
npm run start
```

## Admin Giriş
Seed sonrası varsayılan bilgiler:
- E-posta: `admin@hidrolikpro.com`
- Şifre: `Admin123!`

Değiştirmek için `.env` içindeki `ADMIN_EMAIL` ve `ADMIN_PASSWORD` değerlerini güncelleyip yeniden `npm run db:seed` çalıştırın.

## Veri Modeli
- `AdminUser`
- `Category`
- `Product`
- `Inquiry`
- `ContentPage`

## Seed İçeriği
- 3 kategori
- 10 ürün
- Hakkımızda/KVKK/Gizlilik içerikleri
- 1 admin kullanıcı

## E-posta Yapılandırması
### Resend (önerilen)
- `RESEND_API_KEY`
- `MAIL_FROM`
- `INQUIRY_RECEIVER_EMAIL`

### SMTP fallback
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `MAIL_FROM`

## Postgres'e Geçiş (Opsiyonel)
Prisma `provider` dinamik seçilemediği için proje varsayılan olarak SQLite ile gelir.
Postgres kullanmak için:
1. `prisma/schema.postgres.prisma` dosyasını `prisma/schema.prisma` yerine kopyalayın.
2. `.env` içindeki `DATABASE_URL` değerini Postgres string yapın.
3. `npx prisma generate && npx prisma db push` çalıştırın.

## Vercel Deploy
1. Repo'yu Vercel'e bağlayın.
2. Environment Variables alanına `.env.example` içindeki gerekli değerleri ekleyin.
3. Build Command: `npm run build`
4. Install Command: `npm install`
5. Deploy edin.

## Görsel Değiştirme
Ürün görselleri şu an placeholder URL ile gelir. Admin panelde ürün düzenleme ekranındaki `Görsel URL'leri` alanından değiştirebilirsiniz.

## Komutlar
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npx prisma generate`
- `npx prisma db push`
- `npm run db:seed`
