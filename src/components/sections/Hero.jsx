import * as React from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const roles = ["H'mimi", "ⵃⵎⵉⵎⵉ", "حميمي" ]

const roleBadges = [
  { label: "Sr Product Designer", variant: "blue" },
  { label: "UI/UX Design", variant: "purple" },
  { label: "AI Design", variant: "orange" },
  { label: "User Research", variant: "teal" },
]

function BackgroundLayers() {
  const containerRef = React.useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const reducedMotion = useReducedMotion()

  const springConfig = { stiffness: 50, damping: 20 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e) => {
    if (reducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    if (reducedMotion) return
    mouseX.set(0)
    mouseY.set(0)
  }

  const x1 = useTransform(springX, [-1, 1], [-10, 10])
  const y1 = useTransform(springY, [-1, 1], [-10, 10])
  const x2 = useTransform(springX, [-1, 1], [18, -18])
  const y2 = useTransform(springY, [-1, 1], [14, -14])
  const x3 = useTransform(springX, [-1, 1], [-26, 26])
  const y3 = useTransform(springY, [-1, 1], [-18, 18])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{ x: reducedMotion ? 0 : x1, y: reducedMotion ? 0 : y1 }}
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={reducedMotion ? {} : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[10%] w-96 h-96 bg-blue-100/40 rounded-full blur-[100px]"
      />
      
      <motion.div
        style={{ x: reducedMotion ? 0 : x2, y: reducedMotion ? 0 : y2 }}
        animate={reducedMotion ? {} : { y: [0, -6, 0] }}
        transition={reducedMotion ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[5%] w-80 h-80 bg-teal-100/30 rounded-full blur-[80px]"
      />
      
      <motion.div
        style={{ x: reducedMotion ? 0 : x3, y: reducedMotion ? 0 : y3 }}
        animate={reducedMotion ? {} : { x: [0, 10, 0] }}
        transition={reducedMotion ? {} : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-indigo-50/40 rounded-full blur-[90px]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white" />
    </div>
  )
}

export function Hero() {
  const [roleIndex, setRoleIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2500)
    
    const timeout = setTimeout(() => {
      setRoleIndex(1)
    }, 1000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <BackgroundLayers />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-2xl text-gray-400">Azul 👋</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
        >
          My Name is {" "}
          <span className="inline-block min-w-[100px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1}}
                exit={{ y:   -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-indigo-600"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          {"\n"}and I design scalable SaaS platforms and digital experiences.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {roleBadges.map((badge) => (
            <Badge key={badge.label} variant={badge.variant}>
              {badge.label}
            </Badge>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <Button asChild>
            <a href="#projects">View Work</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}