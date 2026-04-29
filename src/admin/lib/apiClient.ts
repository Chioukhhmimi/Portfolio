const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const getToken = () => localStorage.getItem("admin_token")

const handleUnauthorized = () => {
  localStorage.removeItem("admin_token")
  window.location.href = "/admin/login"
}

const handleRequest = async (url: string, options: RequestInit = {}) => {
  const token = getToken()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers as Record<string, string>,
  }

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    handleUnauthorized()
    throw new Error("Unauthorized - please log in")
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Request failed")
  }

  return data
}

export const api = {
  get: (url: string) => handleRequest(url, { method: "GET" }),

  post: (url: string, body?: unknown) =>
    handleRequest(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: (url: string, body?: unknown) =>
    handleRequest(url, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: (url: string, body?: unknown) =>
    handleRequest(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: (url: string) => handleRequest(url, { method: "DELETE" }),
}