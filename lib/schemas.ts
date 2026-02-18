import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2, 'Ad gerekli'),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Geçerli e-posta giriniz'),
  subject: z.string().min(3, 'Konu gerekli'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmali'),
  productId: z.string().optional(),
  kvkkApproved: z.boolean().refine((val) => val, 'KVKK onayi gerekli'),
  website: z.string().max(0).optional()
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  order: z.coerce.number().int().min(0)
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  categoryId: z.string().min(1),
  shortDesc: z.string().min(10),
  longDesc: z.string().min(20),
  isoVg: z.string().min(3),
  viscosityIndex: z.coerce.number().optional(),
  pourPoint: z.coerce.number().optional(),
  flashPoint: z.coerce.number().optional(),
  density: z.coerce.number().optional(),
  packagingText: z.string().min(1),
  highlightsText: z.string().min(1),
  imagesText: z.string().min(1),
  tdsUrl: z.string().optional(),
  msdsUrl: z.string().optional(),
  isFeatured: z.coerce.boolean().optional()
});

export const contentSchema = z.object({
  key: z.string().min(2),
  title: z.string().min(2),
  description: z.string().optional(),
  content: z.string().min(10)
});
