import { api } from "../lib/apiClient"
import { Project, ProjectFormData, ProjectStatus } from "../types/project"

export interface ProjectFilters {
  status?: ProjectStatus | ""
  search?: string
  featured?: boolean
  sort?: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  count?: number
  message?: string
}

export const projectsService = {
  async getAllProjects(filters?: ProjectFilters): Promise<{ success: boolean; count: number; data: Project[] }> {
    const params = new URLSearchParams()
    if (filters?.status) params.append("status", filters.status)
    if (filters?.search) params.append("search", filters.search)
    if (filters?.featured !== undefined) params.append("featured", String(filters.featured))
    if (filters?.sort) params.append("sort", filters.sort)

    const query = params.toString() ? `?${params.toString()}` : ""
    const response = await api.get(`/projects${query}`) as ApiResponse<Project[]>
    
    return {
      success: true,
      count: response.count || response.data?.length || 0,
      data: response.data || [],
    }
  },

  async getProjectById(id: string): Promise<{ success: boolean; data?: Project }> {
    const response = await api.get(`/projects/${id}`) as ApiResponse<Project>
    return response
  },

  async createProject(data: ProjectFormData): Promise<{ success: boolean; data: Project }> {
    const response = await api.post("/projects", data) as ApiResponse<Project>
    return { success: true, data: response.data as Project }
  },

  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<{ success: boolean; data: Project }> {
    const response = await api.put(`/projects/${id}`, data) as ApiResponse<Project>
    return { success: true, data: response.data as Project }
  },

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/projects/${id}`) as ApiResponse<string>
    return { success: true, message: response.message || "Project deleted" }
  },

  async archiveProject(id: string): Promise<{ success: boolean; data: Project }> {
    const response = await api.patch(`/projects/${id}/archive`) as ApiResponse<Project>
    return { success: true, data: response.data as Project }
  },

  async duplicateProject(id: string): Promise<{ success: boolean; data: Project }> {
    const response = await api.patch(`/projects/${id}/duplicate`) as ApiResponse<Project>
    return { success: true, data: response.data as Project }
  },

  async updateProjectStatus(id: string, status: string): Promise<{ success: boolean; data: Project }> {
    const response = await api.patch(`/projects/${id}/status`, { status }) as ApiResponse<Project>
    return { success: true, data: response.data as Project }
  },

  async reorderProjects(projects: { id: string; order: number }[]): Promise<{ success: boolean; message: string }> {
    const response = await api.patch("/projects/reorder", { projects }) as ApiResponse<string>
    return { success: true, message: response.message || "Projects reordered" }
  },
}