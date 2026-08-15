import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        'saffron-dark': '#E67E22',
        white: '#FFFFFF',
        'off-white': '#FDFDFB',
        green: '#138808',
        'green-dark': '#0D6606',
        navy: '#000080',
        'navy-light': '#1A1A6E',
        'text-primary': '#1A1A1A',
        'text-secondary': '#5A5A5A',
        border: '#E5E5E0',
        overlay: 'rgba(0,0,0,0.6)',
        error: '#D32F2F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        quote: ['var(--font-quote)', 'Georgia', 'serif'],
        button: ['var(--font-button)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['32px', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-xl': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'card-title': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'card-title-sm': ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['13px', { lineHeight: '1.4', fontWeight: '500' }],
        'caption-sm': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
        quote: ['24px', { lineHeight: '1.5', fontWeight: '500' }],
        'quote-sm': ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        button: ['15px', { lineHeight: '1', fontWeight: '600' }],
        'button-sm': ['14px', { lineHeight: '1', fontWeight: '600' }],
      },
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '16px',
        'space-4': '24px',
        'space-5': '32px',
        'space-6': '48px',
        'space-7': '64px',
        'space-8': '96px',
      },
      borderRadius: {
        'radius-sm': '6px',
        'radius-md': '12px',
        'radius-lg': '20px',
        'radius-full': '999px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        modal: '0 16px 48px rgba(0,0,0,0.24)',
        focus: '0 0 0 3px rgba(0,0,128,0.1)',
      },
      maxWidth: {
        content: '1280px',
        modal: '560px',
      },
      screens: {
        mobile: '640px',
        tablet: '1024px',
        desktop: '1025px',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
        'gradient-chakra-glow': 'radial-gradient(circle, rgba(0,0,128,0.15) 0%, transparent 70%)',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
    },
  },
  plugins: [],
}

export default config