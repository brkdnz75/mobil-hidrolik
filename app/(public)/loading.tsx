import { Skeleton } from '@/components/ui/skeleton';

export default function PublicLoading() {
  return (
    <section className="container py-10">
      <div className="space-y-4">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </section>
  );
}
