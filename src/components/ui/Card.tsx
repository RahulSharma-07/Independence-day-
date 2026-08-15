'use client'

import { forwardRef, type HTMLAttributes, useState } from 'react'
import { cn, getInitials } from '@/lib/utils'

/* ─── Base Card ─────────────────────────────────────── */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'fighter'
  hoverable?: boolean
  asChild?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-radius-md shadow-card transition-all duration-200',
        hoverable && 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
Card.displayName = 'Card'

/* ─── Fighter Card ──────────────────────────────────── */

export interface FighterCardProps {
  name: string
  years: string
  category: string
  tagline: string
  imageUrl?: string
  imageAlt?: string
  onClick?: () => void
  isKeyboardFocused?: boolean
}

export const FighterCard = ({
  name,
  years,
  category,
  tagline,
  imageUrl,
  imageAlt,
  onClick,
  isKeyboardFocused,
}: FighterCardProps) => {
  const [imgError, setImgError] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const initials = getInitials(name)
  const color = getCategoryColor(category)
  const showImage = !!imageUrl && !imgError

  return (
    <Card
      hoverable={!!onClick}
      className="overflow-hidden flex flex-col h-full"
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isKeyboardFocused}
    >
      {/* ── Photo / avatar ── */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        {showImage ? (
          <img
            src={imageUrl}
            alt={imageAlt || `Historical photograph of ${name}`}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          >
            <span
              className="text-white font-heading font-bold select-none"
              style={{ fontSize: '3.25rem', lineHeight: 1 }}
            >
              {initials}
            </span>
            <span className="text-white/60 text-xs font-medium px-4 text-center leading-tight">
              {name}
            </span>
          </div>
        )}

        {/* Category badge */}
        <span
          className="absolute bottom-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full"
          style={{
            backgroundColor: showImage ? 'rgba(0,0,0,0.58)' : `${color}50`,
            color: '#fff',
            backdropFilter: showImage ? 'blur(4px)' : 'none',
          }}
        >
          {category.split(' ')[0]}
        </span>
      </div>

      {/* ── Text body ── */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-heading font-semibold text-text-primary"
          style={{ fontSize: '1rem', lineHeight: 1.35, marginBottom: '0.2rem' }}
        >
          {name}
        </h3>
        <p
          className="text-text-secondary"
          style={{ fontSize: '0.75rem', lineHeight: 1.4, marginBottom: '0.5rem' }}
        >
          {years}
        </p>
        <p
          className="flex-1 text-text-primary/75"
          style={{ fontSize: '0.85rem', lineHeight: 1.55 }}
        >
          {tagline}
        </p>
      </div>
    </Card>
  )
}
FighterCard.displayName = 'FighterCard'

/* ─── Card Content helper ───────────────────────────── */

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-4', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

/* ─── Helpers ───────────────────────────────────────── */

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    'Revolutionaries & Armed Resistance':       '#E65100',
    'Indian National Congress & Mass Movements':'#1B5E20',
    'Women Freedom Fighters':                   '#B71C1C',
    'Revolt of 1857':                           '#4E342E',
    'Tribal & Regional Leaders':                '#0D47A1',
    'Indian National Army':                     '#BF360C',
    'Other Important Figures':                  '#4A148C',
  }
  return map[category] ?? '#000080'
}
