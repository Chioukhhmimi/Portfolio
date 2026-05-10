import { api } from "../lib/apiClient"

export interface Client {
  _id: string
  id: string
  name: string
  logo: string
  order: number
  createdAt: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  count?: number
  message?: string
}

export const clientsService = {
  async getClients(): Promise<{ success: boolean; count: number; data: Client[] }> {
    const response = await api.get(`/clients`) as ApiResponse<Client[]>
    return {
      success: true,
      count: response.count || response.data?.length || 0,
      data: response.data || [],
    }
  },

  async getClientById(id: string): Promise<{ success: boolean; data?: Client }> {
    const response = await api.get(`/clients`) as ApiResponse<Client[]>
    const client = response.data?.find(c => c.id === id)
    return { success: true, data: client }
  },

  async createClient(clientData: { id: string; name: string; logo: string }): Promise<{ success: boolean; data: Client }> {
    const response = await api.post("/clients", clientData) as ApiResponse<Client>
    return { success: true, data: response.data as Client }
  },

  async createClientWithImage(formData: FormData): Promise<{ success: boolean; data: Client }> {
    const response = await api.postFormData("/clients", formData) as ApiResponse<Client>
    return { success: true, data: response.data as Client }
  },

  async updateClient(id: string, formData: FormData): Promise<{ success: boolean; data: Client }> {
    const response = await api.putFormData(`/clients/${id}`, formData) as ApiResponse<Client>
    return { success: true, data: response.data as Client }
  },

  async deleteClient(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/clients/${id}`) as ApiResponse<string>
    return { success: true, message: response.message || "Client deleted" }
  },
}
