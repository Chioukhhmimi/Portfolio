import * as React from "react"
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { LogoStrip } from "@/components/sections/LogoStrip"
import { About } from "@/components/sections/About"
import { Blog } from "@/components/sections/Blog"
import { Testimonials } from "@/components/sections/Testimonials"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import ProjectSinglePage from "./pages/ProjectSinglePage"

// Admin imports
import { AdminLayout } from "./admin/layouts/AdminLayout"
import { AdminDashboard, ProjectsList, ProjectForm, BlogList, BlogForm, MessagesList, MessageDetail } from "./admin/pages"

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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <>
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
                <Contact />
              </motion.main>
              <Footer />
            </>
          } />
          <Route path="/projects/:id" element={
            <>
              <Navbar />
              <ProjectSinglePage />
              <Footer />
            </>
          } />
          
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/projects" element={<AdminLayout><ProjectsList /></AdminLayout>} />
          <Route path="/admin/projects/new" element={<AdminLayout><ProjectForm /></AdminLayout>} />
          <Route path="/admin/projects/:id/edit" element={<AdminLayout><ProjectForm /></AdminLayout>} />
          <Route path="/admin/blog" element={<AdminLayout><BlogList /></AdminLayout>} />
          <Route path="/admin/blog/new" element={<AdminLayout><BlogForm /></AdminLayout>} />
          <Route path="/admin/blog/:id/edit" element={<AdminLayout><BlogForm /></AdminLayout>} />
          <Route path="/admin/messages" element={<AdminLayout><MessagesList /></AdminLayout>} />
          <Route path="/admin/messages/:id" element={<AdminLayout><MessageDetail /></AdminLayout>} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App