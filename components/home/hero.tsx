"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchHomeContent } from "@/lib/supabase-helpers"

// Define the correct type for hero content
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
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [heroSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  if (loading) return <div className="h-screen bg-gray-200 animate-pulse"></div>
  if (heroSlides.length === 0) return null

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {currentSlideData.image.match(/\.(mp4|webm)$/i) ? (
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src={currentSlideData.image} type="video/mp4" />
          </video>
        ) : (
          <img
            className="w-full h-full object-cover transition-opacity duration-1000"
            alt={`Hero slide ${currentSlide + 1}`}
            src={currentSlideData.image}
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {currentSlideData.title}
          </motion.h1>
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            {currentSlideData.subtitle}
          </motion.p>
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href={currentSlideData.link}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 hover:shadow-xl">
                {currentSlideData.cta}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}