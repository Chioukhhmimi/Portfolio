// @ts-nocheck
'use client'
import * as React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AdminLayout } from "@/admin/layouts/AdminLayout"
import { AdminDashboard, ProjectsList, ProjectForm, BlogList, BlogForm, MessagesList, MessageDetail, ClientsList, ClientForm } from "@/admin/pages"
import AdminLogin from "@/admin/pages/AdminLogin"
import ForgotPassword from "@/admin/pages/ForgotPassword"
import ResetPassword from "@/admin/pages/ResetPassword"
import { ProtectedRoute } from "@/admin/components/ProtectedRoute"

function AdminNoIndex() {
  React.useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)
    return () => { document.head.removeChild(meta) }
  }, [])
  return null
}

export function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
