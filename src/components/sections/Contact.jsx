import * as React from "react"
import { motion } from "framer-motion"
import { GitBranch, Link, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolio } from "@/data/portfolio"

const socialLinks = [
  { name: "GitHub", href: portfolio.social.github, icon: GitBranch },
  { name: "LinkedIn", href: portfolio.social.linkedin, icon: Link },
  { name: "Email", href: portfolio.social.email, icon: Mail },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" asChild>
            <a href={portfolio.social.email}>Get In Touch</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Icon className="h-5 w-5 text-gray-600" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}