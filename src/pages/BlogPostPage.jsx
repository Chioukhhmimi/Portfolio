import * as React from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SEO } from "@/components/SEO"
import { portfolio } from "@/data/portfolio"
import { ArrowRight, ExternalLink } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function BlogPostPage() {
  const { slug } = useParams()
  const post = portfolio.blogPosts.find(
    (p) => p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === slug
  )

  if (!post) {
    return (
      <>
        <SEO title="Post Not Found" noindex />
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 mt-4 inline-block">
              ← Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const relatedPosts = portfolio.blogPosts.filter((p) => p.id !== post.id).slice(0, 2)

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        url={`/blog/${slug}`}
        type="article"
      />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white pt-24 pb-16"
      >
        <article className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div {...fadeUp}>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              ← Back to Home
            </Link>
          </motion.div>

          <motion.div {...fadeUp} className="mt-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mb-4">
              {post.tag}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-gray-400 mt-3">{post.readTime}</p>
          </motion.div>

          <motion.div {...fadeUp} className="mt-10">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {post.description}
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-8 py-4 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Read Full Article on Medium
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-xs text-gray-400 mt-4">
              Published on Medium · {post.readTime}
            </p>
          </motion.div>

          {relatedPosts.length > 0 && (
            <motion.section {...fadeUp} className="mt-24 border-t border-gray-100 pt-16">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">More Writing</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                    className="block rounded-2xl border border-gray-100 p-6 hover:bg-gray-50 transition-colors"
                  >
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mb-3">
                      {related.tag}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {related.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-900 mt-4 hover:underline">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </article>
      </motion.main>
      <Footer />
    </>
  )
}

export default BlogPostPage
