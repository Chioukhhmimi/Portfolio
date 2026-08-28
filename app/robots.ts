import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin/",
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        allow: "/",
      },
      {
        userAgent: ["ClaudeBot", "anthropic-ai"],
        allow: "/",
      },
      {
        userAgent: ["PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: "https://hmimi.design/sitemap.xml",
  }
}
