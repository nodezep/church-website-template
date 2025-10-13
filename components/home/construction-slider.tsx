"use client"

import { useState, useEffect } from "react"
import { fetchHomeContent } from "@/lib/supabase-helpers"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type Slide = {
  id: string
  title?: string
  description?: string
  imageUrl: string
}

const defaultSlides: Slide[] = [
  {
    id: "slide-1",
    title: "Foundation Work",
    description: "Laying a strong foundation for the new sanctuary.",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "slide-2",
    title: "Raising the Walls",
    description: "Progress on the main auditorium walls.",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "slide-3",
    title: "Roof Framing",
    description: "Installing roof trusses and framing.",
    imageUrl: "/placeholder.jpg",
  },
]

export default function ConstructionSlider() {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides)

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const content = await fetchHomeContent("construction") as { slides?: Slide[] } | null
        if (content?.slides && Array.isArray(content.slides) && content.slides.length > 0) {
          // Ensure all slides have unique IDs
          const validatedSlides = content.slides.map((slide, index) => ({
            ...slide,
            id: slide.id || `db-slide-${index}-${Date.now()}`
          }))
          setSlides(validatedSlides)
        }
      } catch (error) {
        console.error("Failed to load slides:", error)
        // Fallback to default slides if there's an error
        setSlides(defaultSlides)
      }
    }

    loadSlides()
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ongoing Church Construction
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A glimpse of the building progress—thank you for praying and supporting this work.
          </p>
        </div>

        <div className="relative">
          <Carousel
            className="w-full"
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem 
                  key={slide.id || `slide-${index}-${Date.now()}`}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-2 h-full">
                    <div className="bg-white rounded-xl shadow overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={slide.imageUrl}
                          alt={slide.title || "Construction slide"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {(slide.title || slide.description) && (
                        <div className="p-4">
                          {slide.title && (
                            <h3 className="text-lg font-semibold text-gray-900">{slide.title}</h3>
                          )}
                          {slide.description && (
                            <p className="mt-1 text-sm text-gray-600">{slide.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}