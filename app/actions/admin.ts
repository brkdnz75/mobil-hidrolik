"use server";

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { categorySchema, contentSchema, productSchema } from '@/lib/schemas';
import { requireAdmin } from '@/lib/session';

function toArray(input: string) {
  return input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function saveCategoryAction(formData: FormData) {
  await requireAdmin();
  const parsed = categorySchema.safeParse({
    id: formData.get('id')?.toString() || undefined,
    name: formData.get('name')?.toString() || '',
    slug: formData.get('slug')?.toString() || '',
    order: formData.get('order')?.toString() || '0'
  });

  if (!parsed.success) throw new Error('Kategori doğrulama hatası');

  const { id, ...data } = parsed.data;

  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    await prisma.category.create({ data });
  }

  revalidatePath('/admin/kategoriler');
  revalidatePath('/urunler');
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get('id')?.toString();
  if (!id) return;
  const hasProducts = await prisma.product.count({ where: { categoryId: id } });
  if (hasProducts > 0) {
    throw new Error('Bu kategoriye bağlı ürünler olduğu için silinemez.');
  }
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/kategoriler');
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const parsed = productSchema.safeParse({
    id: formData.get('id')?.toString() || undefined,
    name: formData.get('name')?.toString(),
    slug: formData.get('slug')?.toString(),
    categoryId: formData.get('categoryId')?.toString(),
    shortDesc: formData.get('shortDesc')?.toString(),
    longDesc: formData.get('longDesc')?.toString(),
    isoVg: formData.get('isoVg')?.toString(),
    viscosityIndex: formData.get('viscosityIndex')?.toString(),
    pourPoint: formData.get('pourPoint')?.toString(),
    flashPoint: formData.get('flashPoint')?.toString(),
    density: formData.get('density')?.toString(),
    packagingText: formData.get('packagingText')?.toString(),
    highlightsText: formData.get('highlightsText')?.toString(),
    imagesText: formData.get('imagesText')?.toString(),
    tdsUrl: formData.get('tdsUrl')?.toString(),
    msdsUrl: formData.get('msdsUrl')?.toString(),
    isFeatured: formData.get('isFeatured')?.toString() === 'on'
  });

  if (!parsed.success) throw new Error('Ürün doğrulama hatası');

  const { id, packagingText, highlightsText, imagesText, tdsUrl, msdsUrl, ...rest } = parsed.data;

  const data = {
    ...rest,
    packaging: toArray(packagingText),
    highlights: toArray(highlightsText),
    images: toArray(imagesText),
    documents: {
      tdsUrl: tdsUrl || '#',
      msdsUrl: msdsUrl || '#'
    }
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath('/admin/urunler');
  revalidatePath('/urunler');
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get('id')?.toString();
  if (!id) return;
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/urunler');
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get('id')?.toString();
  const status = formData.get('status')?.toString() as 'NEW' | 'READ' | 'ARCHIVED';

  if (!id || !status || !['NEW', 'READ', 'ARCHIVED'].includes(status)) return;

  await prisma.inquiry.update({
    where: { id },
    data: { status }
  });

  revalidatePath('/admin/talepler');
}

export async function saveContentAction(formData: FormData) {
  await requireAdmin();
  const parsed = contentSchema.safeParse({
    key: formData.get('key')?.toString() || '',
    title: formData.get('title')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    content: formData.get('content')?.toString() || ''
  });

  if (!parsed.success) throw new Error('İçerik doğrulama hatası');

  await prisma.contentPage.upsert({
    where: { key: parsed.data.key },
    update: parsed.data,
    create: parsed.data
  });

  revalidatePath('/admin/icerikler');
  revalidatePath('/hakkimizda');
  revalidatePath('/kvkk');
  revalidatePath('/gizlilik');
}
