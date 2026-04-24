import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Plus, Pencil, Trash2, Archive, Eye } from "lucide-react"
import { 
  PageHeader, 
  LoadingState, 
  EmptyState, 
  StatusBadge,
  SearchInput,
  SelectInput,
  ToolbarActions,
  ConfirmDialog
} from "../components/ui"
import { projectsService } from "../services"
import { Project, ProjectStatus } from "../types"
import { PROJECT_STATUS_OPTIONS } from "../constants"

export function ProjectsList() {
  const navigate = useNavigate()
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  React.useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const data = await projectsService.getAll()
    setProjects(data)
    setLoading(false)
  }

  const handleDelete = async () => {
    if (deleteId) {
      await projectsService.delete(deleteId)
      await loadProjects()
      setDeleteId(null)
    }
  }

  const filteredProjects = projects.filter(p => {
    const matchesSearch = !search || 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div>
        <PageHeader 
          title="Projects" 
          description="Manage your case studies"
          action={{ label: "Add Project", href: "/admin/projects/new" }}
        />
        <LoadingState />
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Projects" 
        description="Manage your case studies"
        action={{ label: "Add Project", href: "/admin/projects/new" }}
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <SearchInput placeholder="Search projects..." value={search} onChange={setSearch} />
          <SelectInput
            value={statusFilter}
            onChange={setStatusFilter}
            options={PROJECT_STATUS_OPTIONS as { label: string; value: string }[]}
            placeholder="All Status"
          />
        </div>

        {filteredProjects.length === 0 ? (
          <EmptyState 
            title="No projects found"
            description={search || statusFilter ? "Try adjusting your filters" : "Get started by creating your first project"}
            action={!search && !statusFilter ? { label: "Add Project", href: "/admin/projects/new" } : undefined}
          />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Project</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Client</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Featured</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link to={`/admin/projects/${project.id}/edit`} className="font-medium text-gray-900 hover:text-gray-600">
                      {project.title}
                    </Link>
                    <p className="text-sm text-gray-500">{project.shortDescription.slice(0, 60)}...</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{project.clientName}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={project.status} type="project" />
                  </td>
                  <td className="px-6 py-4">
                    {project.featured ? (
                      <span className="text-sm text-green-600">★ Featured</span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(project.id)}
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default ProjectsList