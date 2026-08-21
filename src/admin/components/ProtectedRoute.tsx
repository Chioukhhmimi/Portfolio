import * as React from "react"
import { Navigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      setAuthenticated(false)
      return
    }

    fetch(`${baseURL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true)
        } else {
          localStorage.removeItem("admin_token")
          setAuthenticated(false)
        }
      })
      .catch(() => {
        localStorage.removeItem("admin_token")
        setAuthenticated(false)
      })
  }, [])

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
