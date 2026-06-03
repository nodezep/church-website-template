"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Ministries", href: "/ministries" },
  { name: "Kids", href: "/kids" },
  { name: "JSC Zones", href: "/jsc-zones" },
  { name: "Events", href: "/events" },
  { name: "Sermons", href: "/sermons" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/85 dark:bg-neutral-950/85 backdrop-blur-lg shadow-md border-b border-primary/20 py-2" 
          : "bg-white/95 dark:bg-neutral-950/95 border-b border-neutral-100 dark:border-neutral-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-lg p-0.5 bg-gradient-to-tr from-primary to-amber-300">
                <img
                  src="/logo.png"
                  alt="JSC Logo"
                  className="h-12 w-auto rounded-md bg-white object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-xl font-bold font-serif tracking-wider text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
                JSC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-neutral-600 dark:text-neutral-300"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              )
            })}
            <div className="pl-2 flex items-center space-x-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-primary" />
                  ) : (
                    <Moon className="h-5 w-5 text-neutral-600 hover:text-primary" />
                  )}
                </button>
              )}
              <Button asChild className="bg-primary hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 text-primary-foreground font-semibold rounded-full px-6 py-2 transition-all duration-300">
                <Link href="/contact">Visit Us</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Header Items */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-neutral-700" />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-700 dark:text-neutral-200 hover:text-primary focus:outline-none p-2 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-100 dark:border-neutral-900 shadow-xl">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 px-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full py-6">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Visit Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
