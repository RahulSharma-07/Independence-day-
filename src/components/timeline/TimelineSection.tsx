'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  year: string
  title: string
  what: string
  who: string
  why: string
  category: 'uprising' | 'resistance' | 'movement' | 'independence'
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1757',
    title: 'Battle of Plassey',
    what: 'The British East India Company defeated the Nawab of Bengal, marking the beginning of British political control over India.',
    who: 'Robert Clive (British) vs. Siraj ud-Daulah (Bengal)',
    why: 'The first major territorial foothold for the British — a turning point from trade to empire.',
    category: 'uprising',
  },
  {
    year: '1857',
    title: 'The First War of Independence',
    what: 'A major uprising against British rule by sepoys of the Bengal Army, spreading to civilians across northern and central India.',
    who: 'Rani Lakshmibai, Mangal Pandey, Tantia Tope, Bahadur Shah Zafar',
    why: 'Proved that resistance was possible; forced the British Crown to dissolve the East India Company.',
    category: 'uprising',
  },
  {
    year: '1885',
    title: 'Indian National Congress Founded',
    what: 'The first nationwide political organisation of Indians, providing a platform for articulating demands for self-governance.',
    who: 'A.O. Hume, Dadabhai Naoroji, Bal Gangadhar Tilak',
    why: 'Created a unified political voice for Indians for the first time — the seed of the independence movement.',
    category: 'resistance',
  },
  {
    year: '1905',
    title: 'Partition of Bengal & Swadeshi',
    what: 'Lord Curzon partitioned Bengal along religious lines. Indians responded with the Swadeshi movement — boycotting British goods.',
    who: 'Bal Gangadhar Tilak, Bipin Chandra Pal, Lala Lajpat Rai, Rabindranath Tagore',
    why: 'Demonstrated the power of economic resistance and proved ordinary Indians could challenge colonial policy.',
    category: 'resistance',
  },
  {
    year: '1919',
    title: 'Jallianwala Bagh Massacre',
    what: 'British troops opened fire on a peaceful gathering in Amritsar, killing over 1,000 unarmed civilians.',
    who: 'General Reginald Dyer ordered the massacre; Udham Singh later avenged it in London.',
    why: 'Turned millions of moderate Indians into freedom fighters. Gandhi called it "a wrong done to humanity."',
    category: 'uprising',
  },
  {
    year: '1920',
    title: 'Non-Cooperation Movement',
    what: 'Gandhi launched a nationwide campaign calling on Indians to refuse cooperation with British rule — boycott courts, schools, elections.',
    who: 'Mahatma Gandhi with mass participation across India',
    why: 'The first mass movement of ordinary Indians — changed the freedom struggle from elite to grassroots.',
    category: 'movement',
  },
  {
    year: '1930',
    title: 'Dandi March — Salt Satyagraha',
    what: 'Gandhi led a 240-mile march to the sea to make salt — defying the British Salt Act — sparking civil disobedience across India.',
    who: 'Mahatma Gandhi with 78 followers, later joined by millions',
    why: "Demonstrated that the simplest act of defiance could shake an empire. Brought India's struggle to world attention.",
    category: 'movement',
  },
  {
    year: '1942',
    title: 'Quit India Movement',
    what: 'Gandhi issued the call for immediate British withdrawal: "Do or Die." Mass arrests followed, but protests swept the nation.',
    who: 'Gandhi, Nehru, Patel arrested. Matangini Hazra, Aruna Asaf Ali led in their absence.',
    why: 'The final and largest civil disobedience campaign — made it clear to Britain that holding India was no longer feasible.',
    category: 'movement',
  },
  {
    year: '1943',
    title: 'Indian National Army Campaigns',
    what: 'Subhas Chandra Bose led the INA from Southeast Asia, fighting to drive the British out from the east.',
    who: 'Netaji Subhas Chandra Bose, Captain Lakshmi Sahgal, Colonel Prem Sahgal',
    why: 'Shook the loyalty of Indian soldiers in the British Indian Army; the 1945 INA trials accelerated British departure.',
    category: 'resistance',
  },
  {
    year: '1947',
    title: 'Independence',
    what: 'At the stroke of midnight on 15 August, India became free. Nehru spoke to a nation awake "when the world sleeps."',
    who: 'Every person who sacrificed — in a courtroom, a prison cell, a forest, a march, or a battle.',
    why: 'The culmination of 90 years of struggle — bought at immeasurable cost.',
    category: 'independence',
  },
]

const CATEGORY_CONFIG: Record<
  TimelineEvent['category'],
  { color: string; label: string; bg: string; border: string }
> = {
  uprising:     { color: '#C62828', label: 'Uprising',      bg: '#C6282812', border: '#C6282830' },
  resistance:   { color: '#E65100', label: 'Resistance',    bg: '#E6510012', border: '#E6510030' },
  movement:     { color: '#1B5E20', label: 'Mass Movement', bg: '#1B5E2012', border: '#1B5E2030' },
  independence: { color: '#000080', label: 'Independence',  bg: '#00008012', border: '#00008030' },
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn(
      'w-4 h-4 flex-shrink-0 transition-transform duration-300',
      open ? 'rotate-180' : 'rotate-0',
    )}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="journey" className="section bg-[#FDFDFB]" aria-labelledby="timeline-heading">
      <div className="container">

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-caption text-saffron font-medium uppercase tracking-widest" style={{ marginBottom: '0.75rem' }}>
            1757 → 1947
          </p>
          <h2
            id="timeline-heading"
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', textAlign: 'center', marginBottom: '1.25rem' }}
          >
            The Road to Freedom
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', color: '#5A5A5A', fontSize: '1rem', lineHeight: '1.7' }}>
            Every milestone had a cause, a cost, and a consequence. Click any event to explore
            what happened, who made it happen, and why it mattered.
          </p>
        </div>

        {/* ── Zigzag Timeline ── */}
        {/*
          Layout (desktop):
            [left card]   [center spine + node]   [right card]
          Each row is a 3-column grid: col-1 (card left), col-2 (spine), col-3 (card right).
          Even indices → card in col-1, col-3 empty.
          Odd  indices → col-1 empty, card in col-3.
          On mobile everything collapses to a left-spine single-column list.
        */}
        <div className="relative max-w-5xl mx-auto">

          {/* ── Continuous vertical spine (desktop only) ── */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"
            aria-hidden="true"
          />

          {/* ── Mobile spine ── */}
          <div
            className="md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-border"
            aria-hidden="true"
          />

          <ol aria-label="Timeline of India's independence struggle" className="space-y-0">
            {TIMELINE_EVENTS.map((event, index) => {
              const isOpen   = activeIndex === index
              const isLeft   = index % 2 === 0   // card on the left half
              const cfg      = CATEGORY_CONFIG[event.category]
              const isLast   = index === TIMELINE_EVENTS.length - 1

              return (
                <li key={event.year} className={cn('relative', !isLast && 'pb-10')}>

                  {/* ════ DESKTOP layout ════ */}
                  <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:gap-0">

                    {/* ── Left slot ── */}
                    <div className={cn('pr-8', isLeft ? 'flex justify-end' : 'invisible pointer-events-none')}>
                      {isLeft && (
                        <EventCard
                          event={event}
                          cfg={cfg}
                          isOpen={isOpen}
                          align="right"
                          onClick={() => setActiveIndex(isOpen ? null : index)}
                        />
                      )}
                    </div>

                    {/* ── Center node ── */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setActiveIndex(isOpen ? null : index)}
                        className={cn(
                          'w-16 h-16 rounded-full flex items-center justify-center',
                          'font-heading font-bold text-white text-sm leading-none',
                          'shadow-card transition-all duration-200 z-10 relative',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy',
                          isOpen ? 'scale-110 shadow-card-hover' : 'hover:scale-105',
                        )}
                        style={{ backgroundColor: cfg.color }}
                        aria-label={`${event.year}: ${event.title}`}
                        aria-expanded={isOpen}
                      >
                        {event.year}
                      </button>
                    </div>

                    {/* ── Right slot ── */}
                    <div className={cn('pl-8', !isLeft ? 'flex justify-start' : 'invisible pointer-events-none')}>
                      {!isLeft && (
                        <EventCard
                          event={event}
                          cfg={cfg}
                          isOpen={isOpen}
                          align="left"
                          onClick={() => setActiveIndex(isOpen ? null : index)}
                        />
                      )}
                    </div>
                  </div>

                  {/* ════ MOBILE layout ════ */}
                  <div className="flex gap-4 md:hidden items-start">
                    {/* Node */}
                    <div className="flex-shrink-0 z-10">
                      <button
                        onClick={() => setActiveIndex(isOpen ? null : index)}
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center',
                          'font-heading font-bold text-white text-[10px] leading-none',
                          'shadow-card transition-all duration-200',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy',
                          isOpen ? 'scale-110' : '',
                        )}
                        style={{ backgroundColor: cfg.color }}
                        aria-label={`${event.year}: ${event.title}`}
                        aria-expanded={isOpen}
                      >
                        {event.year.slice(-2)}
                      </button>
                    </div>
                    {/* Card */}
                    <div className="flex-1">
                      <EventCard
                        event={event}
                        cfg={cfg}
                        isOpen={isOpen}
                        align="left"
                        onClick={() => setActiveIndex(isOpen ? null : index)}
                      />
                    </div>
                  </div>

                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   EventCard — the collapsible card itself
───────────────────────────────────────────── */
function EventCard({
  event,
  cfg,
  isOpen,
  align,
  onClick,
}: {
  event: TimelineEvent
  cfg: { color: string; label: string; bg: string; border: string }
  isOpen: boolean
  align: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full max-w-[380px] text-left bg-white rounded-radius-md shadow-card border',
        'transition-all duration-200 overflow-hidden',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1',
        isOpen
          ? 'shadow-card-hover'
          : 'hover:shadow-card-hover',
        align === 'right' ? 'ml-auto' : 'mr-auto',
      )}
      style={{ borderColor: isOpen ? cfg.color + '60' : 'transparent' }}
      aria-expanded={isOpen}
    >
      {/* ── Always-visible header ── */}
      <div className={cn('flex items-start gap-3 px-4 py-4', align === 'right' ? 'flex-row-reverse text-right' : '')}>
        <div className="flex-1 min-w-0">
          {/* Category pill */}
          <span
            className="inline-block text-caption-sm font-semibold px-2.5 py-0.5 rounded-full mb-2"
            style={{ backgroundColor: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </span>
          <h3 className="font-heading font-semibold text-text-primary text-base leading-snug">
            {event.title}
          </h3>
          {/* Collapsed preview */}
          {!isOpen && (
            <p className="text-text-secondary text-sm mt-1 leading-relaxed line-clamp-2">
              {event.what}
            </p>
          )}
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {/* ── Expanded detail ── */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!isOpen}
      >
        <div
          className="border-t mx-4 pt-4 pb-4 space-y-3"
          style={{ borderColor: cfg.border }}
        >
          <DetailRow label="What happened" text={event.what} color={cfg.color} />
          <DetailRow label="Who"           text={event.who}  color={cfg.color} />
          <DetailRow label="Why it mattered" text={event.why} color={cfg.color} />
        </div>
      </div>
    </button>
  )
}

function DetailRow({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div className="flex gap-2.5 text-left">
      <div
        className="w-1 rounded-full flex-shrink-0 mt-1 self-stretch"
        style={{ backgroundColor: color, minHeight: '1rem' }}
        aria-hidden="true"
      />
      <div>
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-0.5">
          {label}
        </span>
        <p className="text-sm text-text-primary/80 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
