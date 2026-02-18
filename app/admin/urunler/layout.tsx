import * as React from 'react';
import { requireAdmin } from '@/lib/session';
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default async function AdminProductsLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <section className="container py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}
