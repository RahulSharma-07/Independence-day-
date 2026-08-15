import { HeroSection } from '@/components/hero/HeroSection'
import { TimelineSection } from '@/components/timeline/TimelineSection'
import { CategoriesSection } from '@/components/fighters/CategoriesSection'
import { FightersSection } from '@/components/fighters/FightersSection'
import { AskBharatSection } from '@/components/ask-bharat/AskBharatSection'
import { IndependenceSection } from '@/components/shared/IndependenceSection'
import { TributeSection } from '@/components/tribute/TributeSection'

export default function Home() {
  return (
    <main id="main-content">
      {/* 1. Hero — the entry point */}
      <HeroSection />

      {/* 2. Interactive timeline: 1757 → 1947 */}
      <TimelineSection />

      {/* 3. Seven paths to freedom */}
      <CategoriesSection />

      {/* 4. 100 freedom fighters archive */}
      <FightersSection />

      {/* 5. Ask Bharat — AI guide */}
      <AskBharatSection />

      {/* 6. Independence moment */}
      <IndependenceSection />

      {/* 7. Tribute wall */}
      <TributeSection />
    </main>
  )
}
