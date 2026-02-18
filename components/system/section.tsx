import { cn } from '@/lib/utils';
import { Container } from '@/components/system/container';

export function Section({
  children,
  className,
  tone = 'default',
  size = 'lg'
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'muted' | 'dark';
  size?: 'lg' | 'xl';
}) {
  return (
    <section
      className={cn(
        size === 'xl' ? 'py-32' : 'py-24',
        tone === 'muted' && 'bg-gradient-to-b from-white to-slate-100/70',
        tone === 'dark' && 'bg-slate-950 text-white',
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
