export type ProjectStatus = "draft" | "published" | "archived"

export interface ProjectEcosystemItem {
  name: string
  type: string
  user: string
  description: string
}

export interface ProjectDesignChallenge {
  number: string
  title: string
  problem: string
  solution: string
  insight: string
}

export interface ProjectLearning {
  title: string
  body: string
}

export interface ProjectScreen {
  label: string
  src: string
}

export interface ProjectNextProject {
  title: string
  url: string
}

export interface Project {
  id: string
  status: ProjectStatus
  featured: boolean
  order: number

  tag: string
  tagColor: string
  award: string | null
  title: string
  role: string
  client: string
  year: string
  duration: string

  context: string
  userInsight: string
  overview: string
  challenge: string
  solution: string

  team: string[]

  ecosystem?: ProjectEcosystemItem[]

  designChallenges: ProjectDesignChallenge[]

  outcomes: string[]

  learnings: ProjectLearning[]

  tools: string[]

  heroImage: string

  screens: ProjectScreen[]

  nextProject: ProjectNextProject
}

export type ProjectFormData = Omit<Project, "id" | "status" | "order" | "award" | "ecosystem"> & {
  award: string
  ecosystem?: ProjectEcosystemItem[]
}

export type ProjectCreateInput = Omit<ProjectFormData, "screens">