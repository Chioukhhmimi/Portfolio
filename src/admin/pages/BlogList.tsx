import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Pencil, Trash2, ExternalLink } from "lucide-react"
import { 
  PageHeader, 
  LoadingState, 
  EmptyState, 
  StatusBadge,
  SearchInput,
  SelectInput,
  ConfirmDialog
} from "../components/ui"
import { blogService } from "../services"
import { BlogPost } from "../types"
import { BLOG_STATUS_OPTIONS } from "../constants"

export function BlogList() {
  const navigate = useNavigate()
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  React.useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const data = await blogService.getAll()
    setPosts(data)
    setLoading(false)
  }

  const handleDelete = async () => {
    if (deleteId) {
      await blogService.delete(deleteId)
      await loadPosts()
      setDeleteId(null)
    }
  }

  const filteredPosts = posts.filter(p => {
    const matchesSearch = !search || 
      p.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div>
        <PageHeader 
          title="Blog" 
          description="Manage your blog posts"
          action={{ label: "Add Blog Post", href: "/admin/blog/new" }}
        />
        <LoadingState />
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Blog" 
        description="Manage your blog posts"
        action={{ label: "Add Blog Post", href: "/admin/blog/new" }}
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <SearchInput placeholder="Search posts..." value={search} onChange={setSearch} />
          <SelectInput
            value={statusFilter}
            onChange={setStatusFilter}
            options={BLOG_STATUS_OPTIONS as { label: string; value: string }[]}
            placeholder="All Status"
          />
        </div>

        {filteredPosts.length === 0 ? (
          <EmptyState 
            title="No posts found"
            description={search || statusFilter ? "Try adjusting your filters" : "Get started by creating your first post"}
            action={!search && !statusFilter ? { label: "Add Blog Post", href: "/admin/blog/new" } : undefined}
          />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Reading Time</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link to={`/admin/blog/${post.id}/edit`} className="font-medium text-gray-900 hover:text-gray-600">
                      {post.title}
                    </Link>
                    {post.mediumUrl && (
                      <a 
                        href={post.mediumUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 ml-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <p className="text-sm text-gray-500">{post.excerpt?.slice(0, 60)}...</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={post.status} type="blog" />
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {post.readingTime ? `${post.readingTime} min` : "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {post.publishDate 
                      ? new Date(post.publishDate).toLocaleDateString()
                      : new Date(post.createdAt).toLocaleDateString()
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/blog/${post.id}/edit`)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {post.mediumUrl && (
                        <a 
                          href={post.mediumUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="View on Medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => setDeleteId(post.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default BlogList