import type { Metadata } from 'next'
import { Funnel_Display, Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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
  metadataBase: new URL('https://hmimi.design'),
  title: {
    default: 'Hmimi Chioukh | AI Product Designer — SaaS, UI/UX',
    template: '%s | Hmimi Chioukh',
  },
  description: 'Hmimi Chioukh — AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.',
  keywords: ['AI Product Designer', 'UI/UX Design', 'SaaS Design', 'Product Designer', 'Figma', 'React', 'User Research', 'Design Systems'],
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'geo.region': 'DZ',
    'geo.placename': 'Algeria',
  },
  openGraph: {
    images: [
      {
        url: 'https://hmimi.design/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hmimi Chioukh — AI Product Designer',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${funnelDisplay.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
