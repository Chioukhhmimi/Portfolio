import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { portfolio } from "@/data/portfolio"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [hoveredYear, setHoveredYear] = React.useState(false)
  const [hoveredName, setHoveredName] = React.useState(false)

  return (
    <footer className="py-12 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold text-gray-900 font-sans mb-2">
              {portfolio.name}
            </p>
            <p className="text-sm text-gray-500">
              {portfolio.shortBio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <a href="#projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Projects
              </a>
              <a href="#about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Connect
            </p>
            <nav className="flex flex-col gap-2">
              <a
                href={portfolio.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={portfolio.social.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Dribbble
              </a>
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href={portfolio.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Behance
              </a>
              <a
                href={portfolio.social.email}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Email
              </a>
            </nav>
          </div>
        </motion.div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            {"\u00A9"}{" "}
            <span
              className={`text-swap cursor-default ${hoveredYear ? "is-active" : ""}`}
              onMouseEnter={() => setHoveredYear(true)}
              onMouseLeave={() => setHoveredYear(false)}
            >
              <span className="swap-default">{currentYear}</span>
              <span className="swap-hover">2975</span>
            </span>{" "}
            <span
              className={`text-swap cursor-default ${hoveredName ? "is-active" : ""}`}
              onMouseEnter={() => setHoveredName(true)}
              onMouseLeave={() => setHoveredName(false)}
            >
              <span className="swap-default">{portfolio.name}</span>
              <span className="swap-hover">{portfolio.nameZd}</span>
            </span>
            . All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Designed with{" "}
            <span className="inline-flex group cursor-default">
              <span className="text-base transition-transform duration-200 group-hover:scale-125 group-hover:rotate-12">{"\u2764\uFE0F"}</span>
            </span>{" "}
            <span className="text-progress font-medium">React</span>,{" "}
            <span className="text-progress font-medium">Tailwind CSS</span>{" "}
            &{" "}
            <span className="wave-text font-medium text-gray-500 cursor-default">
              {"Framer Motion".split("").map((char, i) => (
                <span key={i}>{char === " " ? "\u00A0" : char}</span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
