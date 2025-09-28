import { Suspense } from 'react'
import Hero from '@/components/home/hero'
import ChildrensMinistry from '@/components/home/childrens-ministry'
import Services from '@/components/home/services'
import LogoLoader from '@/components/logo-loader'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Suspense fallback={<LogoLoader fullScreen /> }>
        <Hero />
      </Suspense>

      {/* Children's Ministry Section */}
      <Suspense fallback={<LogoLoader fullScreen /> }>
        <ChildrensMinistry />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<LogoLoader fullScreen /> }>
        <Services />
      </Suspense>
    </main>
  )
}