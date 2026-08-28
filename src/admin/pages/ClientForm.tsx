// @ts-nocheck
import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Loader2, Upload, X, Check } from "lucide-react"
import { PageHeader, LoadingState } from "@/admin/components/ui"
import { clientsService } from "@/admin/services/clientsService"
import { Button } from "@/components/ui/button"

export function ClientForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [loading, setLoading] = React.useState(isEditing)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [toast, setToast] = React.useState<{ show: boolean; message: string; isError?: boolean }>({
    show: false,
    message: "",
  })

  const [name, setName] = React.useState("")
  const [order, setOrder] = React.useState<string>("")
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string>("")
  const [existingImage, setExistingImage] = React.useState<string>("")

  React.useEffect(() => {
    if (isEditing && id) {
      loadClient(id)
    }
  }, [id])

  const loadClient = async (clientId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await clientsService.getClientById(clientId)
      if (response.success && response.data) {
        setName(response.data.name)
        setOrder(String(response.data.order ?? ""))
        setExistingImage(response.data.logo)
      } else {
        setError("Client not found")
      }
    } catch (err) {
      console.error("Error loading client:", err)
      setError(err instanceof Error ? err.message : "Failed to load client")
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: string, isError = false) => {
    setToast({ show: true, message, isError })
    setTimeout(() => setToast({ show: false, message: "" }), 3000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setImageFile(null)
    setImagePreview("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!isEditing && !imageFile) {
      setError("Logo image is required")
      return
    }

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("name", name.trim())
      if (order !== "") formData.append("order", order)
      if (imageFile) formData.append("image", imageFile)

      if (isEditing && id) {
        await clientsService.updateClient(id, formData)
        showToast("Client saved successfully!")
        setTimeout(() => navigate("/admin/clients"), 600)
      } else {
        await clientsService.createClientWithImage(formData)
        showToast("Client created successfully!")
        setTimeout(() => navigate("/admin/clients"), 600)
      }
    } catch (err) {
      console.error("Error saving client:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to save client"
      setError(errorMessage)
      showToast(errorMessage, true)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          title={isEditing ? "Edit Client" : "New Client"}
          action={{ label: "Back to Clients", href: "/admin/clients" }}
        />
        <LoadingState />
      </div>
    )
  }

  if (error && isEditing && !loading && !name) {
    return (
      <div>
        <PageHeader
          title={isEditing ? "Edit Client" : "New Client"}
          action={{ label: "Back to Clients", href: "/admin/clients" }}
        />
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Client Not Found</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button onClick={() => navigate("/admin/clients")}>Back to Clients</Button>
        </div>
      </div>
    )
  }

  const previewSrc = imagePreview || existingImage

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title={isEditing ? "Edit Client" : "New Client"}
        action={{ label: "Back to Clients", href: "/admin/clients" }}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client / company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
              Order
            </label>
            <input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first. Leave blank to append at the end.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo Image {!isEditing && <span className="text-red-500">*</span>}
            </label>

            {previewSrc ? (
              <div className="relative inline-block">
                <div className="w-48 h-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center p-4">
                  <img
                    src={previewSrc}
                    alt="Logo preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 p-1 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                    title="Remove uploaded image"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            ) : null}

            <div className="mt-3">
              <label
                htmlFor="image"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                {previewSrc ? "Replace Image" : "Upload Image"}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, or SVG. Transparent background recommended.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/clients")}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isEditing ? "Save Changes" : "Create Client"}
          </Button>
        </div>
      </form>

      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.isError ? "bg-red-600" : "bg-green-600"
          }`}
        >
          <Check className="w-4 h-4" />
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default ClientForm
