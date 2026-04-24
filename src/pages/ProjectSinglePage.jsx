import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { projectsData } from "@/data/projectsData"
import DadycarDashboard from "@/assets/Projects/DadyCar/dadycar-Dashboard.svg"
import DadycarVehicule from "@/assets/Projects/DadyCar/dadycar-Vehicule.svg"
import DadycarBulk from "@/assets/Projects/DadyCar/dadycar-Bulk.svg"
import DadycarBulkError from "@/assets/Projects/DadyCar/dadycar-Bulk-error.svg"
import DadycarTelamitc from "@/assets/Projects/DadyCar/dadycar-Telamitc.svg"
import DadycarMap from "@/assets/Projects/DadyCar/dadycar-Map.svg"
import FocuseCareDashboard from "@/assets/Projects/FocuseCare/FocuseCare-Dashboard.svg"
import FocuseCareConsultation from "@/assets/Projects/FocuseCare/Focusecare-consultation.svg"
import FocuseCarePatient from "@/assets/Projects/FocuseCare/Focusecare-patient.svg"
import FocuseCareSurgon from "@/assets/Projects/FocuseCare/Focusecare-surgon.svg"
import FocuseCareFicherliason from "@/assets/Projects/FocuseCare/Focusecare-ficherliason.svg"
import FocuseCareConsultationFini from "@/assets/Projects/FocuseCare/Focusecare-consultation-fini.svg"
import ResglobHotelSearch from "@/assets/Projects/Resglob/Resglob-Hotel Search.svg"
import ResglobClients from "@/assets/Projects/Resglob/Resglob-Clients.svg"
import ResglobMap from "@/assets/Projects/Resglob/Resglob-Map.svg"
import ResglobReservation from "@/assets/Projects/Resglob/Resglob-reservation.svg"
import ResglobResume from "@/assets/Projects/Resglob/Resglob-Resume.svg"
import ShihanyHub from "@/assets/Projects/Shihany/Shihany-hub.svg"
import ShihanyHubTraining from "@/assets/Projects/Shihany/Shihany-hub-training.svg"
import ShihanyPro from "@/assets/Projects/Shihany/Shihany-pro.svg"
import ShihanyPlayer from "@/assets/Projects/Shihany/Shihany-player.svg"
import ShihanyFed from "@/assets/Projects/Shihany/Shihany-Fed.svg"
import ShihanyTeam from "@/assets/Projects/Shihany/Shihany-Team.svg"

const dadycarImages = {
  "dadycar-Dashboard": DadycarDashboard,
  "dadycar-Vehicule": DadycarVehicule,
  "dadycar-Bulk": DadycarBulk,
  "dadycar-Bulk-error": DadycarBulkError,
  "dadycar-Telamitc": DadycarTelamitc,
  "dadycar-Map": DadycarMap,
}

const focuscareImages = {
  "focuscare-Dashboard": FocuseCareDashboard,
  "focuscare-consultation": FocuseCareConsultation,
  "focuscare-patient": FocuseCarePatient,
  "focuscare-surgon": FocuseCareSurgon,
  "focuscare-ficherliason": FocuseCareFicherliason,
  "focuscare-consultation-fini": FocuseCareConsultationFini,
}

const resaglobImages = {
  "resaglob-Hotel Search": ResglobHotelSearch,
  "resaglob-Clients": ResglobClients,
  "resaglob-Map": ResglobMap,
  "resaglob-reservation": ResglobReservation,
  "resaglob-Resume": ResglobResume,
}

const shihanyImages = {
  "shihany-hub": ShihanyHub,
  "shihany-hub-training": ShihanyHubTraining,
  "shihany-pro": ShihanyPro,
  "shihany-player": ShihanyPlayer,
  "shihany-fed": ShihanyFed,
  "shihany-team": ShihanyTeam,
}

const getProjectImage = (imageKey) => {
  return dadycarImages[imageKey] || focuscareImages[imageKey] || resaglobImages[imageKey] || shihanyImages[imageKey]
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
}

const staggerStat = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
}

export function ProjectSinglePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const project = React.useMemo(() => {
    return projectsData.find((p) => p.id === id) || projectsData[0]
  }, [id])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            ← Back to Work
          </motion.button>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {project.award && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 mb-4">
                {project.award}
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 mb-4">
              {project.tag}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 max-w-3xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm text-gray-400 italic mt-2"
          >
            {project.role}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-wide mt-3"
          >
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.duration}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full rounded-2xl bg-gray-100 aspect-video mt-10 overflow-hidden"
          >
            {project.heroImage && getProjectImage(project.heroImage) ? (
              <img 
                src={getProjectImage(project.heroImage)} 
                alt={project.title} 
                className="w-full h-auto"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-sm">{project.title}</span>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">Context</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {project.context}
            </p>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">My Role</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {project.overview}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.team.map((role, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 rounded-full text-xs px-3 py-1">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {project.userInsight && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16"
          >
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center relative">
              <span className="absolute top-6 left-1/2 -translate-x-1/2 text-6xl font-bold text-blue-200">"</span>
              <p className="text-base md:text-lg text-blue-900 italic leading-relaxed relative z-10">
                {project.userInsight}
              </p>
              <p className="text-xs text-blue-400 uppercase tracking-widest mt-6">— Core User Insight</p>
            </div>
          </motion.div>
        )}

        {project.ecosystem && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 text-center">
              The Ecosystem
            </p>
            <h2 className="text-3xl font-bold text-gray-900 text-center mt-3">
              4 Products. One Connected Platform.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {project.ecosystem.map((product) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <span className="text-xs bg-white border border-gray-200 
              text-gray-500 rounded-full px-3 py-1">
                      {product.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                    {product.user}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Overview</p>
              <p className="text-sm text-gray-600 leading-relaxed">{project.overview}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Challenge</p>
              <p className="text-sm text-gray-600 leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Solution</p>
              <p className="text-sm text-gray-600 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </motion.div>

        {project.stats && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Design Foundation</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">System Before Screens</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-10">
              Before touching a single product screen, I built the full design foundation. 
              On a platform this large, consistency is a feature, not a bonus.
            </p>
            <motion.div
              variants={staggerStat}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {project.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-center"
                >
                  <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {project.designChallenges && project.designChallenges.length > 0 && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
          >
            <section>
              <p className="text-xs uppercase tracking-widest text-gray-400 text-center">
                Design Challenges
              </p>

              <h2 className="text-3xl font-bold text-gray-900 text-center mt-3">
                Where the Hard Thinking Happened
              </h2>

              <div className="mt-12 flex flex-col gap-8">
                {project.designChallenges.map((challenge) => (
                  <motion.div
                    key={challenge.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="relative rounded-2xl border border-gray-100 p-8 md:p-10 overflow-hidden"
                  >
                    <span className="absolute top-4 right-6 text-8xl font-bold text-gray-100 select-none">
                      {challenge.number}
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 relative z-10">
                      {challenge.title}
                    </h3>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                        The Problem
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {challenge.problem}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                        The Solution
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {challenge.solution}
                      </p>
                    </div>

                    <div className="mt-6 bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                      <span className="text-base">💡</span>
                      <p className="text-sm text-gray-700 italic">
                        {challenge.insight}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {project.screens && project.screens.length > 0 && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">Selected Screens</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screens.map((screen, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-gray-100 overflow-hidden"
                >
                  {screen.image && getProjectImage(screen.image) ? (
                    <img 
                      src={getProjectImage(screen.image)} 
                      alt={screen.label} 
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="aspect-video flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{screen.label}</span>
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-sm text-gray-500">{screen.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.outcomes && project.outcomes.length > 0 && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Impact & Results</p>
            <h2 className="text-xl font-bold text-gray-900 mb-8">What This Project Achieved</h2>
            <div className="space-y-4">
              {project.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✦</span>
                  <span className="text-sm text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.learnings && project.learnings.length > 0 && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Learnings</p>
            <h2 className="text-xl font-bold text-gray-900 mb-8">What I'd Tell Myself at the Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.learnings.map((learning, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 p-6"
                >
                  <p className="text-sm font-semibold text-gray-900">{learning.title}</p>
                  <p className="text-sm text-gray-500 italic mt-2">{learning.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.tools && project.tools.length > 0 && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Tools & Methods</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 rounded-full text-xs px-3 py-1"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {project.nextProject && (
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-gray-100 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Next Project</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">{project.nextProject.title}</h2>
            <Link
              to={`/projects/${project.nextProject.id}`}
              className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors mt-6"
            >
              View Project <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default ProjectSinglePage