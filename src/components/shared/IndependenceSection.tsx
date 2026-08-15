'use client'

import { useEffect, useRef, useState } from 'react'

export function IndependenceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.25 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="independence"
      className="relative section bg-white overflow-hidden"
      aria-labelledby="independence-heading"
    >
      {/* Subtle tricolour wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(255,153,51,0.04) 0%, rgba(255,255,255,0) 50%, rgba(19,136,8,0.04) 100%)' }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Eyebrow */}
          <p className="text-caption text-saffron font-medium uppercase tracking-widest" style={{ marginBottom: '0.75rem' }}>
            15 August 1947 · 00:00
          </p>

          {/* Headline */}
          <h2
            id="independence-heading"
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.05, marginBottom: '2.5rem' }}
          >
            At the stroke of midnight,{' '}
            <span className="text-saffron">India awoke.</span>
          </h2>

          {/* Nehru quote — centred block, text left inside for readability */}
          <figure style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <blockquote style={{ borderLeft: '4px solid #FF9933', paddingLeft: '1.25rem' }}>
              <p
                className="font-quote italic text-text-primary/80 leading-relaxed"
                style={{ fontSize: 'clamp(17px, 2.2vw, 22px)', textAlign: 'left' }}
              >
                "At the stroke of the midnight hour, when the world sleeps, India will awake to
                life and freedom."
              </p>
            </blockquote>
            <figcaption style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', textAlign: 'left', color: '#5A5A5A', fontSize: '0.8rem', fontWeight: 500 }}>
              — Jawaharlal Nehru, Tryst with Destiny, 14 August 1947
            </figcaption>
          </figure>

          {/* Cost paragraph */}
          <p style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', color: '#5A5A5A', fontSize: '1rem', lineHeight: '1.7' }}>
            This moment cost 90 years of resistance, millions of lives disrupted, hundreds of
            thousands imprisoned, and countless unrecorded sacrifices. It was not given — it was
            taken back.
          </p>

          {/* Divider with Chakra */}
          <div className="flex items-center justify-center gap-4" style={{ marginTop: '4rem', marginBottom: '4rem' }} aria-hidden="true">
            <div className="h-px bg-border flex-1 max-w-[120px]" />
            <svg viewBox="0 0 40 40" className="w-8 h-8 opacity-20" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#000080" strokeWidth="2" />
              <circle cx="20" cy="20" r="3" fill="#000080" />
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i * 15 * Math.PI) / 180
                return (
                  <line
                    key={i}
                    x1={20 + 3 * Math.cos(a)} y1={20 + 3 * Math.sin(a)}
                    x2={20 + 17 * Math.cos(a)} y2={20 + 17 * Math.sin(a)}
                    stroke="#000080" strokeWidth="1"
                  />
                )
              })}
            </svg>
            <div className="h-px bg-border flex-1 max-w-[120px]" />
          </div>

          {/* Forward-looking */}
          <p className="text-text-secondary text-base" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
            80 years of freedom. The question is now yours.
          </p>
          <p
            className="font-heading font-semibold text-text-primary"
            style={{ fontSize: 'clamp(20px, 3vw, 28px)', textAlign: 'center' }}
          >
            What will you do with yours?
          </p>
        </div>
      </div>
    </section>
  )
}
