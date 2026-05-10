import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"
import {
  PageHeader,
  LoadingState,
  EmptyState,
  ConfirmDialog,
} from "@/admin/components/ui"
import { clientsService, Client } from "@/admin/services/clientsService"

export function ClientsList() {
  const navigate = useNavigate()
  const [clients, setClients] = React.useState<Client[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [actionLoading, setActionLoading] = React.useState<string | null>(null)

  React.useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await clientsService.getClients()
      setClients(response.data)
    } catch (err) {
      console.error("Error loading clients:", err)
      setError(err instanceof Error ? err.message : "Failed to load clients")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setActionLoading(deleteId)
    try {
      await clientsService.deleteClient(deleteId)
      await loadClients()
    } catch (err) {
      console.error("Error deleting client:", err)
      setError(err instanceof Error ? err.message : "Failed to delete client")
    } finally {
      setDeleteId(null)
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Clients"
          description="Manage client logos shown on the homepage"
          action={{ label: "Add Client", href: "/admin/clients/new" }}
        />
        <LoadingState />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Manage client logos shown on the homepage"
        action={{ label: "Add Client", href: "/admin/clients/new" }}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {clients.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <EmptyState
            title="No clients yet"
            description="Get started by adding your first client logo"
            action={{ label: "Add Client", href: "/admin/clients/new" }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clients.map((client) => (
            <div
              key={client._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="aspect-[3/2] bg-gray-50 flex items-center justify-center p-6">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-4 border-t border-gray-200 flex items-center justify-between gap-2">
                <p
                  className="font-medium text-gray-900 truncate"
                  title={client.name}
                >
                  {client.name}
                </p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => navigate(`/admin/clients/${client.id}/edit`)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(client.id)}
                    disabled={actionLoading === client.id}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Client"
        message="Are you sure you want to delete this client? The logo will also be removed from Cloudinary. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default ClientsList
