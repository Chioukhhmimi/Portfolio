export * from "./project"
export type { Project } from "./project"

export type ProjectStatus = "draft" | "published" | "archived"
export type BlogStatus = "draft" | "published" | "archived"
export type MessageStatus = "unread" | "read" | "archived"

export interface BlogPost {
  id: string
  title: string
  slug: string
  mediumUrl?: string
  excerpt?: string
  readingTime?: number
  tags?: string[]
  coverImage?: string
  status: BlogStatus
  publishDate?: string
  featured: boolean
  importedMetadata?: {
    author?: string
    publishedAt?: string
    wordCount?: number
  }
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  dateTime: string
  status: MessageStatus
  sourcePage?: string
  tags?: string[]
  createdAt: string
}

export interface DashboardStats {
  totalProjects: number
  totalBlogPosts: number
  totalMessages: number
  publishedProjects: number
  draftProjects: number
  archivedProjects: number
  publishedBlogPosts: number
  draftBlogPosts: number
  unreadMessages: number
  readMessages: number
  archivedMessages: number
}

export interface ActivityItem {
  id: string
  type: "project" | "blog" | "message"
  action: "created" | "updated" | "deleted" | "published" | "archived"
  title: string
  dateTime: string
}