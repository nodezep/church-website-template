"use client"

import { motion } from "framer-motion"
import { Baby } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { fetchHomeContent } from "@/lib/supabase-helpers"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Define the correct type for children content
interface ChildrenContent {
  title: string
  description: string
  imageUrl: string
}

const defaultContent: ChildrenContent = {
  title: "Children's Ministry",
  description: "We believe children are a gift from God and deserve a safe, fun environment where they can learn about Jesus and grow in their faith.",
  imageUrl: "/placeholder.svg?height=400&width=600&text=Children+Ministry"
}

export default function ChildrensMinistry() {
  const [content, setContent] = useState<ChildrenContent>(defaultContent)
  const [ministryId, setMinistryId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClientComponentClient()
      
      try {
        // Fetch the content with correct typing
        const contentData = await fetchHomeContent("children") as ChildrenContent | null
        if (contentData) {
          setContent(contentData)
        }

        // Fetch the Children's Ministry ID from the database
        const { data, error } = await supabase
          .from("ministries")
          .select("id")
          .eq("title", "Children's Ministry")
          .eq("active", true)
          .single()

        if (!error && data) {
          setMinistryId(data.id)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  if (loading) return <div className="py-20 bg-white animate-pulse"></div>

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Baby className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{content.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {content.description}
            </p>
            {ministryId ? (
              <Link href={`/ministries/${ministryId}`}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold">
                  Learn More
                </Button>
              </Link>
            ) : (
              <Link href="/ministries">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold">
                  View Ministries
                </Button>
              </Link>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              alt="Happy children in Sunday school class"
              src={content.imageUrl}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}