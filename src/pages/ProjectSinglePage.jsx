import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Lightbulb } from "lucide-react"

const project = {
  tag: "Fleet Management · SaaS · B2B",
  tagColor: "blue",
  award: "🏆 Innovation Prize — Flotauto Paris 2025",
  title: "DadyCar — Fleet Management Platform",
  role: "Product Designer · End-to-End UI/UX",
  client: "DadyCar",
  year: "2023-present",
  duration: "Ongoing",

  context: `Fleet management in Europe has a serious tooling problem. 
The companies that could benefit most from a modern operations platform — mid-size 
businesses running 20 to 200 vehicles — are stuck between two bad options: expensive 
enterprise software built for corporations, or nothing at all. Before DadyCar, their 
day looked like this: 
maintenance reminders in a notebook, fuel expenses in a shared 
spreadsheet, driver assignments via phone calls, and zero visibility into what was 
actually happening across their fleet in real time. DadyCar was built to close that 
gap — one unified platform where a fleet manager can see everything, act on anything, 
and lose nothing.`,

  overview: `Full end-to-end product design of a B2B SaaS fleet management platform — 
from design tokens and component library to every screen across the full operational surface.`,

  challenge: `Fleet managers relied on Excel files and disconnected tools with no real-time 
visibility. The primary user is a 45+ year old, office-based, non-technical fleet manager 
spending 6–8 hours daily inside the dashboard — requiring clarity and speed above everything.`,

  solution: `A light, data-focused dashboard built on a complete design system — design tokens, 
60+ components, all states. Combined with progressive disclosure patterns to handle complex 
workflows without overwhelming non-technical users.`,

  userInsight: `Our primary user is a 45+ year old fleet manager, office-based, 
non-technical, spending 6–8 hours a day inside this dashboard. This single insight 
ruled out dark themes, high visual complexity, and anything that prioritized 
aesthetics over clarity.`,

  team: ["1 PM", "1 PO", "2 Frontend Devs", "2 Backend Devs", "1 Designer (me)"],

  designChallenges: [
    {
      number: "01",
      title: "Bulk Import — Designing for Error, Not Success",
      problem: `Fleet managers needed to upload hundreds of vehicles at once via CSV 
or Excel — but their data was always messy: missing fields, wrong formats, duplicate 
entries, columns named differently in every company's spreadsheet. Early versions 
displayed the full imported table with all errors flagged inline. Pilot feedback 
was immediate: "I don't know where to start. There's too much."`,
      solution: `Progressive disclosure across 4 steps: 
(1) Upload — drag & drop with instant file format validation. 
(2) Column Mapping — visual matcher connecting their column names to our fields 
with smart auto-suggestions. 
(3) Error Review — shows only the problematic rows with inline fix suggestions, 
not the full 500-row table. 
(4) Confirm — clean summary: X vehicles ready · Y skipped · Z need attention.`,
      insight: `Don't show users their problems all at once. Show them one decision at a time.`,
    },
    {
      number: "02",
      title: "Roles & Permissions — Designing Invisible Complexity",
      problem: `The platform needed a permissions system flexible enough for companies 
with very different org structures — some with one fleet manager, others with regional 
supervisors, field coordinators, and read-only executives — without making configuration 
feel like an IT task.`,
      solution: `A two-layer approach: predefined roles with sensible defaults for the 
majority of users, plus custom permission toggles per role for specific needs — designed 
as a clear scannable matrix, not a wall of checkboxes. Every feature was also designed 
with its disabled and hidden state — what a restricted user sees is just as intentional 
as what a full admin sees.`,
      insight: `Role-based access is completely invisible when it works well and completely 
broken when it doesn't.`,
    },
    {
      number: "03",
      title: "Dashboard — What Does 'At a Glance' Actually Mean?",
      problem: `A fleet management dashboard can display hundreds of data points. 
The real design question was: what does a fleet manager need to know in the first 
10 seconds of their morning?`,
      solution: `Through sessions with pilot users we identified the true priority order: 
(1) Are any vehicles in a critical state right now? 
(2) What maintenance is due this week? 
(3) How are my costs trending this month? 
The dashboard was designed around this hierarchy — critical alerts at the top always 
visible, operational metrics below, analytics last. Modules with nothing urgent 
stayed quiet and out of the way.`,
      insight: `Hierarchy is not a visual decision — it is a user research decision.`,
    },
  ],

  outcomes: [
    "Won Innovation Prize at Flotauto Paris 2025 — competing against established European enterprise solutions",
    "Validated by real fleet companies during pilot — their feedback directly shaped core features",
    "Bulk import flow became the most praised feature among pilot users",
    "Design system kept full platform consistent across a large operational surface built by 2 frontend developers simultaneously",
    "Permission system supported org structures from 1 manager to multi-regional teams without custom dev work",
  ],

  learnings: [
    {
      title: "Design for your actual user, not for designers.",
      body: `Every time I was tempted to make something visually clever, I asked: would a 
45-year-old fleet manager find what they need here in 3 seconds? That question killed 
a lot of bad ideas early.`,
    },
    {
      title: "The design system is the product, not just a support tool.",
      body: `On a platform this large, consistency is a feature. The time invested in 
tokens and components upfront saved weeks of inconsistency fixes later.`,
    },
    {
      title: "The unsexy flows are often the most important ones.",
      body: `Bulk import, document expiry reminders, permission configuration — none are 
headline features. All of them are what users actually spend their time in.`,
    },
    {
      title: "Winning an award is a milestone, not a finish line.",
      body: `Pilot feedback is still coming in. The best version of DadyCar is still 
being designed.`,
    },
  ],

  tools: ["Figma", "FigJam", "Notion", "Maze", "Tailwind CSS", "shadcn/ui"],

  screens: [
    { label: "Dashboard Overview" },
    { label: "Vehicle Management" },
    { label: "Bulk Import — Column Mapping" },
    { label: "Bulk Import — Error Review" },
    { label: "Roles & Permissions Matrix" },
    { label: "Maintenance Tracking" },
  ],

  nextProject: {
    title: "FocusCare — Pre-Surgical Clinical Workflow Platform",
    url: "/projects/dadycar",
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
};

const staggerChallenge = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.15 },
};

const staggerOutcome = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { staggerChildren: 0.08 },
};

const staggerLearn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const staggerStat = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

export function ProjectSinglePage() {
  const navigate = useNavigate()

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
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 mb-4">
              {project.award}
            </span>
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
            className="w-full rounded-2xl bg-gray-100 aspect-video mt-10 flex items-center justify-center"
          >
            <span className="text-gray-400 text-sm">DadyCar Dashboard</span>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">Context</p>
            <blockquote className="text-lg md:text-xl text-gray-700 italic font-medium mb-6">
              "Most of our clients were running their entire fleet on three Excel files 
              and a WhatsApp group."
            </blockquote>
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
              I was the sole Product Designer on a cross-functional team of 7. 
              I owned the full design surface from day one — research, architecture, 
              design system, every screen, and design QA on the live build.
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

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Design Foundation</p>
          <h2 className="text-xl font-bold text-gray-900 mb-4">System Before Screens</h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-10">
            Before touching a single product screen, I built the full design foundation: 
            design tokens mapped to CSS variables for dev handoff, and 60+ components 
            covering every state — default, hover, focus, disabled, loading, empty, error. 
            On a platform this large, consistency is a feature, not a bonus.
          </p>
          <motion.div
            variants={staggerStat}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-center"
            >
              <span className="text-4xl font-bold text-gray-900">60+</span>
              <p className="text-sm text-gray-500 mt-1">Components built</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-center"
            >
              <span className="text-4xl font-bold text-gray-900">18+</span>
              <p className="text-sm text-gray-500 mt-1">Modules covered</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-center"
            >
              <span className="text-4xl font-bold text-gray-900">100%</span>
              <p className="text-sm text-gray-500 mt-1">Token-based system</p>
            </motion.div>
          </motion.div>
        </motion.div>

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

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">Selected Screens</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.screens.map((screen, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-100 aspect-video flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm">{screen.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Impact & Results</p>
          <h2 className="text-xl font-bold text-gray-900 mb-8">What This Project Achieved</h2>
          <motion.div
            variants={staggerOutcome}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {project.outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <span className="text-blue-500 mt-0.5">✦</span>
                <span className="text-sm text-gray-700">{outcome}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-gray-100"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Learnings</p>
          <h2 className="text-xl font-bold text-gray-900 mb-8">What I'd Tell Myself at the Start</h2>
          <motion.div
            variants={staggerLearn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {project.learnings.map((learning, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="rounded-2xl border border-gray-100 p-6"
              >
                <p className="text-sm font-semibold text-gray-900">{learning.title}</p>
                <p className="text-sm text-gray-500 italic mt-2">{learning.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

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

        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-gray-100 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Next Project</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{project.nextProject.title}</h2>
          <Link
            to={project.nextProject.url}
            className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors mt-6"
          >
            View Project <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  )
}

export default ProjectSinglePage