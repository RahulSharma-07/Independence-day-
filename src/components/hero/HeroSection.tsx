'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      aria-label="Hero — Azadi 79"
    >
      {/* Tricolour gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,153,51,0.08) 0%, rgba(255,255,255,0) 50%, rgba(19,136,8,0.08) 100%)' }}
        aria-hidden="true"
      />

      {/* Chakra glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,0,128,0.05) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Ashoka Chakra watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,90vw)] h-[min(500px,90vw)] opacity-[0.04] pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="88" stroke="#000080" strokeWidth="4" />
          <circle cx="100" cy="100" r="10" fill="#000080" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 * Math.PI) / 180
            return (
              <line
                key={i}
                x1={100 + 10 * Math.cos(a)} y1={100 + 10 * Math.sin(a)}
                x2={100 + 88 * Math.cos(a)} y2={100 + 88 * Math.sin(a)}
                stroke="#000080" strokeWidth="2"
              />
            )
          })}
        </svg>
      </div>

      {/* Content — uses .container for consistent side padding */}
      <div className="container relative z-10 text-center">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-saffron/30 bg-saffron/8 text-saffron-dark text-caption font-medium mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" aria-hidden="true" />
          15 August 2026 · 80 Years of Independence
        </div>

        {/* Headline */}
        <h1
          className={`font-heading font-bold text-text-primary mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ fontSize: 'clamp(36px, 7vw, 72px)', lineHeight: 1.05 }}
        >
          How India Won{' '}
          <span className="text-saffron">Its Freedom.</span>
        </h1>

        {/* Sub-headline */}
        <p
          className={`max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed mb-10 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Not a list of names and dates — an experience. 100 freedom fighters, an interactive
          journey from 1857 to 1947, and an AI guide who knows every story.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Button variant="primary" size="lg" onClick={() => scrollTo('journey')}>
            Begin the Journey
          </Button>
          <Button variant="secondary" size="lg" onClick={() => scrollTo('fighters')}>
            Explore Fighters
          </Button>
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap justify-center gap-8 sm:gap-16 mt-16 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {[
            { number: '100+', label: 'Freedom Fighters' },
            { number: '90',   label: 'Years of Struggle' },
            { number: '7',    label: 'Paths to Freedom' },
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-heading font-bold text-saffron">{number}</div>
              <div className="text-caption text-text-secondary mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className={`mt-16 flex flex-col items-center gap-2 text-text-secondary text-caption transition-all duration-700 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <span>Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border-2 border-text-secondary/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-saffron rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  )
}
