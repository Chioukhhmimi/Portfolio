import * as React from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { BackToTop } from "@/components/layout/BackToTop"
import { Hero } from "@/components/sections/Hero"
import { LogoStrip } from "@/components/sections/LogoStrip"
import { About } from "@/components/sections/About"
import { Blog } from "@/components/sections/Blog"
import { Testimonials } from "@/components/sections/Testimonials"
import { Projects } from "@/components/sections/Projects"
import { ContactSection } from "@/components/sections/ContactSection"
import ProjectSinglePage from "./views/ProjectSinglePage"
import ResourcesPage from "./views/ResourcesPage"
import BlogPostPage from "./views/BlogPostPage"
import { NotFound } from "./views/NotFound"
import { SEO } from "@/components/SEO"

// Admin imports
import { AdminLayout } from "./admin/layouts/AdminLayout"
import { AdminDashboard, ProjectsList, ProjectForm, BlogList, BlogForm, MessagesList, MessageDetail, ClientsList, ClientForm } from "./admin/pages"
import AdminLogin from "./admin/pages/AdminLogin"
import ForgotPassword from "./admin/pages/ForgotPassword"
import ResetPassword from "./admin/pages/ResetPassword"
import { ProtectedRoute } from "./admin/components/ProtectedRoute"

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
      <BackToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <>
              <SEO
                title={null}
                description="Hmimi Chioukh — AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob."
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
          <Route path="/blog/:slug" element={
            <>
              <BlogPostPage />
            </>
          } />
          
          {/* Admin Routes - No Navbar/Footer, Noindex */}
          <Route path="/admin/login" element={<><AdminNoIndex /><AdminLogin /></>} />
          <Route path="/admin/forgot-password" element={<><AdminNoIndex /><ForgotPassword /></>} />
          <Route path="/admin/reset-password/:token" element={<><AdminNoIndex /><ResetPassword /></>} />
          <Route path="/admin" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/projects" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><ProjectsList /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/projects/new" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><ProjectForm /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/projects/:id/edit" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><ProjectForm /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/clients" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><ClientsList /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/clients/new" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><ClientForm /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/clients/:id/edit" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><ClientForm /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/blog" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><BlogList /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/blog/new" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><BlogForm /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/blog/:id/edit" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><BlogForm /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/messages" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><MessagesList /></AdminLayout></ProtectedRoute></>} />
          <Route path="/admin/messages/:id" element={<><AdminNoIndex /><ProtectedRoute><AdminLayout><MessageDetail /></AdminLayout></ProtectedRoute></>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
