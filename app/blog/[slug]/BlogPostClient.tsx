'use client'
import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Tag, ExternalLink } from "lucide-react"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface BlogPost {
  _id: string
  title: string
  slug: string
  mediumUrl?: string
  excerpt?: string
  content?: string
  coverImage?: string
  readingTime?: number
  tags?: string[]
  status: string
  featured: boolean
  publishedAt?: string
}

export function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = React.useState<BlogPost | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [notFound, setNotFound] = React.useState(false)

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${baseURL}/blog/slug/${slug}`)
        if (!res.ok) {
          setNotFound(true)
          return
        }
        const { data } = await res.json()
        if (!data) {
          setNotFound(true)
          return
        }
        setPost(data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded mb-8" />
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-12" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
          <p className="text-sm text-gray-500 mb-4">This post may have been moved or is no longer available.</p>
          <Link href="/#blog" className="text-sm text-gray-500 hover:text-gray-900 inline-block">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <article className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {post.readingTime && (
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {post.readingTime} min read
              </span>
            )}
            {publishDate && (
              <span className="text-xs text-gray-400">{publishDate}</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>
          )}

          {post.mediumUrl && (
            <a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 mt-4 transition-colors"
            >
              Originally published on Medium
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </header>

        {post.coverImage && (
          <div className="mb-10 -mx-6 md:-mx-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {post.content && (
          <div
            className="medium-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {post.mediumUrl && (
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center">
            <p className="text-sm text-gray-500 mb-4">
              Enjoyed this article? Read the original on Medium for the full experience.
            </p>
            <a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Read on Medium
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        <div className="mt-16 border-t border-gray-100 pt-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-gray-600">HC</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Hmimi Chioukh</p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                AI Product Designer building scalable SaaS platforms. Focused on clarity, speed, and operational UX.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
