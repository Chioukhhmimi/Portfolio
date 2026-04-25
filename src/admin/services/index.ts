import { BlogPost, Message, DashboardStats, ActivityItem } from '../types'
import { mockBlogPosts, mockMessages, mockDashboardStats, mockActivity } from '../data/mockData'
import { projectsService } from '../services/projectsService'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export { projectsService }

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    await delay(300)
    return [...mockBlogPosts]
  },

  async getById(id: string): Promise<BlogPost | undefined> {
    await delay(200)
    return mockBlogPosts.find(b => b.id === id)
  },

  async create(data: Partial<BlogPost>): Promise<BlogPost> {
    await delay(400)
    const newPost: BlogPost = {
      id: String(Date.now()),
      title: data.title || 'Untitled Post',
      slug: data.slug || 'untitled-post',
      mediumUrl: data.mediumUrl,
      excerpt: data.excerpt,
      readingTime: data.readingTime,
      tags: data.tags || [],
      status: data.status || 'draft',
      featured: data.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockBlogPosts.push(newPost)
    return newPost
  },

  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost | undefined> {
    await delay(400)
    const index = mockBlogPosts.findIndex(b => b.id === id)
    if (index === -1) return undefined
    mockBlogPosts[index] = { ...mockBlogPosts[index], ...data, updatedAt: new Date().toISOString() }
    return mockBlogPosts[index]
  },

  async delete(id: string): Promise<boolean> {
    await delay(300)
    const index = mockBlogPosts.findIndex(b => b.id === id)
    if (index === -1) return false
    mockBlogPosts.splice(index, 1)
    return true
  },

  async importFromMedium(url: string) {
    await delay(500)
    return {
      mediumUrl: url,
      title: 'Imported from Medium',
      excerpt: 'This is a placeholder for auto-fetched content from Medium.',
      readingTime: 5,
      importedMetadata: {
        author: 'Medium Author',
        publishedAt: new Date().toISOString(),
        wordCount: 1000,
      }
    }
  },

  async getStats() {
    await delay(200)
    return {
      total: mockBlogPosts.length,
      published: mockBlogPosts.filter(b => b.status === 'published').length,
      draft: mockBlogPosts.filter(b => b.status === 'draft').length,
    }
  }
}

export const messagesService = {
  async getAll(): Promise<Message[]> {
    await delay(300)
    return [...mockMessages]
  },

  async getById(id: string): Promise<Message | undefined> {
    await delay(200)
    return mockMessages.find(m => m.id === id)
  },

  async markAsRead(id: string): Promise<Message | undefined> {
    await delay(200)
    const index = mockMessages.findIndex(m => m.id === id)
    if (index === -1) return undefined
    mockMessages[index].status = 'read'
    return mockMessages[index]
  },

  async markAsUnread(id: string): Promise<Message | undefined> {
    await delay(200)
    const index = mockMessages.findIndex(m => m.id === id)
    if (index === -1) return undefined
    mockMessages[index].status = 'unread'
    return mockMessages[index]
  },

  async archive(id: string): Promise<Message | undefined> {
    await delay(200)
    const index = mockMessages.findIndex(m => m.id === id)
    if (index === -1) return undefined
    mockMessages[index].status = 'archived'
    return mockMessages[index]
  },

  async delete(id: string): Promise<boolean> {
    await delay(300)
    const index = mockMessages.findIndex(m => m.id === id)
    if (index === -1) return false
    mockMessages.splice(index, 1)
    return true
  },

  async getStats() {
    await delay(200)
    return {
      total: mockMessages.length,
      unread: mockMessages.filter(m => m.status === 'unread').length,
      read: mockMessages.filter(m => m.status === 'read').length,
      archived: mockMessages.filter(m => m.status === 'archived').length,
    }
  }
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    await delay(200)
    return { ...mockDashboardStats }
  },

  async getRecentActivity(): Promise<ActivityItem[]> {
    await delay(300)
    return [...mockActivity]
  }
}