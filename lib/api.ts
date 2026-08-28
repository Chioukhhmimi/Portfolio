const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export const fetchProjects = async () => {
  const response = await fetch(`${baseURL}/projects`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }
  
  const data = await response.json()
  return data.data
}

export const fetchProjectById = async (id: string) => {
  const response = await fetch(`${baseURL}/projects/${id}`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch project")
  }
  
  const data = await response.json()
  return data.data
}

export const fetchClients = async () => {
  const response = await fetch(`${baseURL}/clients`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch clients")
  }
  
  const data = await response.json()
  return data.data
}

export const fetchBlogPosts = async () => {
  const response = await fetch(`${baseURL}/blog`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts")
  }
  
  const data = await response.json()
  return data.data
}
