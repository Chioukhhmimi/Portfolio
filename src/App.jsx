import * as React from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { LogoStrip } from "@/components/sections/LogoStrip"
import { About } from "@/components/sections/About"
import { Blog } from "@/components/sections/Blog"
import { Testimonials } from "@/components/sections/Testimonials"
import { Projects } from "@/components/sections/Projects"
import { ContactSection } from "@/components/sections/ContactSection"
import ProjectSinglePage from "./pages/ProjectSinglePage"
import ResourcesPage from "./pages/ResourcesPage"
import { NotFound } from "./pages/NotFound"
import { SEO } from "@/components/SEO"

// Admin imports
import { AdminLayout } from "./admin/layouts/AdminLayout"
import { AdminDashboard, ProjectsList, ProjectForm, BlogList, BlogForm, MessagesList, MessageDetail, ClientsList, ClientForm } from "./admin/pages"

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  
  React.useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  
  return null
}

function AdminNoIndex() {
  return (
    <SEO
      title="Admin"
      noindex
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <>
              <SEO
                title={null}
                description="Hmimi Chioukh — Product Designer specializing in SaaS platforms, UI/UX design, and AI-powered workflows. View case studies from DadyCar, FocusCare, Shihany, Resaglob."
              />
              <Navbar />
              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <LogoStrip />
                <Projects />
                <Blog />
                <Testimonials />
                <ContactSection />
              </motion.main>
              <Footer />
            </>
          } />
          <Route path="/projects/:id" element={
            <>
              <ProjectSinglePage />
            </>
          } />
          <Route path="/resources" element={
            <>
              <ResourcesPage />
            </>
          } />
          
          {/* Admin Routes - No Navbar/Footer, Noindex */}
          <Route path="/admin" element={<><AdminNoIndex /><AdminLayout><AdminDashboard /></AdminLayout></>} />
          <Route path="/admin/projects" element={<><AdminNoIndex /><AdminLayout><ProjectsList /></AdminLayout></>} />
          <Route path="/admin/projects/new" element={<><AdminNoIndex /><AdminLayout><ProjectForm /></AdminLayout></>} />
          <Route path="/admin/projects/:id/edit" element={<><AdminNoIndex /><AdminLayout><ProjectForm /></AdminLayout></>} />
          <Route path="/admin/clients" element={<><AdminNoIndex /><AdminLayout><ClientsList /></AdminLayout></>} />
          <Route path="/admin/clients/new" element={<><AdminNoIndex /><AdminLayout><ClientForm /></AdminLayout></>} />
          <Route path="/admin/clients/:id/edit" element={<><AdminNoIndex /><AdminLayout><ClientForm /></AdminLayout></>} />
          <Route path="/admin/blog" element={<><AdminNoIndex /><AdminLayout><BlogList /></AdminLayout></>} />
          <Route path="/admin/blog/new" element={<><AdminNoIndex /><AdminLayout><BlogForm /></AdminLayout></>} />
          <Route path="/admin/blog/:id/edit" element={<><AdminNoIndex /><AdminLayout><BlogForm /></AdminLayout></>} />
          <Route path="/admin/messages" element={<><AdminNoIndex /><AdminLayout><MessagesList /></AdminLayout></>} />
          <Route path="/admin/messages/:id" element={<><AdminNoIndex /><AdminLayout><MessageDetail /></AdminLayout></>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
