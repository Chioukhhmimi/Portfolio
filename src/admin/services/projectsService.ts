import { Project, ProjectStatus } from "../types/project"
import { mockProjects } from "../data/mockProjects"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const projectsService = {
  async getAll(): Promise<Project[]> {
    await delay(300)
    return [...mockProjects].sort((a, b) => a.order - b.order)
  },

  async getPublished(): Promise<Project[]> {
    await delay(200)
    return mockProjects
      .filter((p) => p.status === "published")
      .sort((a, b) => a.order - b.order)
  },

  async getById(id: string): Promise<Project | undefined> {
    await delay(200)
    return mockProjects.find((p) => p.id === id)
  },

  async create(data: Partial<Project>): Promise<Project> {
    await delay(400)
    const maxOrder = Math.max(...mockProjects.map((p) => p.order), 0)
    const newProject: Project = {
      id: data.id || generateId(),
      status: data.status || "draft",
      featured: data.featured || false,
      order: data.order ?? maxOrder + 1,
      tag: data.tag || "",
      tagColor: data.tagColor || "blue",
      award: data.award || null,
      title: data.title || "Untitled Project",
      role: data.role || "",
      client: data.client || "",
      year: data.year || "",
      duration: data.duration || "",
      context: data.context || "",
      userInsight: data.userInsight || "",
      overview: data.overview || "",
      challenge: data.challenge || "",
      solution: data.solution || "",
      team: data.team || [],
      ecosystem: data.ecosystem || [],
      designChallenges: data.designChallenges || [],
      outcomes: data.outcomes || [],
      learnings: data.learnings || [],
      tools: data.tools || [],
      heroImage: data.heroImage || "",
      screens: data.screens || [],
      nextProject: data.nextProject || { title: "", url: "" },
    }
    mockProjects.push(newProject)
    return newProject
  },

  async update(id: string, data: Partial<Project>): Promise<Project | undefined> {
    await delay(400)
    const index = mockProjects.findIndex((p) => p.id === id)
    if (index === -1) return undefined
    mockProjects[index] = { ...mockProjects[index], ...data }
    return mockProjects[index]
  },

  async delete(id: string): Promise<boolean> {
    await delay(300)
    const index = mockProjects.findIndex((p) => p.id === id)
    if (index === -1) return false
    mockProjects.splice(index, 1)
    return true
  },

  async archive(id: string): Promise<Project | undefined> {
    await delay(200)
    return this.update(id, { status: "archived" })
  },

  async publish(id: string): Promise<Project | undefined> {
    await delay(200)
    return this.update(id, { status: "published" })
  },

  async unpublish(id: string): Promise<Project | undefined> {
    await delay(200)
    return this.update(id, { status: "draft" })
  },

  async duplicate(id: string): Promise<Project | undefined> {
    await delay(300)
    const original = await this.getById(id)
    if (!original) return undefined

    const newId = `${original.id}-copy`
    const maxOrder = Math.max(...mockProjects.map((p) => p.order), 0)

    const duplicate: Project = {
      ...original,
      id: newId,
      status: "draft",
      title: `${original.title} (Copy)`,
      order: maxOrder + 1,
      designChallenges: original.designChallenges.map((dc) => ({ ...dc })),
      learnings: original.learnings.map((l) => ({ ...l })),
    }

    mockProjects.push(duplicate)
    return duplicate
  },

  async updateOrder(updates: { id: string; order: number }[]): Promise<void> {
    await delay(200)
    for (const { id, order } of updates) {
      const index = mockProjects.findIndex((p) => p.id === id)
      if (index !== -1) {
        mockProjects[index].order = order
      }
    }
  },

  async getStats(): Promise<{
    total: number
    published: number
    draft: number
    archived: number
  }> {
    await delay(200)
    return {
      total: mockProjects.length,
      published: mockProjects.filter((p) => p.status === "published").length,
      draft: mockProjects.filter((p) => p.status === "draft").length,
      archived: mockProjects.filter((p) => p.status === "archived").length,
    }
  },
}