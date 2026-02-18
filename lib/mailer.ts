import nodemailer from 'nodemailer';
import { Resend } from 'resend';

interface InquiryMailInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  productName?: string;
}

function buildHtml(input: InquiryMailInput) {
  return `
    <h2>Yeni Teklif / İletişim Talebi</h2>
    <p><strong>Ad Soyad:</strong> ${input.name}</p>
    <p><strong>E-posta:</strong> ${input.email}</p>
    <p><strong>Telefon:</strong> ${input.phone ?? '-'}</p>
    <p><strong>Firma:</strong> ${input.company ?? '-'}</p>
    <p><strong>Konu:</strong> ${input.subject}</p>
    <p><strong>Ürün:</strong> ${input.productName ?? '-'}</p>
    <p><strong>Mesaj:</strong> ${input.message}</p>
  `;
}

export async function sendInquiryEmail(input: InquiryMailInput) {
  const to = process.env.INQUIRY_RECEIVER_EMAIL || process.env.ADMIN_EMAIL;
  if (!to) return;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.MAIL_FROM || 'HidrolikPro <onboarding@resend.dev>',
      to,
      subject: `[Talep] ${input.subject}`,
      html: buildHtml(input)
    });
    return;
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject: `[Talep] ${input.subject}`,
      html: buildHtml(input)
    });
  }
}
