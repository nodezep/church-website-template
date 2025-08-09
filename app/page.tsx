import { Suspense } from "react"
import Hero from "@/components/home/hero"
import Services from "@/components/home/services"
import ChildrensMinistry from "@/components/home/childrens-ministry"
import Mission from "@/components/home/mission"
import Events from "@/components/home/events"
import SermonSection from "@/components/home/sermon-section"
import Newsletter from "@/components/home/newsletter"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <Services />
        <ChildrensMinistry />
        <Mission />
        <Events />
        <SermonSection />
        <Newsletter />
      </Suspense>
    </div>
  )
}
