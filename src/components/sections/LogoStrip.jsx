import * as React from "react"
import { motion } from "framer-motion"
import AdocSvg from "../../assets/logos/Adoc.svg"
import ShihanySvg from "../../assets/logos/shihany.svg"
import DadycarSvg from "../../assets/logos/dadycar.svg"
import ResaglobSvg from "../../assets/logos/RESAGLOB LOGO.svg"
import FocusSvg from "../../assets/logos/focuse.svg"

const logos = [
  { name: "Adoc", src: AdocSvg },
  { name: "Shihany", src: ShihanySvg },
  { name: "Dadycar", src: DadycarSvg },
  { name: "Resaglob", src: ResaglobSvg },
  { name: "Focus", src: FocusSvg },
]

export function LogoStrip() {
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <section className="py-16 px-4 sm:px-6 border-y border-gray-100">
       <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs uppercase tracking-widest text-center text-gray-400 mt-8 mb-8"
      >
        Projects I worked on
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden max-w-7xl mx-auto px-4 sm:px-6"
      >
        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 items-center whitespace-nowrap"
        >
          {duplicatedLogos.map((logo, index) => (
            <img
              key={`${logo.name}-${index}`}
              src={logo.src}
              alt={logo.name}
              className="h-8 w-auto object-contain grayscale opacity-40 hover:opacity-70 transition-opacity"
            />
          ))}
        </motion.div>
      </motion.div>

    </section>
  )
}