import { Metadata } from "next"
import { HomeClient } from "@/components/sections/HomeClient"
import { StructuredData } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Hmimi Chioukh | AI Product Designer — SaaS, UI/UX",
  description: "Hmimi Chioukh — AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.",
  keywords: ['AI Product Designer', 'UI/UX Design', 'SaaS Design', 'Product Designer Portfolio', 'Figma', 'React', 'User Research', 'Design Systems', 'Hmimi Chioukh'],
  openGraph: {
    title: "Hmimi Chioukh — AI Product Designer",
    description: "AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.",
    url: "https://hmimi.design",
    siteName: "Hmimi Chioukh — Portfolio",
    images: [
      {
        url: "https://hmimi.design/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hmimi Chioukh — AI Product Designer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hmimi Chioukh — AI Product Designer",
    description: "AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.",
    images: ["https://hmimi.design/og-image.png"],
  },
  authors: [{ name: "Hmimi Chioukh" }],
  alternates: {
    canonical: "https://hmimi.design",
  },
}

export default function Home() {
  return (
    <>
      <StructuredData page="home" />
      <HomeClient />
    </>
  )
}
