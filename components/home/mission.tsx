"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import LogoLoader from "@/components/logo-loader"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface AboutPageData {
  mission_statement: string
  vision_statement: string
}

export default function Mission() {
  const [aboutPageData, setAboutPageData] = useState<AboutPageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMissionAndVision = async () => {
      const supabase = createClientComponentClient()
      try {
        const { data } = await supabase
          .from("about_page")
          .select("mission_statement, vision_statement")
          .single()
        setAboutPageData(data)
      } catch (error) {
        console.error("Error fetching mission and vision:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMissionAndVision()
  }, [])

  if (loading) {
    return <LogoLoader fullScreen />
  }

  if (!aboutPageData) {
    return null
  }

  return (
    <section className="py-20 hero-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            {aboutPageData.mission_statement}
          </p>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-lg text-gray-700">
              {aboutPageData.vision_statement}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
