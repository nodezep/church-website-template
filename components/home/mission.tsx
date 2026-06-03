"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import LogoLoader from "@/components/logo-loader"
import { createBrowserClient } from "@supabase/ssr"

interface AboutPageData {
  mission_statement: string
  vision_statement: string
}

export default function Mission() {
  const [aboutPageData, setAboutPageData] = useState<AboutPageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMissionAndVision = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      try {
        const { data } = await supabase
          .from("about_page")
          .select("mission_statement, vision_statement")
          .single()
        setAboutPageData(data)
      } catch (error) {
        console.error("Error fetching mission and vision:", error)
        // Set beautiful fallbacks if supabase fails or returns empty
        setAboutPageData({
          mission_statement: "To spread the love of Jesus Christ, build a strong community of believers, and make a lasting impact on our city and beyond.",
          vision_statement: "To be a beacon of hope and faith, fostering deep spiritual growth, family connection, and global mission commitment."
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMissionAndVision()
  }, [])

  if (loading) {
    return <LogoLoader fullScreen={false} />
  }

  if (!aboutPageData) {
    return null
  }

  return (
    <section className="py-28 hero-gradient relative overflow-hidden text-white border-y border-neutral-850">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-primary font-medium tracking-[0.25em] uppercase text-xs">
            Purpose & Call
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white">
            Our Mission
          </h2>
          
          <div className="h-[1px] w-20 bg-primary/45 mx-auto" />
          
          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed font-light font-serif italic py-4">
            “{aboutPageData.mission_statement}”
          </p>

          <div className="glass-card bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl mt-12 transition-all duration-300 hover:border-primary/20">
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs block mb-3">
              Vision for tomorrow
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-4">
              Our Vision
            </h3>
            <div className="h-[1px] w-12 bg-primary/30 mx-auto mb-6" />
            <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">
              {aboutPageData.vision_statement}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

