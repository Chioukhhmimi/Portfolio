import type { Metadata } from 'next'
import { Funnel_Display, Inter } from 'next/font/google'
import './globals.css'

const funnelDisplay = Funnel_Display({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hmimi Chioukh | AI Product Designer — SaaS, UI/UX, AI',
  description: 'Hmimi Chioukh — AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.',
  metadataBase: new URL('https://hmimi.design'),
  openGraph: {
    type: 'website',
    title: 'Hmimi Chioukh — AI Product Designer',
    description: 'AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.',
    url: 'https://hmimi.design',
    siteName: 'Hmimi Chioukh — Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hmimi Chioukh — AI Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hmimi Chioukh — AI Product Designer',
    description: 'AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Hmimi Chioukh' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${funnelDisplay.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>{children}</body>
    </html>
  )
}
