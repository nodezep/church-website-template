import { Suspense } from 'react'
import Hero from '@/components/home/hero'
import ChildrensMinistry from '@/components/home/childrens-ministry'
import Services from '@/components/home/services'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Suspense fallback={<div className="h-screen bg-gray-200 animate-pulse" />}>
        <Hero />
      </Suspense>

      {/* Children's Ministry Section */}
      <Suspense fallback={<div className="py-20 bg-white animate-pulse" />}>
        <ChildrensMinistry />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<div className="py-20 bg-gray-50 animate-pulse" />}>
        <Services />
      </Suspense>
    </main>
  )
}