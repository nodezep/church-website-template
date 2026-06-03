"use client"

import { useState, useEffect } from "react"
import { fetchHomeContent } from "@/lib/supabase-helpers"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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
  const [api, setApi] = useState<CarouselApi | null>(null)

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const content = await fetchHomeContent("construction") as { slides?: Slide[] } | null
        if (content?.slides && Array.isArray(content.slides) && content.slides.length > 0) {
          const validatedSlides = content.slides.map((slide, index) => ({
            ...slide,
            id: slide.id || `db-slide-${index}-${Date.now()}`
          }))
          setSlides(validatedSlides)
        }
      } catch (error) {
        console.error("Failed to load slides:", error)
        setSlides(defaultSlides)
      }
    }

    loadSlides()
  }, [])

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      try {
        Promise.resolve(api?.scrollNext()).catch((err) => {
          console.warn("Autoplay scrollNext error:", err)
        })
      } catch (e) {
        // ignore
      }
    }, 4500)

    return () => clearInterval(interval)
  }, [api])

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-150 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-16 text-center">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
            Building for the Future
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-neutral-900 dark:text-white mt-3">
            Ongoing Church Construction
          </h2>
          <div className="h-[1px] w-20 bg-primary/45 mx-auto mt-4 mb-6" />
          <p className="text-lg text-neutral-600 dark:text-neutral-350 max-w-2xl mx-auto font-light">
            A glimpse of the building progress—thank you for praying and supporting this work.
          </p>
        </div>

        <div className="relative px-4">
          <Carousel
            className="w-full"
            opts={{ align: "start", loop: true }}
            setApi={setApi}
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem 
                  key={slide.id || `slide-${index}`}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-3 h-full">
                    <div className="bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-805 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 h-full flex flex-col overflow-hidden group">
                      
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {/* Phase label */}
                        <div className="absolute top-4 left-4 z-10 bg-neutral-950/70 backdrop-blur-md text-primary border border-primary/35 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                          Phase {index + 1}
                        </div>
                        
                        {(() => {
                          const imageSrc = slide.imageUrl && String(slide.imageUrl).trim() ? slide.imageUrl : null
                          if (imageSrc) {
                            return (
                              <img
                                src={imageSrc}
                                alt={slide.title || "Construction slide"}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                              />
                            )
                          }

                          return (
                            <div className="h-full w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                              <span className="text-sm text-neutral-400">No image available</span>
                            </div>
                          )
                        })()}
                      </div>

                      {(slide.title || slide.description) && (
                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            {slide.title && (
                              <h3 className="text-xl font-bold font-serif text-neutral-950 dark:text-neutral-100 mb-2 group-hover:text-primary transition-colors">
                                {slide.title}
                              </h3>
                            )}
                            {slide.description && (
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                                {slide.description}
                              </p>
                            )}
                          </div>
                          
                          {/* Mini Progress Bar decoration */}
                          <div className="mt-6">
                            <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full w-3/4 group-hover:w-full transition-all duration-700" 
                                style={{ width: `${30 + (index * 25)}%` }} 
                              />
                            </div>
                            <div className="flex justify-between items-center mt-2 text-[10px] text-neutral-400 uppercase tracking-wider">
                              <span>Progress</span>
                              <span>{30 + (index * 25)}%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-8 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-650 hover:bg-primary hover:text-white" />
            <CarouselNext className="-right-4 md:-right-8 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-650 hover:bg-primary hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}