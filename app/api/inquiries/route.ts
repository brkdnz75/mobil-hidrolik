import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/schemas';
import { prisma } from '@/lib/prisma';
import { sendInquiryEmail } from '@/lib/mailer';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ message: 'Çok fazla istek. Lütfen kısa süre sonra tekrar deneyin.' }, { status: 429 });
    }

    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? 'Geçersiz form verisi.';
      return NextResponse.json({ message: firstIssue }, { status: 400 });
    }

    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return NextResponse.json({ message: 'Spam kontrolüne takıldı.' }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company,
        phone: parsed.data.phone,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
        productId: parsed.data.productId || null
      },
      include: {
        product: true
      }
    });

    try {
      await sendInquiryEmail({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || undefined,
        company: inquiry.company || undefined,
        subject: inquiry.subject,
        message: inquiry.message,
        productName: inquiry.product?.name
      });
      return NextResponse.json({ ok: true });
    } catch (mailError) {
      console.error('Inquiry mail failed:', mailError);
      return NextResponse.json({
        ok: true,
        warning: 'Talep kaydedildi ancak e-posta gönderimi başarısız oldu.'
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sunucu hatası oluştu.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
