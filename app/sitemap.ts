import type { MetadataRoute } from "next"
import { portfolio } from "@/data/portfolio"

const BASE_URL = "https://hmimi.design"

const projectIds = ["dadycar", "focuscare", "shihany", "resaglob"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const projectPages: MetadataRoute.Sitemap = projectIds.map((id) => ({
    url: `${BASE_URL}/projects/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const blogPages: MetadataRoute.Sitemap = (portfolio.blogPosts || []).map((post: any) => {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }
  })

  return [...staticPages, ...projectPages, ...blogPages]
}
