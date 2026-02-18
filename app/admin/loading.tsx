import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLoading() {
  return (
    <section className="container py-8">
      <div className="space-y-3">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    </section>
  );
}
