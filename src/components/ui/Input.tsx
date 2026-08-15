'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={18}
    height={18}
    fill="none"
    stroke="#5A5A5A"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ style, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`
    const errorId = `${inputId}-error`
    const hintId  = `${inputId}-hint`

    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#1A1A1A', marginBottom: '6px' }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          {leftIcon && (
            <div
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '8px',
              border: error ? '1.5px solid #D32F2F' : '1.5px solid #E5E5E0',
              background: '#fff',
              color: '#1A1A1A',
              fontSize: '0.9375rem',
              paddingLeft: leftIcon ? '44px' : '16px',
              paddingRight: rightIcon ? '44px' : '16px',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              boxSizing: 'border-box',
              ...style,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#000080'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,0,128,0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? '#D32F2F' : '#E5E5E0'
              e.currentTarget.style.boxShadow = 'none'
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            {...props}
          />
          {rightIcon && (
            <div
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} role="alert" style={{ marginTop: '6px', fontSize: '0.8rem', color: '#D32F2F' }}>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} style={{ marginTop: '6px', fontSize: '0.8rem', color: '#5A5A5A' }}>
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export const SearchInput = forwardRef<HTMLInputElement, Omit<InputProps, 'leftIcon'>>(
  (props, ref) => <Input ref={ref} leftIcon={<SearchIcon />} {...props} />,
)

SearchInput.displayName = 'SearchInput'
