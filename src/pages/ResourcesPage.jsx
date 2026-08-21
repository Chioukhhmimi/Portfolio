import * as React from "react"
import { motion } from "framer-motion"
import { ExternalLink, BookOpen, Video, FileText, Code, Palette, Lightbulb } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SEO } from "@/components/SEO"

const resources = [
  {
    category: "Design Tools",
    icon: Palette,
    items: [
      { name: "Figma", description: "Collaborative interface design tool", url: "https://figma.com" },
      { name: "Adobe Creative Cloud", description: "Design and creative software suite", url: "https://adobe.com" },
      { name: "Framer", description: "Interactive design and prototyping", url: "https://framer.com" },
    ]
  },
  {
    category: "Learning",
    icon: BookOpen,
    items: [
      { name: "Nielsen Norman Group", description: "UX research and usability guidelines", url: "https://nngroup.com" },
      { name: "Laws of UX", description: "Collection of UX principles and laws", url: "https://lawsofux.com" },
      { name: "Refactoring UI", description: "Design tips and tricks for developers", url: "https://refactoringui.com" },
    ]
  },
  {
    category: "Development",
    icon: Code,
    items: [
      { name: "Tailwind CSS", description: "Utility-first CSS framework", url: "https://tailwindcss.com" },
      { name: "shadcn/ui", description: "Beautifully designed components", url: "https://ui.shadcn.com" },
      { name: "Framer Motion", description: "Production-ready animation library", url: "https://framer.com/motion" },
    ]
  },
  {
    category: "Inspiration",
    icon: Lightbulb,
    items: [
      { name: "Dribbble", description: "Design inspiration and community", url: "https://dribbble.com" },
      { name: "Mobbin", description: "Mobile and web design patterns", url: "https://mobbin.com" },
      { name: "Awwwards", description: "Web design inspiration", url: "https://awwwards.com" },
    ]
  },
]

export function ResourcesPage() {
  return (
    <>
      <SEO
        title="Resources"
        description="Curated design tools, learning resources, and development libraries recommended by Hmimi Chioukh."
      />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white pt-24 pb-16"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-lg text-gray-600 mb-12">
              Curated collection of tools, guides, and inspiration I use daily.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((category, idx) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                  </div>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 group"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 text-gray-400 group-hover:text-gray-900 transition-colors" />
                          <div>
                            <span className="font-medium text-gray-900 group-hover:underline">
                              {item.name}
                            </span>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  )
}

export default ResourcesPage
