import { z } from 'zod';

const normalizeText = (value: unknown) => (typeof value === 'string' ? value.trim() : value);

const optionalText = z.preprocess((value) => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}, z.string().optional());

const optionalNumber = z.preprocess((value) => {
  if (value === '' || value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value.replace(',', '.'));
  return value;
}, z.number().finite().optional());

export const inquirySchema = z.object({
  name: z.preprocess(normalizeText, z.string().min(2, 'Ad Soyad gerekli')),
  company: optionalText,
  phone: optionalText,
  email: z.preprocess(normalizeText, z.string().email('Geçerli e-posta giriniz')),
  subject: z.preprocess(normalizeText, z.string().min(3, 'Konu gerekli')),
  message: z.preprocess(normalizeText, z.string().min(10, 'Mesaj en az 10 karakter olmalı')),
  productId: optionalText,
  kvkkApproved: z
    .preprocess(
      (value) => value === true || value === 'true' || value === 'on' || value === 1 || value === '1',
      z.boolean()
    )
    .refine((value) => value, 'KVKK onayı gerekli'),
  website: z.preprocess(normalizeText, z.string().max(0).optional())
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.preprocess(normalizeText, z.string().min(2)),
  slug: z.preprocess(normalizeText, z.string().min(2)),
  order: z.coerce.number().int().min(0)
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.preprocess(normalizeText, z.string().min(2)),
  slug: z.preprocess(normalizeText, z.string().min(2)),
  categoryId: z.preprocess(normalizeText, z.string().min(1)),
  shortDesc: z.preprocess(normalizeText, z.string().min(10)),
  longDesc: z.preprocess(normalizeText, z.string().min(20)),
  isoVg: z.preprocess(normalizeText, z.string().min(3)),
  viscosityIndex: optionalNumber,
  pourPoint: optionalNumber,
  flashPoint: optionalNumber,
  density: optionalNumber,
  packagingText: z.preprocess(normalizeText, z.string().min(1)),
  highlightsText: z.preprocess(normalizeText, z.string().min(1)),
  imagesText: z.preprocess(normalizeText, z.string().min(1)),
  tdsUrl: optionalText,
  msdsUrl: optionalText,
  isFeatured: z.coerce.boolean().optional()
});

export const contentSchema = z.object({
  key: z.preprocess(normalizeText, z.string().min(2)),
  title: z.preprocess(normalizeText, z.string().min(2)),
  description: optionalText,
  content: z.preprocess(normalizeText, z.string().min(10))
});
