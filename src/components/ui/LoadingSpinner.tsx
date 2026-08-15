'use client'

import { cn } from '@/lib/utils'

export interface LoadingSpinnerProps {
  size?: 'sm' | 'default' | 'lg'
  className?: string
  ariaLabel?: string
}

export function LoadingSpinner({
  size = 'default',
  className,
  ariaLabel = 'Loading',
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <svg
      className={cn('animate-spin text-saffron', sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label={ariaLabel}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string
  height?: string
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-radius-md',
  }

  return (
    <div
      className={cn('animate-pulse bg-saffron/10', variants[variant], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function FighterCardSkeleton() {
  return (
    <div className="bg-white rounded-radius-md shadow-card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-saffron/10" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton variant="text" width="40%" className="h-10" />
        <Skeleton variant="text" width="60%" />
      </div>
      <div className="gallery-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <FighterCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
