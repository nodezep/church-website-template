"use client"

import { motion } from "framer-motion"
import { Baby } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { fetchHomeContent } from "@/lib/supabase-helpers"

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentData = await fetchHomeContent("children") as ChildrenContent | null
        if (contentData) {
          setContent(contentData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setContent((prev) => ({
          ...prev,
          // If the fetched url is a standard placeholder, keep it but ensure styling handles it gracefully
          imageUrl: prev.imageUrl || "/placeholder.svg?height=400&width=600&text=Children+Ministry"
        }))
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="py-24 bg-white dark:bg-neutral-950 animate-pulse flex items-center justify-center"><div className="text-primary tracking-widest text-sm uppercase">Loading children&apos;s ministry...</div></div>

  return (
    <section className="py-24 bg-white dark:bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl items-center justify-center">
              <Baby className="w-7 h-7 text-primary" />
            </div>
            
            <span className="block text-primary font-medium tracking-[0.2em] uppercase text-xs">
              Nurturing Faith Early
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-neutral-900 dark:text-white leading-tight">
              {content.title}
            </h2>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-350 leading-relaxed font-light">
              {content.description}
            </p>
            
            <div className="pt-4">
              <Link href="/kids">
                <Button className="bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 border-0">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group"
          >
            {/* Elegant Glow Base */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-primary to-amber-400 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            {/* Border Mask Wrapper */}
            <div className="relative p-2.5 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden">
              <img
                className="w-full h-[400px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                alt="Happy children in Sunday school class"
                src={content.imageUrl}
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}