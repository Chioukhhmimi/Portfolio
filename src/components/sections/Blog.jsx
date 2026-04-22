import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { portfolio } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const badgeColorMap = {
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  teal: "bg-teal-50 text-teal-600",
  default: "bg-gray-100 text-gray-600",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function Blog() {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Writing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Thoughts on Design & Product</h2>
          <p className="text-sm text-gray-500 text-center max-w-xl mx-auto mt-4">
            Exploring ideas around UX, product thinking, and building better digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0"
        >
          {portfolio.blogPosts.map((post) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.07)" }}
              transition={{ duration: 0.2 }}
              className="block snap-center"
            >
              <Card className="h-full bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <Badge className={cn("rounded-full", badgeColorMap[post.tagColor] || badgeColorMap.default)}>
                    {post.tag}
                  </Badge>
                  <h3 className="text-base font-semibold text-gray-900 mt-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                    <span className="text-xs font-medium text-gray-900 hover:underline">
                      Read on Medium →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}