import { CtaSection } from '@/components/landing/cta-section'
import { Features } from '@/components/landing/features'
import { Hero } from '@/components/landing/hero'

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <CtaSection />
    </main>
  );
}
