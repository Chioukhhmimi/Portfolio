import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { portfolio } from "@/data/portfolio"
import DadycarSvg from "@/assets/Projects/dadycar.svg"
import FocuseSvg from "@/assets/Projects/focuse.svg"
import ShihanySvg from "@/assets/Projects/Shihany.svg"
import ResglobSvg from "@/assets/Projects/resglob.svg"

const projectImages = {
  "DadyCar": DadycarSvg,
  "FocusCare": FocuseSvg,
  "Shihany": ShihanySvg,
  "Resaglob": ResglobSvg,
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Selected Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Projects I worked on</h2>
        </motion.div>

        <div className="space-y-24">
          {portfolio.projects.map((project, index) => {
            const isEven = index % 2 === 0
            const projectImage = projectImages[project.title]

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                <div className="flex-1 w-full">
                  <span className="text-xs uppercase tracking-widest text-gray-400">{project.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to="/projects/dadycar">
                    <Button variant="ghost" size="sm" className="group flex items-center gap-1">
                      Check the project
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                </div>

                <div className="flex-1 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                  {projectImage ? (
                    <img 
                      src={projectImage} 
                      alt={project.title} 
                      className="w-full h-auto object-cover "
                    />
                  ) : (
                    <div className="aspect-[4/3] flex items-center justify-center">
                      <span className="text-9xl font-bold text-gray-200">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}