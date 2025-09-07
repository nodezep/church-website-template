"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Heart, Star } from "lucide-react"
import { fetchKidsClasses } from "@/lib/kidsService"

const iconMap: Record<string, any> = { Heart, Users, Star, BookOpen }

export default function KidsClasses() {
  const [classes, setClasses] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchKidsClasses()
      setClasses(data as any[])
    }
    load()
  }, [])

  const effective = useMemo(()=> (classes.length ? classes : [
    { name: "Nazareth", age_range: "Ages 3-9", description: "Our youngest learners discover God's love.", features: ["Bible Stories","Creative Crafts","Fun Songs","Play Time"], color: "from-pink-400 to-rose-500", icon: "Heart", capacity: "15-20 kids" },
    { name: "Galilee", age_range: "Ages 10-12", description: "Growing in faith through interactive lessons.", features: ["Interactive Lessons","Team Games","Memory Verses","Friendship Building"], color: "from-blue-400 to-cyan-500", icon: "Users", capacity: "20-25 kids" },
    { name: "Jerusalem", age_range: "Ages 13-18", description: "Teens explore deeper faith concepts.", features: ["Deep Bible Study","Leadership Skills","Mission Projects","Peer Mentoring"], color: "from-purple-400 to-indigo-500", icon: "Star", capacity: "25-30 teens" },
  ]), [classes])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Kids Classes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Age-appropriate learning environments where every child can grow in faith and friendship
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {effective.map((classItem: any, index: number) => (
            <motion.div
              key={classItem.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`h-2 bg-gradient-to-r ${classItem.color || "from-yellow-400 to-orange-500"}`}></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${classItem.color || "from-yellow-400 to-orange-500"} flex items-center justify-center`}>
                      {(() => {
                        const Ico = iconMap[classItem.icon as string] || Heart
                        return <Ico className="w-8 h-8 text-white" />
                      })()}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{classItem.name}</h3>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      {classItem.age_range || classItem.ageRange}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {classItem.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {(classItem.features || []).map((feature: string, featureIndex: number) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Class Capacity</p>
                    <p className="font-semibold text-gray-900">{classItem.capacity}</p>
                  </div>

                  <div className="mt-6">
                    <button className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${classItem.color || "from-yellow-400 to-orange-500"} hover:opacity-90 transition-opacity`}>
                      Join {classItem.name}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us to learn more about our kids classes and find the perfect fit for your child's spiritual journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
              <button className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule a Visit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
