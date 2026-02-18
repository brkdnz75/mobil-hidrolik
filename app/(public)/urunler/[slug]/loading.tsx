import { Skeleton } from '@/components/ui/skeleton';
import { Section } from '@/components/system/section';

export default function ProductDetailLoading() {
  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[420px] w-full rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-60 w-full rounded-2xl" />
        </div>
      </div>
    </Section>
  );
}
