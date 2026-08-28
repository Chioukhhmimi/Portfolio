'use client'
import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchProjects } from "@/lib/api"

export function Projects() {
  const [projects, setProjects] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
          <div className="text-center py-20">
            <p className="text-red-500">Failed to load projects: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
          {projects.map((project, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={project.id}
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
                    {project.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="ghost" size="sm" className="group flex items-center gap-1">
                      Check the project
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                </div>

                <div className="flex-1 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                  {project.heroImage ? (
                    <img 
                      src={project.heroImage} 
                      alt={`${project.title} — ${project.category} case study`} 
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  ) : (
                    <div className="aspect-[4/3] flex items-center justify-center">
                      <span className="text-9xl font-bold text-gray-200">
                        {project.title?.charAt(0)}
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
