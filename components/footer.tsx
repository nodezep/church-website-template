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
            name: settings.name || "JSC Church",
            tagline: settings.tagline || "Faith, Hope, Love",
            address: settings.address || "123 Faith Street, Hope City, HC 12345",
            phone: settings.phone || "+1 (555) 123-4567",
            email: settings.email || "info@jsc.org",
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
      <footer className="bg-neutral-950 text-white border-t border-neutral-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-6 bg-neutral-900 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-neutral-900 rounded w-3/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-neutral-900 rounded w-1/2"></div>
                  <div className="h-4 bg-neutral-900 rounded"></div>
                  <div className="h-4 bg-neutral-900 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-850 py-16 relative overflow-hidden">
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Church Info */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 border border-primary/20 rounded-xl">
                <Church className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold font-serif tracking-wider">{footerData?.name}</span>
            </div>
            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-sm">
              {footerData?.tagline}
            </p>
            <div className="space-y-3 pt-2 text-sm text-neutral-300 font-light">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                <span>{footerData?.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 shrink-0" />
                <span>{footerData?.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 shrink-0" />
                <span>{footerData?.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-bold text-primary">Discover</h3>
            <ul className="space-y-2 text-sm text-neutral-400 font-light">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-primary transition-colors">Ministries</Link>
              </li>
              <li>
                <Link href="/kids" className="hover:text-primary transition-colors">Kids Ministry</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Visit Us</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-bold text-primary">Resources</h3>
            <ul className="space-y-2 text-sm text-neutral-400 font-light">
              <li>
                <Link href="/sermons" className="hover:text-primary transition-colors">Sermons</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
              </li>
              <li>
                <Link href="/jsc-zones" className="hover:text-primary transition-colors">JSC Zones</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Prayer Requests</Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-widest font-bold text-primary">Service Times</h3>
              <div className="space-y-3 text-sm text-neutral-300 font-light">
                <div className="border-l border-primary/20 pl-4 py-0.5">
                  <p className="font-semibold text-neutral-100">Sunday Worship</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{footerData?.service_schedule.sunday_morning}</p>
                </div>
                <div className="border-l border-primary/20 pl-4 py-0.5">
                  <p className="font-semibold text-neutral-100">Wednesday Prayer</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{footerData?.service_schedule.wednesday_prayer}</p>
                </div>
                <div className="border-l border-primary/20 pl-4 py-0.5">
                  <p className="font-semibold text-neutral-100">Friday Youth</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{footerData?.service_schedule.friday_youth}</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-3">Connect With Us</h4>
              <div className="flex space-x-3">
                {footerData?.social_media.facebook && (
                  <a href={footerData.social_media.facebook} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-primary hover:border-primary/35 transition-all" aria-label="Facebook">
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {footerData?.social_media.twitter && (
                  <a href={footerData.social_media.twitter} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-primary hover:border-primary/35 transition-all" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {footerData?.social_media.instagram && (
                  <a href={footerData.social_media.instagram} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-primary hover:border-primary/35 transition-all" aria-label="Instagram">
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {footerData?.social_media.youtube && (
                  <a href={footerData.social_media.youtube} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-primary hover:border-primary/35 transition-all" aria-label="YouTube">
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 space-y-4 md:space-y-0 font-light">
          <p>© {currentYear} {footerData?.name}. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

