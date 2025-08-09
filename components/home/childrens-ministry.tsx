"use client"

import { motion } from "framer-motion"
import { Baby } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ChildrensMinistry() {
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Children's Ministry</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We believe children are a gift from God and deserve a safe, fun environment where they can learn about
              Jesus and grow in their faith. Our children's ministry provides age-appropriate programs that help kids
              discover God's love.
            </p>
            <Link href="/ministries#children">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold">
                Learn More
              </Button>
            </Link>
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
              src="/placeholder.svg?height=400&width=600&text=Children+Ministry"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
