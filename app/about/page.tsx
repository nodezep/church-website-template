"use client"

import { motion } from "framer-motion"
import { Heart, Users, BookOpen, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface AboutPageData {
  hero_title: string
  hero_description: string
  story_title: string
  story_content: string[]
  story_image_url: string
  values_title: string
  values_description: string
  mission_statement: string
  vision_statement: string
}

interface CoreValue {
  title: string
  description: string
  icon_name: string
}

interface Leader {
  name: string
  role: string
  description: string
  image_url: string
}

const iconComponents: Record<string, React.ComponentType<any>> = {
  Heart,
  Users,
  BookOpen,
  Globe
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null)
  const [coreValues, setCoreValues] = useState<CoreValue[]>([])
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClientComponentClient()
      
      try {
        // Fetch about page content
        const { data: aboutData } = await supabase
          .from('about_page')
          .select('*')
          .single()

        // Fetch core values
        const { data: valuesData } = await supabase
          .from('core_values')
          .select('*')
          .order('sort_order', { ascending: true })

        // Fetch leadership team
        const { data: leadersData } = await supabase
          .from('leadership_team')
          .select('*')
          .order('sort_order', { ascending: true })

        setAboutData(aboutData)
        setCoreValues(valuesData || [])
        setLeaders(leadersData || [])
      } catch (error) {
        console.error("Error fetching about page data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading about page...</div>
      </div>
    )
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">About page content not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{aboutData.hero_title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {aboutData.hero_description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{aboutData.story_title}</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                {aboutData.story_content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                alt="Church history and community gathering"
                src={aboutData.story_image_url || "/placeholder.svg?height=400&width=600&text=Church+History"}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{aboutData.values_title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {aboutData.values_description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = iconComponents[value.icon_name] || Heart
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated leaders who guide our church family with wisdom and love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-50 p-8 rounded-xl"
              >
                <img
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
                  alt={`${leader.name} - ${leader.role}`}
                  src={leader.image_url || "/placeholder.svg"}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{leader.role}</p>
                <p className="text-gray-600">{leader.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              {aboutData.mission_statement}
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700">
                {aboutData.vision_statement}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}