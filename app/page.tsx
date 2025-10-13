import { Suspense } from "react"
import Hero from "@/components/home/hero"
import Services from "@/components/home/services"
import ChildrensMinistry from "@/components/home/childrens-ministry"
import Mission from "@/components/home/mission"
import PastorSection from "@/components/home/pastor-section"
import Events from "@/components/home/events"
import SermonSection from "@/components/home/sermon-section"
import TestimonySection from "@/components/home/testimony-section"
// Newsletter removed per request
import LogoLoader from "@/components/logo-loader"
import ConstructionSlider from "@/components/home/construction-slider"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LogoLoader fullScreen /> }>
        <Hero />
        <Services />
        <ChildrensMinistry />
        <ConstructionSlider />
        <Mission />
        <PastorSection />
        <Events />
        <SermonSection />
        <TestimonySection />
        {/* Newsletter removed */}
      </Suspense>
    </div>
  )
}
