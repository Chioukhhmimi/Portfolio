import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Works", href: "#projects" },
  { name: "Resume", href: "#experience" },
  { name: "ZD System", href: "#about", badge: true },
]

export function Navbar() {
  const [activeSection, setActiveSection] = React.useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (href) => {
    setActiveSection(href.substring(1))
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
    >
      <div className="h-16 px-6 md:px-12 flex items-center justify-between">
        {/* Logo - Left */}
        <a href="#" className="text-lg font-semibold logo-font text-gray-900 font-sans">
          ⵃⵎⵉⵎⵉ
        </a>

        {/* Nav Links - Center (Desktop only) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className={cn(
                "text-sm transition-colors inline-flex items-center gap-1",
                activeSection === link.href.substring(1)
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {link.name}
              {link.badge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-600">
                  Coming Soon
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Button size="sm" asChild className="hidden lg:inline-flex">
            <a href="#contact">Let's Talk</a>
          </Button>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-900" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 lg:hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      "block py-3 text-base font-medium transition-colors inline-flex items-center gap-2",
                      activeSection === link.href.substring(1)
                        ? "text-gray-900"
                        : "text-gray-800 hover:text-gray-900"
                    )}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-600">
                        Coming Soon
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-2 px-6">
                <Button size="sm" asChild className="w-full justify-center">
                  <a href="#contact">Let's Talk</a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}