import * as React from "react"
import { motion } from "framer-motion"
import ShihanySvg from "../../assets/logos/shihany.svg"
import DadycarSvg from "../../assets/logos/dadycar.svg"
import ResaglobSvg from "../../assets/logos/Resoglob.svg"
import FocusSvg from "../../assets/logos/FocuseCare.svg"
import TwirexSvg from "../../assets/logos/Twirex.svg"
import ADOCSvg from "../../assets/logos/ADOC.svg"

const logos = [
  { name: "Twirex", src: TwirexSvg },
  { name: "Shihany", src: ShihanySvg },
  { name: "Dadycar", src: DadycarSvg },
  { name: "Resaglob", src: ResaglobSvg },
  { name: "FocusCare", src: FocusSvg },
  { name: "ADOC", src: ADOCSvg },
]

export function LogoStrip() {
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
<section className="py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            animate={{ x: ["0%", "-25%"] }}
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
                className="h-8 w-auto object-contain  opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}