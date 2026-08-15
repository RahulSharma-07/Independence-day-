'use client'

import { useState, useMemo, useCallback } from 'react'
import { SearchInput, FilterChipGroup, FighterCard, FighterCardSkeleton, Modal } from '@/components/ui'
import { debounce } from '@/lib/utils'
import fightersData from '@/data/fighters.json'
import categoriesData from '@/data/categories.json'

interface Fighter {
  slug: string
  name: string
  years: string
  category: string
  categoryId: string
  tagline: string
  bio: string
  region: string
  era: string
  imageUrl: string | null
  imageAttribution: string | null
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Revolutionaries & Armed Resistance': '#E67E22',
    'Indian National Congress & Mass Movements': '#138808',
    'Women Freedom Fighters': '#D32F2F',
    'Revolt of 1857': '#6D4C41',
    'Tribal & Regional Leaders': '#1565C0',
    'Indian National Army': '#BF360C',
    'Other Important Figures': '#6A1B9A',
  }
  return colors[category] || '#000080'
}

export function FightersSection() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null)
  const [isLoading] = useState(false)

  const debouncedSearch = useCallback(
    debounce((value: string) => setDebouncedQuery(value), 300),
    [],
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  const categoryOptions = categoriesData.categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
    count: fightersData.fighters.filter((f) => f.categoryId === cat.id).length,
  }))

  const filteredFighters = useMemo(() => {
    return fightersData.fighters.filter((fighter) => {
      const matchesSearch =
        debouncedQuery === '' ||
        fighter.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        fighter.region.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        fighter.tagline.toLowerCase().includes(debouncedQuery.toLowerCase())

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(fighter.categoryId)

      return matchesSearch && matchesCategory
    })
  }, [debouncedQuery, selectedCategories])

  const color = selectedFighter ? getCategoryColor(selectedFighter.category) : '#000080'

  return (
    <section id="fighters" className="section bg-white" aria-labelledby="fighters-heading">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="text-caption text-saffron font-medium uppercase tracking-widest" style={{ marginBottom: '0.75rem' }}>
            The Archive
          </p>
          <h2
            id="fighters-heading"
            className="font-heading font-bold text-text-primary"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', textAlign: 'center', marginBottom: '1.25rem' }}
          >
            100 Freedom Fighters
          </h2>
          <p style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', color: '#5A5A5A', fontSize: '1rem', lineHeight: '1.7' }}>
            Beyond the famous ten. Revolutionaries, tribal leaders, INA soldiers, women who broke
            every barrier — every path to freedom, every sacrifice.
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{
          background: '#FDFDFB',
          border: '1.5px solid #E5E5E0',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <SearchInput
            placeholder="Search by name, region, or movement…"
            value={query}
            onChange={handleSearchChange}
            aria-label="Search freedom fighters"
          />
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#5A5A5A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              Filter by category
            </p>
            <FilterChipGroup
              options={categoryOptions}
              selected={selectedCategories}
              onChange={setSelectedCategories}
              variant="default"
              allowMultiple
            />
          </div>
        </div>

        {/* Result count + clear */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <p style={{ fontSize: '0.8rem', color: '#5A5A5A' }} aria-live="polite" aria-atomic="true">
            {filteredFighters.length === fightersData.fighters.length
              ? `Showing all ${fightersData.fighters.length} fighters`
              : `${filteredFighters.length} of ${fightersData.fighters.length} fighters`}
          </p>
          {(selectedCategories.length > 0 || debouncedQuery) && (
            <button
              style={{ fontSize: '0.8rem', color: '#000080', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onClick={() => { setSelectedCategories([]); setQuery(''); setDebouncedQuery('') }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="gallery-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <FighterCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredFighters.length === 0 ? (
          <div className="text-center py-24" role="status">
            <p className="text-xl font-heading text-text-primary mb-2">No fighters found</p>
            <p className="text-text-secondary">Try a different search term or remove some filters.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredFighters.map((fighter) => (
              <FighterCard
                key={fighter.slug}
                name={fighter.name}
                years={fighter.years}
                category={fighter.category}
                tagline={fighter.tagline}
                imageUrl={fighter.imageUrl ?? undefined}
                imageAlt={`Portrait placeholder for ${fighter.name}`}
                onClick={() => setSelectedFighter(fighter as Fighter)}
              />
            ))}
          </div>
        )}

        {/* Dataset complete note */}
        <p className="text-center text-caption text-text-secondary mt-8 italic">
          Showing {fightersData.fighters.length} freedom fighters across 7 categories.
        </p>
      </div>

      {/* Fighter detail modal */}
      {selectedFighter && (
        <Modal
          isOpen={!!selectedFighter}
          onClose={() => setSelectedFighter(null)}
          title={selectedFighter.name}
          size="lg"
        >
          <div className="space-y-5">
            {/* Avatar placeholder */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-heading font-bold mx-auto"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            >
              {selectedFighter.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
            </div>

            {/* Meta */}
            <div className="text-center space-y-1">
              <p className="text-text-secondary text-caption font-medium">{selectedFighter.years}</p>
              <span
                className="inline-block px-3 py-1 rounded-full text-caption-sm font-medium"
                style={{ backgroundColor: `${color}18`, color }}
              >
                {selectedFighter.category}
              </span>
            </div>

            {/* Quote / tagline */}
            <blockquote className="border-l-4 border-saffron pl-4 py-1">
              <p className="font-quote italic text-text-primary text-lg leading-relaxed">
                "{selectedFighter.tagline}"
              </p>
            </blockquote>

            {/* Bio */}
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-2 text-sm uppercase tracking-wide">
                Biography
              </h4>
              <p className="text-text-secondary leading-relaxed text-sm">{selectedFighter.bio}</p>
            </div>

            {/* Region & Era */}
            <div className="flex gap-6 pt-2 border-t border-border">
              <div>
                <span className="text-caption text-text-secondary block mb-0.5">Region</span>
                <span className="text-sm font-medium text-text-primary">{selectedFighter.region}</span>
              </div>
              <div>
                <span className="text-caption text-text-secondary block mb-0.5">Active Era</span>
                <span className="text-sm font-medium text-text-primary">{selectedFighter.era}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}
