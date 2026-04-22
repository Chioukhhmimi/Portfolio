import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { LogoStrip } from "@/components/sections/LogoStrip"
import { About } from "@/components/sections/About"
import { Blog } from "@/components/sections/Blog"
import { Projects } from "@/components/sections/Projects"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <LogoStrip />
          <Projects />
          <Blog />
          <Contact />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App