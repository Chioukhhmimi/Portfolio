import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const roles = ["H'mimi", "ⵃⵎⵉⵎⵉ", "حميمي" ]

const roleBadges = [
  { label: "Sr Product Designer", variant: "blue" },
  { label: "UI/UX Design", variant: "purple" },
  { label: "AI Design", variant: "orange" },
  { label: "User Research", variant: "teal" },
]

export function Hero() {
  const [roleIndex, setRoleIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
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