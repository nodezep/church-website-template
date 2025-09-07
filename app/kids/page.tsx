import { Suspense } from "react"
import KidsHero from "@/components/kids/kids-hero"
import KidsClasses from "@/components/kids/kids-classes"
import TransportSection from "@/components/kids/transport-section"
import SundayDevotion from "@/components/kids/sunday-devotion"
import DiscipleshipPrayer from "@/components/kids/discipleship-prayer"
import PraiseWorship from "@/components/kids/praise-worship"
import PreachingSection from "@/components/kids/preaching-section"
import GamesSports from "@/components/kids/games-sports"
import ToursSection from "@/components/kids/tours-section"

export default function KidsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      <Suspense fallback={<div>Loading...</div>}>
        <KidsHero />
        <KidsClasses />
        <TransportSection />
        <SundayDevotion />
        <DiscipleshipPrayer />
        <PraiseWorship />
        <PreachingSection />
        <GamesSports />
        <ToursSection />
      </Suspense>
    </div>
  )
}
