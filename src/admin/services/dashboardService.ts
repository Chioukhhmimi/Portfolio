import { api } from "../lib/apiClient"

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface DashboardStats {
  totalProjects: number
  publishedProjects: number
  featuredProjects: number
  draftProjects: number
  archivedProjects: number
  totalClients: number
  totalMessages: number
  unreadMessages: number
  totalBlogPosts: number
  publishedBlogPosts: number
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get("/dashboard/stats") as ApiResponse<DashboardStats>
    return response.data || {
      totalProjects: 0,
      publishedProjects: 0,
      featuredProjects: 0,
      draftProjects: 0,
      archivedProjects: 0,
      totalClients: 0,
      totalMessages: 0,
      unreadMessages: 0,
      totalBlogPosts: 0,
      publishedBlogPosts: 0,
    }
  },
}