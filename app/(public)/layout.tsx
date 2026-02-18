import * as React from 'react';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/layout/site-footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">{children}</main>
      <SiteFooter />
    </div>
  );
}
