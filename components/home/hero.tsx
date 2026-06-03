"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchHomeContent } from "@/lib/supabase-helpers"

interface HeroSlide {
  image: string
  title: string
  subtitle: string
  cta: string
  link: string
}

interface HeroContent {
  slides: HeroSlide[]
}

const defaultSlides: HeroSlide[] = [
  {
    image: "/placeholder.svg?height=800&width=1200&text=Church+Sanctuary",
    title: "Welcome to Our Church",
    subtitle: "Join us for worship this Sunday",
    cta: "Learn More",
    link: "/about"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultSlides)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroSlides = async () => {
      const content = await fetchHomeContent("hero") as HeroContent | null
      if (content?.slides && content.slides.length > 0) {
        setHeroSlides(content.slides)
      }
      setLoading(false)
    }

    fetchHeroSlides()
  }, [])

  useEffect(() => {
    if (heroSlides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [heroSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  if (loading) return <div className="h-screen bg-neutral-900 animate-pulse flex items-center justify-center"><div className="text-primary font-medium text-lg tracking-widest uppercase">Loading Grace...</div></div>
  if (heroSlides.length === 0) return null

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {currentSlideData.image.match(/\.(mp4|webm)$/i) ? (
              <video autoPlay loop muted className="w-full h-full object-cover">
                <source src={currentSlideData.image} type="video/mp4" />
              </video>
            ) : (
              <img
                className="w-full h-full object-cover"
                alt={`Hero slide ${currentSlide + 1}`}
                src={currentSlideData.image}
              />
            )}
            {/* Cinematic Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/40 to-neutral-950/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4 bg-primary/10 backdrop-blur-sm border border-primary/20 px-4 py-1.5 rounded-full">
              Jerusalem Spiritual Center
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight max-w-3xl">
              {currentSlideData.title}
            </h1>
            <p className="text-lg md:text-2xl mb-10 text-neutral-300 max-w-2xl font-light leading-relaxed">
              {currentSlideData.subtitle}
            </p>
            <Link href={currentSlideData.link}>
              <Button className="bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-primary-foreground font-semibold px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.03] transition-all duration-300 border-0">
                {currentSlideData.cta}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Classy Navigation Chevrons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/5 dark:bg-black/25 hover:bg-primary/20 text-white rounded-full flex items-center justify-center border border-white/10 hover:border-primary/50 transition-all duration-300 z-20 focus:outline-none"
      >
        <ChevronLeft className="w-6 h-6 text-neutral-200" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/5 dark:bg-black/25 hover:bg-primary/20 text-white rounded-full flex items-center justify-center border border-white/10 hover:border-primary/50 transition-all duration-300 z-20 focus:outline-none"
      >
        <ChevronRight className="w-6 h-6 text-neutral-200" />
      </button>

      {/* Bullet points */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
