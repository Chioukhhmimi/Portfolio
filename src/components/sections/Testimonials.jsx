import * as React from "react"
import { motion } from "framer-motion"
import { testimonials } from "@/data/portfolio"
import { cn } from "@/lib/utils"

function QuoteIcon({ className }) {
  return (
    <svg
      className={cn("w-6 h-6 text-gray-300", className)}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.748-9.193 9-9.391V5a1 1 0 011-1h3a1 1 0 011 1v6.609c0 1.153-.278 2.195-.757 3.078-1.192 2.203-3.79 2.942-5.243 2.942-.523 0-1.017-.104-1.483-.313v2.575H9.539v2.573c0 1.153-.278 2.195-.757 3.078-1.192 2.203-3.79 2.942-5.243 2.942-.523 0-1.017-.104-1.483-.313V21h10.461zM19.017 21v-7.391c0-5.704 3.748-9.193 9-9.391V5a1 1 0 011-1h3a1 1 0 011 1v6.609c0 1.153-.278 2.195-.757 3.078-1.192 2.203-3.79 2.942-5.243 2.942-.523 0-1.017-.104-1.483-.313v2.575h-3v2.573c0 1.153-.278 2.195-.757 3.078-1.192 2.203-3.79 2.942-5.243 2.942-.523 0-1.017-.104-1.483-.313V21h17z" />
    </svg>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
}

function TestimonialCard({ item, index }) {
  const [expanded, setExpanded] = React.useState(false)
  const paragraphs = item.quote.split("\n\n")
  const isLong = paragraphs.length > 4
  const displayParagraphs = expanded ? paragraphs : paragraphs.slice(0, 4)

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm"
    >
      <div className="mb-6">
        <QuoteIcon />
      </div>

      <div className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed">
        {displayParagraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="font-semibold text-gray-900">{item.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">{item.role}</span>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-500">{item.company}</span>
        </div>
        <p className="text-xs text-blue-500 mt-2 font-medium">
          {item.platform} Recommendation
        </p>
      </div>
    </motion.article>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Clients Say</h2>
          <p className="text-sm text-gray-500 text-center max-w-xl mx-auto mt-4">
            A few words from founders and collaborators I've worked closely with across product design engagements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials