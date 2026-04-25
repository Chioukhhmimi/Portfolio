import React from "react"
import { Link } from "react-router-dom"
import { Project } from "@/admin/types/project"
import { ProjectStatusBadge } from "./ProjectStatusBadge"
import { ProjectActionsMenu } from "./ProjectActionsMenu"

interface ProjectsTableProps {
  projects: Project[]
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onArchive: (id: string) => void
  onUnarchive: (id: string) => void
  onDelete: (id: string) => void
}

export function ProjectsTable({
  projects,
  onEdit,
  onDuplicate,
  onArchive,
  onUnarchive,
  onDelete,
}: ProjectsTableProps) {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
            Project
          </th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
            Client
          </th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
            Year
          </th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
            Status
          </th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
            Order
          </th>
          <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {projects.map((project) => (
          <tr key={project.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <Link
                to={`/admin/projects/${project.id}/edit`}
                className="font-medium text-gray-900 hover:text-gray-600 block"
              >
                {project.title}
              </Link>
              <p className="text-sm text-gray-500">{project.tag}</p>
            </td>
            <td className="px-6 py-4 text-gray-500">{project.client}</td>
            <td className="px-6 py-4 text-gray-500">{project.year}</td>
            <td className="px-6 py-4">
              <ProjectStatusBadge status={project.status} />
            </td>
            <td className="px-6 py-4 text-gray-500">{project.order}</td>
            <td className="px-6 py-4">
              <div className="flex items-center justify-end">
                <ProjectActionsMenu
                  project={project}
                  onEdit={() => onEdit(project.id)}
                  onDuplicate={() => onDuplicate(project.id)}
                  onArchive={() => onArchive(project.id)}
                  onUnarchive={() => onUnarchive(project.id)}
                  onDelete={() => onDelete(project.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}