import type { Metadata } from "next"
import { BlogPostClient } from "./BlogPostClient"
import { StructuredData } from "@/components/seo/StructuredData"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

async function findPost(slug: string) {
  try {
    const res = await fetch(`${baseURL}/blog`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const { data } = await res.json()
    return data?.find(
      (p: any) => p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === slug
    ) || null
  } catch {
    return null
  }
}

async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${baseURL}/blog`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const { data } = await res.json()
    return (data || [])
      .filter((p: any) => p.status === "published")
      .map((p: any) =>
        p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      )
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await findPost(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | Hmimi Chioukh`,
    description: `${post.excerpt || post.description || ""}`.slice(0, 160),
    keywords: [post.title, post.tags?.join(", ") || "Blog", "Product Design", "UX", "Hmimi Chioukh"],
    openGraph: {
      title: `${post.title} | Hmimi Chioukh`,
      description: post.excerpt || post.description,
      url: `https://hmimi.design/blog/${slug}`,
      type: "article",
      authors: ["Hmimi Chioukh"],
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: `${post.title} — Hmimi Chioukh` }]
        : [{ url: "https://hmimi.design/og-image.png", width: 1200, height: 630, alt: `${post.title} — Hmimi Chioukh` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Hmimi Chioukh`,
      description: post.excerpt || post.description,
      images: post.coverImage ? [post.coverImage] : ["https://hmimi.design/og-image.png"],
    },
    alternates: {
      canonical: `https://hmimi.design/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await findPost(slug)

  return (
    <>
      <StructuredData
        page="blog"
        post={
          post
            ? {
                title: post.title,
                description: post.excerpt || post.description || "",
                url: `/blog/${slug}`,
                image: post.coverImage || "https://hmimi.design/og-image.png",
                date: post.publishedAt,
              }
            : undefined
        }
      />
      <BlogPostClient slug={slug} initialPost={post} />
    </>
  )
}
