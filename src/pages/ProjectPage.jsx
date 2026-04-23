import * as React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolio } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const tagColors = {
  blue: "bg-blue-50 text-blue-600",
  teal: "bg-teal-50 text-teal-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const project = portfolio.projects.find((p) => p.id === id)
  const nextProject = portfolio.projects.find((p) => p.id === project?.nextProject)

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Project not found</p>
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const tagClass = tagColors[project.tagColor] || tagColors.blue

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Back to Work
        </motion.button>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-6 md:px-12 py-12"
      >
        <motion.div variants={fadeUp}>
          <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium mb-4", tagClass)}>
            {project.tag}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-3xl">
            {project.title}
          </h1>
          <p className="text-sm text-gray-400 italic mt-2">{project.role}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-wide mt-4">
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.duration}</span>
          </div>
        </motion.div>

        <motion.div variants={fadeInScale} className="mt-10">
          <div className="w-full rounded-2xl bg-gray-100 aspect-video flex items-center justify-center shadow-md">
            <span className="text-gray-400 text-lg">Hero Mockup</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Overview</p>
            <p className="text-sm text-gray-600 leading-relaxed">{project.overview}</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Challenge</p>
            <p className="text-sm text-gray-600 leading-relaxed">{project.challenge}</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Solution</p>
            <p className="text-sm text-gray-600 leading-relaxed">{project.solution}</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Outcomes</p>
            <h2 className="text-2xl font-bold text-gray-900">What We Achieved</h2>
          </motion.div>
          <div className="space-y-4">
            {project.outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{outcome}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Tools & Methods</p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {project.tools.map((tool, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 rounded-full text-xs px-3 py-1"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Selected Screens</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.screens.map((screen, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="rounded-2xl bg-gray-100 w-full aspect-video flex items-center justify-center shadow-sm"
              >
                <span className="text-gray-400 text-lg">Screen {index + 1}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {nextProject && (
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-gray-100 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Next Project</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{nextProject.title}</h2>
              <Button asChild className="bg-gray-900 text-white rounded-full px-6 py-3 hover:bg-gray-800">
                <Link to={`/projects/${nextProject.id}`}>
                  View Project →
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ProjectPage