import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Save, ArrowLeft, Loader2, Link2 } from "lucide-react"
import { PageHeader, LoadingState } from "../components/ui"
import { blogService } from "../services"
import { BlogPost } from "../types"
import { BLOG_STATUS_OPTIONS } from "../constants"

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  mediumUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  excerpt: z.string().optional(),
  readingTime: z.number().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean(),
  coverImage: z.string().optional(),
})

type BlogFormData = z.infer<typeof blogSchema>

export function BlogForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const [loading, setLoading] = React.useState(isEditing)
  const [saving, setSaving] = React.useState(false)
  const [importing, setImporting] = React.useState(false)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      status: "draft",
      featured: false,
      tags: [],
    },
  })

  const mediumUrl = watch("mediumUrl")

  React.useEffect(() => {
    if (isEditing && id) {
      loadPost(id)
    }
  }, [id])

  const loadPost = async (postId: string) => {
    const post = await blogService.getById(postId)
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        mediumUrl: post.mediumUrl,
        excerpt: post.excerpt,
        readingTime: post.readingTime,
        tags: post.tags,
        status: post.status,
        featured: post.featured,
        coverImage: post.coverImage,
      })
    }
    setLoading(false)
  }

  const handleImport = async () => {
    if (!mediumUrl) return
    
    setImporting(true)
    try {
      const data = await blogService.importFromMedium(mediumUrl)
      if (data.title) setValue("title", data.title)
      if (data.excerpt) setValue("excerpt", data.excerpt)
      if (data.readingTime) setValue("readingTime", data.readingTime)
    } catch (error) {
      console.error("Error importing from Medium:", error)
    } finally {
      setImporting(false)
    }
  }

  const onSubmit = async (data: BlogFormData) => {
    setSaving(true)
    try {
      if (isEditing && id) {
        await blogService.update(id, data)
      } else {
        await blogService.create(data)
      }
      navigate("/admin/blog")
    } catch (error) {
      console.error("Error saving post:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader 
          title={isEditing ? "Edit Blog Post" : "New Blog Post"}
          action={{ label: "Back to Blog", href: "/admin/blog" }}
        />
        <LoadingState />
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title={isEditing ? "Edit Blog Post" : "New Blog Post"}
        action={{ label: "Back to Blog", href: "/admin/blog" }}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Import from Medium</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  {...register("mediumUrl")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="https://medium.com/@username/article-slug"
                />
              </div>
              <button
                type="button"
                onClick={handleImport}
                disabled={!mediumUrl || importing}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {importing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Link2 className="w-4 h-4" />
                )}
                {importing ? "Importing..." : "Import"}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Paste a Medium URL to auto-fill metadata. You can always edit manually.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  {...register("title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Blog post title"
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
                  placeholder="blog-post-slug"
                />
                {errors.slug && (
                  <p className="text-sm text-red-600 mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  {...register("excerpt")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Brief description or excerpt"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reading Time (minutes)</label>
                <input
                  type="number"
                  {...register("readingTime", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  {BLOG_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input
                  {...register("coverImage")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("featured")}
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Mark as featured post</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/blog")}
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
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm