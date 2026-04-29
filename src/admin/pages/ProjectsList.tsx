import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Plus, Search, Filter } from "lucide-react"
import {
  PageHeader,
  LoadingState,
  EmptyState,
  SearchInput,
  SelectInput,
  ConfirmDialog,
} from "@/admin/components/ui"
import { ProjectsTable } from "@/admin/components/projects"
import { projectsService } from "@/admin/services/projectsService"
import { Project, ProjectStatus } from "@/admin/types/project"
import { PROJECT_STATUS_OPTIONS } from "@/admin/constants"
import { Button } from "@/components/ui/button"

export function ProjectsList() {
  const navigate = useNavigate()
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<ProjectStatus | "">("")
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [actionLoading, setActionLoading] = React.useState<string | null>(null)

  const debouncedSearch = React.useRef<string>("")
  const searchTimeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    loadProjects()
  }, [])

  React.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      debouncedSearch.current = search
      loadProjects()
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [search])

  React.useEffect(() => {
    loadProjects()
  }, [statusFilter])

  const loadProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const filters: Parameters<typeof projectsService.getAllProjects>[0] = {
        status: statusFilter || undefined,
        search: debouncedSearch.current || undefined,
      }
      const response = await projectsService.getAllProjects(filters)
      setProjects(response.data)
    } catch (err) {
      console.error("Error loading projects:", err)
      setError(err instanceof Error ? err.message : "Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setActionLoading(deleteId)
    try {
      await projectsService.deleteProject(deleteId)
      await loadProjects()
    } catch (err) {
      console.error("Error deleting project:", err)
      setError(err instanceof Error ? err.message : "Failed to delete project")
    } finally {
      setDeleteId(null)
      setActionLoading(null)
    }
  }

  const handleArchive = async (id: string) => {
    setActionLoading(id)
    try {
      await projectsService.archiveProject(id)
      await loadProjects()
    } catch (err) {
      console.error("Error archiving project:", err)
      setError(err instanceof Error ? err.message : "Failed to archive project")
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnarchive = async (id: string) => {
    setActionLoading(id)
    try {
      await projectsService.updateProjectStatus(id, "draft")
      await loadProjects()
    } catch (err) {
      console.error("Error unarchiving project:", err)
      setError(err instanceof Error ? err.message : "Failed to restore project")
    } finally {
      setActionLoading(null)
    }
  }

  const handleDuplicate = async (id: string) => {
    setActionLoading(id)
    try {
      const response = await projectsService.duplicateProject(id)
      if (response.success && response.data) {
        await loadProjects()
        navigate(`/admin/projects/${response.data.id}/edit`)
      }
    } catch (err) {
      console.error("Error duplicating project:", err)
      setError(err instanceof Error ? err.message : "Failed to duplicate project")
    } finally {
      setActionLoading(null)
    }
  }

  const handleStatusToggle = async (id: string, currentStatus: ProjectStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published"
    setActionLoading(id)
    try {
      await projectsService.updateProjectStatus(id, newStatus)
      await loadProjects()
    } catch (err) {
      console.error("Error updating status:", err)
      setError(err instanceof Error ? err.message : "Failed to update status")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReorder = async (newOrder: { id: string; order: number }[]) => {
    try {
      await projectsService.reorderProjects(newOrder)
      await loadProjects()
    } catch (err) {
      console.error("Error reordering projects:", err)
      setError(err instanceof Error ? err.message : "Failed to reorder projects")
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Projects"
          description="Manage portfolio case studies"
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
        description="Manage portfolio case studies"
        action={{ label: "Add Project", href: "/admin/projects/new" }}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchInput
              placeholder="Search projects..."
              value={search}
              onChange={setSearch}
            />
          </div>
          <SelectInput
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as ProjectStatus | "")}
            options={PROJECT_STATUS_OPTIONS}
            placeholder="All Status"
          />
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description={
              search || statusFilter
                ? "Try adjusting your filters"
                : "Get started by creating your first project"
            }
            action={
              !search && !statusFilter
                ? { label: "Add Project", href: "/admin/projects/new" }
                : undefined
            }
          />
        ) : (
          <ProjectsTable
            projects={projects}
            onEdit={(id) => navigate(`/admin/projects/${id}/edit`)}
            onDuplicate={handleDuplicate}
            onArchive={handleArchive}
            onUnarchive={handleUnarchive}
            onDelete={(id) => setDeleteId(id)}
            loadingId={actionLoading}
          />
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