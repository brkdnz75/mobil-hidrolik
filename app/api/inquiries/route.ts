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
      return NextResponse.json({ message: 'Cok fazla istek.' }, { status: 429 });
    }

    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Gecersiz form verisi.' }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
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
  } catch {
    return NextResponse.json({ message: 'Sunucu hatasi' }, { status: 500 });
  }
}
