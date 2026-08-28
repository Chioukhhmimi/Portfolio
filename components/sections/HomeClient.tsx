'use client'
import { Hero } from "@/components/sections/Hero"
import { LogoStrip } from "@/components/sections/LogoStrip"
import { Projects } from "@/components/sections/Projects"
import { Blog } from "@/components/sections/Blog"
import { Testimonials } from "@/components/sections/Testimonials"
import { ContactSection } from "@/components/sections/ContactSection"
import { BackToTop } from "@/components/layout/BackToTop"

export function HomeClient() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <LogoStrip />
        <Projects />
        <Blog />
        <Testimonials />
        <ContactSection />
      </main>
      <BackToTop />
    </>
  )
}
