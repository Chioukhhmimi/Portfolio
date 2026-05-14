import { api } from "../lib/apiClient"

interface ApiResponse<T> {
  success: boolean
  data?: T
  count?: number
  message?: string
}

export interface Message {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  read: boolean
  createdAt: string
}

const mapMessage = (msg: any): Message => ({
  id: msg._id,
  name: msg.name,
  email: msg.email,
  phone: msg.phone,
  message: msg.message,
  read: msg.read || false,
  createdAt: msg.createdAt,
})

export const messagesService = {
  async getMessages(): Promise<Message[]> {
    const response = await api.get("/messages") as ApiResponse<Message[]>
    return (response.data || []).map(mapMessage)
  },

  async getMessageById(id: string): Promise<Message | undefined> {
    const response = await api.get(`/messages/${id}`) as ApiResponse<Message>
    return response.data ? mapMessage(response.data) : undefined
  },

  async markAsRead(id: string): Promise<Message | undefined> {
    const response = await api.patch(`/messages/${id}/read`) as ApiResponse<Message>
    return response.data ? mapMessage(response.data) : undefined
  },

  async deleteMessage(id: string): Promise<boolean> {
    const response = await api.delete(`/messages/${id}`) as ApiResponse<string>
    return response.success
  },

  async getUnreadCount(): Promise<number> {
    const messages = await this.getMessages()
    return messages.filter(m => !m.read).length
  },
}