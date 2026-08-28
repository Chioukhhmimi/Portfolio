'use client'
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const figmaResources = [
  { title: "Web Agency Portfolio", description: "A modern web agency portfolio template with clean layouts and professional design for showcasing agency work.", url: "https://www.figma.com/community/file/1102374590268765363/web-agency-portfolio", image: "https://res.cloudinary.com/dtwokbtvj/image/upload/v1787836867/portfolio/resources/web-agency-portfolio.png" },
  { title: "Side Bar Navigation", description: "A versatile sidebar navigation component system with responsive states and clean iconography.", url: "https://www.figma.com/community/file/1107298456999284512/side-bar-navigation", image: "https://res.cloudinary.com/dtwokbtvj/image/upload/v1787836872/portfolio/resources/side-bar-navigation.png" },
  { title: "SaaS UI Kit", description: "A complete design system for building modern SaaS interfaces with reusable components and variants.", url: "https://www.figma.com/community" },
  { title: "Icon Set", description: "120+ pixel-perfect icons for web and mobile interfaces, organized by category.", url: "https://www.figma.com/community" },
]

const tools = [
  { name: "Figma", description: "My go-to for all UI/UX design work. I use it daily for wireframes, prototypes, and design systems.", icon: "\uD83C\uDFA8", url: "https://figma.com" },
  { name: "Claude", description: "AI assistant for writing, brainstorming, and code generation. Helps me work faster.", icon: "\uD83E\uDD16", url: "https://claude.ai" },
  { name: "Notion", description: "Notes, documentation, and project planning. Keeps everything organized in one place.", icon: "\uD83D\uDCDD", url: "https://notion.so" },
  { name: "VS Code", description: "Code editor for frontend development. Extensions make it incredibly powerful.", icon: "\uD83D\uDCBB", url: "https://code.visualstudio.com" },
  { name: "GitHub", description: "Version control and collaboration. Every project lives here.", icon: "\uD83D\uDCE6", url: "https://github.com" },
  { name: "Vercel", description: "Hosting and deployment. Push to deploy, instant preview on every PR.", icon: "\uD83D\uDE80", url: "https://vercel.com" },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function ResourcesClient() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Free Resources</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Free Figma community files and the tools I use daily to design and build products.</p>
        </motion.div>
        <motion.section {...fadeUp} className="mb-24">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Figma Community Files</h2>
            <p className="text-gray-500">Free design resources you can duplicate and use in your projects.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {figmaResources.map((resource, idx) => (
              <motion.div key={resource.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="group bg-gray-50 rounded-2xl overflow-hidden hover:bg-gray-100 transition-colors">
                {resource.image ? (
                  <img src={resource.image} alt={resource.title} className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center"><span className="text-gray-400 text-sm">Preview</span></div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{resource.description}</p>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline">View on Figma<ExternalLink className="w-3.5 h-3.5" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section {...fadeUp}>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tools I Use Daily</h2>
            <p className="text-gray-500">The stack that powers my design and development workflow.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, idx) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.06 }} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-3xl leading-none">{tool.icon}</span>
                  <div className="flex-1 min-w-0"><h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3><p className="text-sm text-gray-500">{tool.description}</p></div>
                </div>
                {tool.url && <div className="mt-4"><a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">Visit site<ExternalLink className="w-3 h-3" /></a></div>}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.main>
  )
}
