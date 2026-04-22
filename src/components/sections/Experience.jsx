import * as React from "react"
import { motion } from "framer-motion"

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Resume</h2>
        </motion.div>
      </div>
    </section>
  )
}