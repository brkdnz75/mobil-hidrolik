"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { inquirySchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';

interface Option {
  id: string;
  name: string;
}

export function InquiryForm({ products, presetProductId }: { products?: Option[]; presetProductId?: string }) {
  const router = useRouter();
  const toast = useToast();

  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      subject: 'Teklif Talebi',
      message: '',
      productId: presetProductId,
      kvkkApproved: false,
      website: ''
    }
  });

  async function onSubmit(values: z.infer<typeof inquirySchema>) {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.show('Talep gönderilemedi. Lütfen tekrar deneyin.', 'error');
      return;
    }

    toast.show('Talebiniz alındı. En kısa sürede dönüş yapacağız.');
    form.reset();
    router.push('/tesekkurler');
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-xl border bg-white p-6">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...form.register('website')} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Ad Soyad</Label>
          <Input id="name" {...form.register('name')} />
          <p className="mt-1 text-xs text-red-600">{form.formState.errors.name?.message}</p>
        </div>
        <div>
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" type="email" {...form.register('email')} />
          <p className="mt-1 text-xs text-red-600">{form.formState.errors.email?.message}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Firma</Label>
          <Input id="company" {...form.register('company')} />
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" {...form.register('phone')} />
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Konu</Label>
        <Input id="subject" {...form.register('subject')} />
      </div>

      {products?.length ? (
        <div>
          <Label htmlFor="productId">Ürün (Opsiyonel)</Label>
          <Select id="productId" {...form.register('productId')}>
            <option value="">Seçiniz</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
        </div>
      ) : null}

      <div>
        <Label htmlFor="message">Mesaj</Label>
        <Textarea id="message" {...form.register('message')} />
        <p className="mt-1 text-xs text-red-600">{form.formState.errors.message?.message}</p>
      </div>

      <div className="flex items-start gap-2">
        <input id="kvkk" type="checkbox" className="mt-1" {...form.register('kvkkApproved')} />
        <Label htmlFor="kvkk" className="text-sm font-normal text-muted-foreground">
          KVKK metnini okudum ve verilerimin iletişim amacıyla işlenmesini kabul ediyorum.
        </Label>
      </div>
      <p className="text-xs text-red-600">{form.formState.errors.kvkkApproved?.message}</p>

      <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Gönderiliyor...' : 'Talebi Gönder'}
      </Button>
    </form>
  );
}
