"use client"

import Image from "next/image"
import React from "react"

export default function LogoLoader({ fullScreen = true }: { fullScreen?: boolean }) {
  return (
    <div 
      className={`${
        fullScreen 
          ? "h-screen bg-radial from-neutral-900 to-neutral-950 text-white" 
          : "h-64"
      } w-full flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Decorative luxury background elements (only on full screen) */}
      {fullScreen && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        </>
      )}

      <div className="relative w-[240px] h-[240px] flex items-center justify-center">
        {/* Soft golden glow base */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse" />

        {/* Elegant outer orbit spinning ring */}
        <div 
          className="absolute inset-0 rounded-full border border-primary/20 border-t-primary border-r-primary/40 animate-spin" 
          style={{ animationDuration: "2.5s", animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }} 
        />

        {/* Elegant counter-rotating middle dashed ring */}
        <div 
          className="absolute inset-4 rounded-full border border-dashed border-primary/40 border-b-primary/80 animate-spin" 
          style={{ animationDuration: "4s", animationDirection: "reverse" }} 
        />

        {/* Inner solid gold ring */}
        <div className="absolute inset-8 rounded-full border border-primary/10" />

        {/* Glassmorphic Logo Container */}
        <div className="absolute inset-10 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="relative w-[110px] h-[110px] transition-transform duration-500 hover:scale-105">
            <Image
              src="/logo.png"
              alt="JSC Church Logo"
              fill
              sizes="110px"
              className="animate-pulse object-contain"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* Classy loader caption */}
      {fullScreen && (
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-xs uppercase tracking-[0.4em] text-primary font-medium mb-1">
            JSC Church
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto my-2" />
          <p className="text-sm font-serif italic text-neutral-400">
            Gathering in Faith, Hope & Love
          </p>
        </div>
      )}
    </div>
  )
}




