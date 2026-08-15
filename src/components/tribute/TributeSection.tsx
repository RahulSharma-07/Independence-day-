'use client'

import { useEffect, useRef, useState } from 'react'
import fightersData from '@/data/fighters.json'

const TRIBUTE_NAMES = [
  ...fightersData.fighters.map((f) => f.name),
  'Ram Prasad Bismil', 'Ashfaqulla Khan', 'Aruna Asaf Ali', 'Jawaharlal Nehru',
  'Bal Gangadhar Tilak', 'Lala Lajpat Rai', 'Bipin Chandra Pal', 'Tantia Tope',
  'Bahadur Shah Zafar', 'Uda Devi', 'Begum Hazrat Mahal', 'Maulvi Ahmadullah Shah',
  'Veer Savarkar', 'Sukhdev Thapar', 'Rajguru', 'Khudiram Bose', 'Prafulla Chaki',
  'Pritilata Waddedar', 'Kalpana Dutta', 'Shanti Ghosh', 'Suniti Choudhury',
  'Captain Lakshmi Sahgal', 'Colonel Prem Sahgal', 'Shah Nawaz Khan', 'Gurbaksh Singh Dhillon',
  'Tipu Sultan', 'Veerapandiya Kattabomman', 'Pazhassi Raja', 'Alluri Sitarama Raju',
  'Komaram Bheem', 'Batukeshwar Dutt', 'Madan Lal Dhingra', 'Udham Singh',
  'Kartar Singh Sarabha', 'Lala Har Dayal', 'Annie Besant', 'Abul Kalam Azad',
  'Khan Abdul Ghaffar Khan', 'C. Rajagopalachari', 'B. R. Ambedkar', 'Periyar',
  'Subramanya Bharati', 'Bibi Gulab Kaur', 'Kasturba Gandhi', 'Kamala Nehru',
  'Vijaya Lakshmi Pandit', 'Usha Mehta',
]

export function TributeSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tribute"
      className="relative bg-[#0a0a0a] overflow-hidden"
      aria-labelledby="tribute-heading"
    >
      {/* Diya ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,153,51,0.07) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-24 flex flex-col items-center">

        {/* Flame */}
        <div
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 40 52" className="w-10 h-12 mb-8 mx-auto" fill="none">
            <path
              d="M20 48 C8 44 4 34 6 24 C8 18 12 14 16 10 C14 16 16 20 20 22 C18 14 22 6 28 2 C26 10 28 16 32 20 C36 24 36 34 30 40 C28 44 24 47 20 48Z"
              fill="#FF9933" opacity="0.9"
            />
            <path
              d="M20 48 C14 44 12 38 14 32 C16 28 18 26 20 24 C19 28 20 31 22 33 C24 28 22 22 24 18 C27 24 28 30 26 36 C25 41 23 45 20 48Z"
              fill="#FFF" opacity="0.7"
            />
            <ellipse cx="20" cy="48" rx="12" ry="3" fill="#E67E22" opacity="0.5" />
          </svg>
        </div>

        {/* Heading */}
        <div
          className={`text-center mb-12 max-w-lg mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2
            id="tribute-heading"
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            They Gave Everything.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Every name here is a life — a story of sacrifice, conviction, and love for a country
            that didn't yet exist. Remember them.
          </p>
        </div>

        {/* Name roll-call */}
        <div
          className={`w-full max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          role="list"
          aria-label="Roll call of freedom fighters"
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {TRIBUTE_NAMES.map((name, i) => (
              <span
                key={`${name}-${i}`}
                role="listitem"
                className="text-white/55 text-sm font-body hover:text-saffron transition-colors duration-300 cursor-default"
                style={{ opacity: isVisible ? 1 : 0, transition: `opacity 0.6s ease ${i * 25}ms` }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className={`w-20 h-px bg-saffron/30 mx-auto mt-16 mb-10 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />

        {/* Jai Hind */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p
            className="font-heading font-bold text-saffron"
            style={{ fontSize: 'clamp(24px, 4vw, 40px)', letterSpacing: '0.1em' }}
          >
            जय हिन्द
          </p>
          <p className="text-white/35 text-caption mt-2 tracking-widest uppercase">Jai Hind</p>
        </div>

      </div>

      {/* Tricolour bar */}
      <div className="flex h-1" aria-hidden="true">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white/80" />
        <div className="flex-1" style={{ backgroundColor: '#138808' }} />
      </div>
    </section>
  )
}
