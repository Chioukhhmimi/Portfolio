import { Metadata } from "next"
import { HomeClient } from "@/components/sections/HomeClient"
import { StructuredData } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "AI Product Designer | Hmimi Chioukh — SaaS, UI/UX Design Portfolio",
  description: "AI Product Designer specializing in SaaS platforms, UI/UX design, and user research. View case studies from DadyCar, FocusCare, Shihany, and Resaglob. Available for freelance and full-time roles.",
  keywords: [
    'AI Product Designer', 'Product Designer Portfolio', 'UI/UX Designer',
    'SaaS Product Design', 'User Research', 'Design Systems', 'Figma Designer',
    'React Developer', 'Product Designer Algeria', 'Freelance Product Designer',
    'AI UX Design', 'SaaS UI/UX', 'Hmimi Chioukh'
  ],
  openGraph: {
    title: "AI Product Designer | Hmimi Chioukh — SaaS & UI/UX Portfolio",
    description: "AI Product Designer specializing in scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.",
    url: "https://hmimi.design",
    siteName: "Hmimi Chioukh — AI Product Designer",
    images: [
      {
        url: "https://hmimi.design/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hmimi Chioukh — AI Product Designer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Designer | Hmimi Chioukh — SaaS & UI/UX Portfolio",
    description: "AI Product Designer specializing in scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.",
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
