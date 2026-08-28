import type { Metadata } from "next"
import { ResourcesClient } from "./ResourcesClient"
import { StructuredData } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Resources | Hmimi Chioukh",
  description: "Free Figma community files and tools Hmimi Chioukh uses daily for product design and development.",
  keywords: ['Figma Resources', 'Design Tools', 'Free Figma Files', 'Product Design Tools', 'Figma Community', 'Design Resources'],
  openGraph: {
    title: "Resources | Hmimi Chioukh",
    description: "Free Figma community files and tools I use daily for product design and development.",
    url: "https://hmimi.design/resources",
    images: [
      {
        url: "https://hmimi.design/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resources — Hmimi Chioukh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Hmimi Chioukh",
    description: "Free Figma community files and tools I use daily for product design and development.",
    images: ["https://hmimi.design/og-image.png"],
  },
  alternates: {
    canonical: "https://hmimi.design/resources",
  },
}

export default function ResourcesPage() {
  return (
    <>
      <StructuredData page="resources" />
      <ResourcesClient />
    </>
  )
}
