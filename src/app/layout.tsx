import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-quote',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Azadi 79 — An Interactive Journey Through India\'s Freedom Struggle',
  description: 'Experience the story of India\'s independence through an interactive journey, 100 freedom fighter profiles, and an AI guide. 1857–1947.',
  keywords: ['India independence', 'freedom fighters', 'Indian history', '1947', 'Azadi'],
  authors: [{ name: 'Azadi 79 Team' }],
  openGraph: {
    title: 'Azadi 79 — India\'s Freedom Struggle Interactive Journey',
    description: 'Experience how India won independence. 100 freedom fighters, interactive timeline, AI guide.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Azadi 79',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azadi 79 — India\'s Freedom Struggle',
    description: 'An interactive journey through 1857–1947. 100 freedom fighters. AI guide.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#FF9933',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontVariables = `${inter.variable} ${poppins.variable} ${playfair.variable}`

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}