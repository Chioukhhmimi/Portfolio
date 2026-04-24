import * as React from "react"
import { Link } from "react-router-dom"
import { FolderKanban, FileText, MessageSquare, Plus, ArrowRight } from "lucide-react"
import { PageHeader, StatsCard, LoadingState } from "../components/ui"
import { dashboardService } from "../services"

export function AdminDashboard() {
  const [stats, setStats] = React.useState<ReturnType<typeof dashboardService.getStats> | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dashboardService.getStats().then((data) => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div>
        <PageHeader title="Dashboard" description="Welcome back!" />
        <LoadingState />
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back!" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard label="Total Projects" value={stats?.totalProjects || 0} />
        <StatsCard label="Published Projects" value={stats?.publishedProjects || 0} />
        <StatsCard label="Blog Posts" value={stats?.totalBlogPosts || 0} />
        <StatsCard label="Unread Messages" value={stats?.unreadMessages || 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/admin/projects/new"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderKanban className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Add Project</p>
                <p className="text-sm text-gray-500">Create a new case study</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/admin/blog/new"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Add Blog Post</p>
                <p className="text-sm text-gray-500">Write or import from Medium</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">View Messages</p>
                <p className="text-sm text-gray-500">
                  {stats?.unreadMessages || 0} unread messages
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Projects Summary</h3>
            <Link to="/admin/projects" className="text-sm text-gray-500 hover:text-gray-900">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Published</span>
              <span className="font-medium text-gray-900">{stats?.publishedProjects}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Drafts</span>
              <span className="font-medium text-gray-900">{stats?.draftProjects}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Archived</span>
              <span className="font-medium text-gray-900">{stats?.archivedProjects}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Messages</h3>
            <Link to="/admin/messages" className="text-sm text-gray-500 hover:text-gray-900">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Unread</span>
              <span className="font-medium text-gray-900">{stats?.unreadMessages}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Read</span>
              <span className="font-medium text-gray-900">{stats?.readMessages}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Archived</span>
              <span className="font-medium text-gray-900">{stats?.archivedMessages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard