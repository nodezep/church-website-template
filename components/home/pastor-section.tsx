"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { fetchPastorProfile } from "@/lib/homeService"

export default function PastorSection() {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("Pastor")
  const [title, setTitle] = useState("Senior Pastor")
  const [bio, setBio] = useState("")
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined)
  const [years, setYears] = useState<number | undefined>(undefined)
  const [sermons, setSermons] = useState<number | undefined>(undefined)
  const [quote, setQuote] = useState<string | undefined>(undefined)

  useEffect(() => {
    const load = async () => {
      const profile = await fetchPastorProfile()
      if (profile) {
        setName(profile.name)
        setTitle(profile.title)
        setBio(profile.bio)
        setPhotoUrl(profile.photo_url)
        setYears(profile.years_service)
        setSermons(profile.sermons_count)
        setQuote(profile.quote)
      } else {
        // Classy fallbacks if DB is empty
        setName("Pastor Johnathan Brooks")
        setTitle("Senior Pastor")
        setBio("Pastor Johnathan Brooks has been leading Doxor Christian Center with a passion for biblical teaching, community revival, and spiritual leadership. Under his guidance, our church has focused on creating a vibrant space where faith thrives, families grow, and the grace of Jesus Christ is actively lived out daily.")
        setYears(12)
        setSermons(420)
        setQuote("Our calling is not to fit into the culture, but to reflect the transcendent love and truth of Christ in all that we do.")
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="py-24 bg-white dark:bg-neutral-950 animate-pulse flex items-center justify-center"><div className="text-primary tracking-widest text-sm uppercase">Loading profile...</div></div>

  return (
    <section className="py-24 bg-white dark:bg-neutral-950 relative overflow-hidden">
      {/* Decorative light glow background */}
      <div className="absolute right-0 bottom-[-10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
            Spiritual Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-neutral-900 dark:text-white mt-3">
            Meet Our Senior Pastor
          </h2>
          <div className="h-[1px] w-20 bg-primary/45 mx-auto mt-4 mb-6" />
          <p className="text-lg text-neutral-600 dark:text-neutral-350 max-w-2xl mx-auto font-light leading-relaxed">
            Leading our congregation with wisdom, compassion, and unwavering faith.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -35 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            {/* Elegant outer gold outline overlay offset */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-primary/40 rounded-2xl pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-neutral-900 p-2.5 border border-neutral-100 dark:border-neutral-800">
              <img
                src={photoUrl || "/placeholder-user.jpg"}
                alt={name}
                className="w-full h-[520px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-5 -right-5 bg-gradient-to-tr from-primary to-amber-500 text-primary-foreground p-4 rounded-2xl shadow-xl hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 35 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-neutral-900 dark:text-neutral-100 mb-3">
                {name}
              </h3>
              <Badge className="border border-primary/45 text-primary bg-primary/5 uppercase tracking-widest text-[10px] px-4 py-1.5 font-bold rounded-full pointer-events-none">
                {title}
              </Badge>
            </div>

            {bio && (
              <p className="text-neutral-600 dark:text-neutral-350 text-base leading-relaxed font-light">
                {bio}
              </p>
            )}

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-center group hover:border-primary/30 transition-all duration-300">
                <div className="text-3xl font-bold font-serif text-primary mb-1">
                  {years ?? "12+"}
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Years of Service
                </div>
              </div>
              
              <div className="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-center group hover:border-primary/30 transition-all duration-300">
                <div className="text-3xl font-bold font-serif text-primary mb-1">
                  {sermons ?? "420+"}
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Sermons Preached
                </div>
              </div>
            </div>

            {quote && (
              <div className="relative pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <span className="absolute left-0 top-3 text-7xl font-serif text-primary/10 select-none pointer-events-none">“</span>
                <blockquote className="text-lg md:text-xl font-serif italic text-neutral-700 dark:text-neutral-300 pl-6 leading-relaxed relative z-10">
                  {quote}
                </blockquote>
              </div>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}

