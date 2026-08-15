'use client'

import { forwardRef, type MouseEvent, type KeyboardEvent, type CSSProperties } from 'react'

const XIcon = () => (
  <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export interface ChipProps {
  variant?: 'default' | 'selected' | 'outline' | 'category'
  size?: 'sm' | 'default'
  removable?: boolean
  onRemove?: () => void
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  disabled?: boolean
  style?: CSSProperties
  className?: string
  'aria-label'?: string
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ variant = 'default', size = 'sm', removable, onRemove, children, onClick, disabled, style }, ref) => {

    const base: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      borderRadius: '999px',
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background 0.15s, border-color 0.15s, color 0.15s',
      border: '1.5px solid',
      outline: 'none',
      whiteSpace: 'nowrap',
      fontSize: size === 'sm' ? '0.75rem' : '0.8125rem',
      padding: size === 'sm' ? '4px 12px' : '6px 16px',
    }

    const variantStyles: Record<string, CSSProperties> = {
      default:  { background: '#FDFDFB', color: '#1A1A1A', borderColor: '#E5E5E0' },
      selected: { background: '#FF9933', color: '#fff',    borderColor: '#FF9933' },
      outline:  { background: 'transparent', color: '#1A1A1A', borderColor: '#E5E5E0' },
      category: { background: 'rgba(255,153,51,0.1)', color: '#E67E22', borderColor: 'rgba(255,153,51,0.3)' },
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if ((e.key === 'Enter' || e.key === ' ') && onClick) {
        e.preventDefault()
        onClick(e as unknown as MouseEvent<HTMLButtonElement>)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        style={{ ...base, ...variantStyles[variant], ...style }}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e) => {
          if (disabled) return
          if (variant === 'default' || variant === 'outline') {
            e.currentTarget.style.background = '#FF9933'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.borderColor = '#FF9933'
          } else if (variant === 'selected') {
            e.currentTarget.style.background = '#E67E22'
          }
        }}
        onMouseLeave={(e) => {
          if (disabled) return
          const vs = variantStyles[variant]
          e.currentTarget.style.background = vs.background as string
          e.currentTarget.style.color = vs.color as string
          e.currentTarget.style.borderColor = vs.borderColor as string
        }}
      >
        {children}
        {removable && onRemove && (
          <span
            role="button"
            tabIndex={-1}
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', cursor: 'pointer', marginLeft: '-2px' }}
            aria-label="Remove filter"
          >
            <XIcon />
          </span>
        )}
      </button>
    )
  },
)

Chip.displayName = 'Chip'

export interface FilterChipGroupProps {
  options: Array<{ value: string; label: string; count?: number }>
  selected: string[]
  onChange: (selected: string[]) => void
  variant?: 'default' | 'category'
  allowMultiple?: boolean
  className?: string
}

export function FilterChipGroup({ options, selected, onChange, variant = 'default', allowMultiple = true }: FilterChipGroupProps) {
  const handleToggle = (value: string) => {
    const next = allowMultiple
      ? selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]
      : selected.includes(value) ? [] : [value]
    onChange(next)
  }

  return (
    <div
      role="group"
      aria-label="Filter by category"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
    >
      {options.map(opt => (
        <Chip
          key={opt.value}
          variant={selected.includes(opt.value) ? 'selected' : variant}
          onClick={() => handleToggle(opt.value)}
          size="sm"
        >
          {opt.label}
          {opt.count !== undefined && (
            <span style={{
              background: selected.includes(opt.value) ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)',
              borderRadius: '999px',
              padding: '1px 6px',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}>
              {opt.count}
            </span>
          )}
        </Chip>
      ))}
    </div>
  )
}
