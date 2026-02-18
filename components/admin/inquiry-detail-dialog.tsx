"use client";

import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function InquiryDetailDialog({
  title,
  content
}: {
  title: string;
  content: { name: string; email: string; phone?: string | null; company?: string | null; message: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Detay
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogClose onClick={() => setOpen(false)} />
        </DialogHeader>
        <DialogContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Ad:</strong> {content.name}
          </p>
          <p>
            <strong>E-posta:</strong> {content.email}
          </p>
          <p>
            <strong>Telefon:</strong> {content.phone || '-'}
          </p>
          <p>
            <strong>Firma:</strong> {content.company || '-'}
          </p>
          <p>
            <strong>Mesaj:</strong> {content.message}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
