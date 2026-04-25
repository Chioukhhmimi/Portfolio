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
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<ProjectStatus | "">("")
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

  const handleArchive = async (id: string) => {
    await projectsService.archive(id)
    await loadProjects()
  }

  const handleUnarchive = async (id: string) => {
    await projectsService.update(id, { status: "draft" })
    await loadProjects()
  }

  const handleDuplicate = async (id: string) => {
    const duplicated = await projectsService.duplicate(id)
    if (duplicated) {
      navigate(`/admin/projects/${duplicated.id}/edit`)
    }
  }

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.tag.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

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

        {filteredProjects.length === 0 ? (
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
            projects={filteredProjects}
            onEdit={(id) => navigate(`/admin/projects/${id}/edit`)}
            onDuplicate={handleDuplicate}
            onArchive={handleArchive}
            onUnarchive={handleUnarchive}
            onDelete={(id) => setDeleteId(id)}
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