import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Save, ArrowLeft, Loader2 } from "lucide-react"
import { PageHeader, LoadingState } from "../components/ui"
import { projectsService } from "../services"
import { Project, ProjectStatus } from "../types"
import { PROJECT_STATUS_OPTIONS, INDUSTRY_OPTIONS } from "../constants"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Description is required"),
  clientName: z.string().min(1, "Client name is required"),
  industry: z.string().min(1, "Industry is required"),
  role: z.string().min(1, "Role is required"),
  year: z.string().min(1, "Year is required"),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean(),
  order: z.number(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

type ProjectFormData = z.infer<typeof projectSchema>

export function ProjectForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const [loading, setLoading] = React.useState(isEditing)
  const [saving, setSaving] = React.useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "draft",
      featured: false,
      order: 1,
      tags: [],
    },
  })

  React.useEffect(() => {
    if (isEditing && id) {
      loadProject(id)
    }
  }, [id])

  const loadProject = async (projectId: string) => {
    const project = await projectsService.getById(projectId)
    if (project) {
      reset({
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        clientName: project.clientName,
        industry: project.industry,
        role: project.role,
        year: project.year,
        status: project.status,
        featured: project.featured,
        order: project.order,
        seoTitle: project.seoTitle,
        seoDescription: project.seoDescription,
        tags: project.tags,
      })
    }
    setLoading(false)
  }

  const onSubmit = async (data: ProjectFormData) => {
    setSaving(true)
    try {
      if (isEditing && id) {
        await projectsService.update(id, data)
      } else {
        await projectsService.create(data)
      }
      navigate("/admin/projects")
    } catch (error) {
      console.error("Error saving project:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader 
          title={isEditing ? "Edit Project" : "New Project"}
          action={{ label: "Back to Projects", href: "/admin/projects" }}
        />
        <LoadingState />
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title={isEditing ? "Edit Project" : "New Project"}
        action={{ label: "Back to Projects", href: "/admin/projects" }}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  {...register("title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Project title"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  {...register("slug")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="project-slug"
                />
                {errors.slug && (
                  <p className="text-sm text-red-600 mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea
                  {...register("shortDescription")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Brief description of the project"
                />
                {errors.shortDescription && (
                  <p className="text-sm text-red-600 mt-1">{errors.shortDescription.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  {...register("clientName")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Client or company name"
                />
                {errors.clientName && (
                  <p className="text-sm text-red-600 mt-1">{errors.clientName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  {...register("industry")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-sm text-red-600 mt-1">{errors.industry.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  {...register("role")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., Product Designer"
                />
                {errors.role && (
                  <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  {...register("year")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., 2024-2025"
                />
                {errors.year && (
                  <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  {PROJECT_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input
                  type="number"
                  {...register("order", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("featured")}
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Mark as featured project</span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input
                  {...register("seoTitle")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea
                  {...register("seoDescription")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="SEO optimized description"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm