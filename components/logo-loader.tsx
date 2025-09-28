"use client"

import Image from "next/image"
import logo from "@/components/assets/jsc.png"
import React from "react"

export default function LogoLoader({ fullScreen = true }: { fullScreen?: boolean }) {
  return (
    <div className={`${fullScreen ? "h-screen" : "h-48"} w-full flex items-center justify-center`}>
      <div className="relative w-[220px] h-[220px]">
        {/* Soft glow base for a wider feel */}
        <div className="absolute -inset-x-10 bottom-2 h-12 rounded-full bg-blue-500/20 blur-2xl" />

        {/* Rotating accent ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500/60 animate-spin" style={{ animationDuration: "3s" }} />

        {/* Inner ring for depth */}
        <div className="absolute inset-4 rounded-full border-2 border-blue-500/10" />

        {/* Logo */}
        <div className="absolute inset-6 rounded-2xl bg-white/80 backdrop-blur shadow-2xl flex items-center justify-center">
          <div className="relative w-[160px] h-[160px]">
            <Image
              src={logo}
              alt="JSC Church Logo"
              fill
              sizes="160px"
              className="animate-pulse"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}


