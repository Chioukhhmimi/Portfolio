// @ts-nocheck
import { api } from "../lib/apiClient"

interface ApiResponse<T> {
  success: boolean
  data?: T
  count?: number
  message?: string
}

export interface BlogPost {
  _id: string
  id: string
  title: string
  slug: string
  mediumUrl?: string
  excerpt?: string
  content?: string
  coverImage?: string
  readingTime?: string
  tags?: string[]
  status: "draft" | "published" | "archived"
  featured: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

const mapBlogPost = (blog: any): BlogPost => ({
  _id: blog._id,
  id: blog._id,
  title: blog.title,
  slug: blog.slug,
  mediumUrl: blog.mediumUrl,
  excerpt: blog.excerpt,
  content: blog.content,
  coverImage: blog.coverImage,
  readingTime: blog.readingTime,
  tags: blog.tags,
  status: blog.status || "draft",
  featured: blog.featured || false,
  publishedAt: blog.publishedAt,
  createdAt: blog.createdAt,
  updatedAt: blog.updatedAt,
})

export const blogsService = {
  async getBlogs(): Promise<BlogPost[]> {
    const response = await api.get("/blog") as ApiResponse<BlogPost[]>
    return (response.data || []).map(mapBlogPost)
  },

  async getBlogById(id: string): Promise<BlogPost | undefined> {
    const response = await api.get(`/blog/${id}`) as ApiResponse<BlogPost>
    return response.data ? mapBlogPost(response.data) : undefined
  },

  async getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
    const response = await api.get(`/blog/slug/${slug}`) as ApiResponse<BlogPost>
    return response.data ? mapBlogPost(response.data) : undefined
  },

  async createBlog(data: Partial<BlogPost>): Promise<BlogPost> {
    const response = await api.post("/blog", data) as ApiResponse<BlogPost>
    return mapBlogPost(response.data!)
  },

  async updateBlog(id: string, data: Partial<BlogPost>): Promise<BlogPost | undefined> {
    const response = await api.put(`/blog/${id}`, data) as ApiResponse<BlogPost>
    return response.data ? mapBlogPost(response.data) : undefined
  },

  async deleteBlog(id: string): Promise<boolean> {
    const response = await api.delete(`/blog/${id}`) as ApiResponse<string>
    return response.success
  },

  async importFromMedium(): Promise<{ count: number; data: BlogPost[] }> {
    const response = await api.get("/blog/import-medium") as ApiResponse<BlogPost[]>
    return { count: response.count || 0, data: (response.data || []).map(mapBlogPost) }
  },
}
