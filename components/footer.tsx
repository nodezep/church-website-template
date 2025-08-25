// components/footer.tsx
"use client"

import Link from "next/link"
import { Church, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useEffect, useState } from "react"
import { getSettings } from "@/lib/settingsService"

interface FooterData {
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  service_schedule: {
    sunday_morning: string
    wednesday_prayer: string
    friday_youth: string
  }
  social_media: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [footerData, setFooterData] = useState<FooterData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFooterData() {
      try {
        const settings = await getSettings()
        if (settings) {
          setFooterData({
            name: settings.name || "Jerusalem Spiritual Centre",
            tagline: settings.tagline || "Faith, Hope, Love",
            address: settings.address || "123 Faith Street, Hope City, HC 12345",
            phone: settings.phone || "+1 (555) 123-4567",
            email: settings.email || "info@jsc.com",
            service_schedule: settings.service_schedule || {
              sunday_morning: "9:00 AM & 10:30 AM",
              wednesday_prayer: "7:00 PM",
              friday_youth: "6:30 PM"
            },
            social_media: settings.social_media || {
              facebook: "",
              twitter: "",
              instagram: "",
              youtube: ""
            }
          })
        }
      } catch (error) {
        console.error("Failed to load footer data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFooterData()
  }, [])

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Church className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">{footerData?.name}</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {footerData?.tagline}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{footerData?.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{footerData?.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{footerData?.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links - unchanged */}

          {/* Service Times */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Times</h3>
            <div className="space-y-2 text-gray-300">
              <div>
                <p className="font-medium">Sunday Worship</p>
                <p className="text-sm">{footerData?.service_schedule.sunday_morning}</p>
              </div>
              <div>
                <p className="font-medium">Wednesday Prayer</p>
                <p className="text-sm">{footerData?.service_schedule.wednesday_prayer}</p>
              </div>
              <div>
                <p className="font-medium">Friday Youth</p>
                <p className="text-sm">{footerData?.service_schedule.friday_youth}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {footerData?.social_media.facebook && (
                  <a href={footerData.social_media.facebook} className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {footerData?.social_media.twitter && (
                  <a href={footerData.social_media.twitter} className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {footerData?.social_media.instagram && (
                  <a href={footerData.social_media.instagram} className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {footerData?.social_media.youtube && (
                  <a href={footerData.social_media.youtube} className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - unchanged */}
      </div>
    </footer>
  )
}