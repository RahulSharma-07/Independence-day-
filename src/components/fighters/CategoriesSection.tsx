'use client'

import categoriesData from '@/data/categories.json'
import fightersData from '@/data/fighters.json'

const ICON_MAP: Record<string, React.ReactNode> = {
  flame: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M12 2C9 5 7 8 9 11c-2-1-3-3-2-5C4 9 3 13 5 16c1 2 3 4 7 4s7-3 7-6c0-2-1-4-3-5 0 2-1 4-3 4 2-3 1-7-1-11z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
    </svg>
  ),
  sword: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M6.92 5L3 8.92l2.83 2.83-1.06 1.06-2.12-2.12L1 12.3 4.7 16l1.06-1.06-2.12-2.12 1.06-1.06 2.83 2.83L11.1 11l5.51 5.51c.31.31.82.31 1.13 0l1.41-1.41c.31-.31.31-.82 0-1.13L13.64 8.46 19 3l-2-2-5.46 5.36L7.95 2.77 6.92 5z" />
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
    </svg>
  ),
  'book-open': (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
    </svg>
  ),
}

export function CategoriesSection() {
  const categories = categoriesData.categories

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('fighters')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="categories"
      className="section bg-white"
      aria-labelledby="categories-heading"
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="text-caption text-saffron font-medium uppercase tracking-widest" style={{ marginBottom: '0.75rem' }}>
            Seven Paths
          </p>
          <h2
            id="categories-heading"
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', textAlign: 'center', marginBottom: '1.25rem' }}
          >
            Many Paths, One Dream
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', color: '#5A5A5A', fontSize: '1rem', lineHeight: '1.7' }}>
            Freedom wasn't won by one kind of person or one kind of action. It took
            revolutionaries, lawyers, poets, tribal leaders, and ordinary people — all fighting
            in their own way.
          </p>
        </div>

        {/* Grid — 1 col → 2 col → 3 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const count = fightersData.fighters.filter((f) => f.categoryId === cat.id).length

            return (
              <a
                key={cat.id}
                href="#fighters"
                onClick={handleClick}
                className="group bg-off-white rounded-radius-md border border-border hover:border-transparent hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 p-5 flex flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                aria-label={`${cat.name}${count > 0 ? ` — ${count} profile${count !== 1 ? 's' : ''}` : ''}`}
              >
                {/* Icon box */}
                <div
                  className="w-11 h-11 rounded-radius-md flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                >
                  {ICON_MAP[cat.icon] ?? null}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-text-primary text-base leading-snug mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{cat.description}</p>
                </div>

                {/* Count badge */}
                {count > 0 && (
                  <div
                    className="self-start text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    {count} profile{count !== 1 ? 's' : ''}
                  </div>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
