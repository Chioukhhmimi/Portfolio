import React from "react"
import { Pencil, Copy, Archive, Trash2, MoreHorizontal } from "lucide-react"
import { Project } from "@/admin/types/project"

interface ProjectActionsMenuProps {
  project: Project
  onEdit: () => void
  onDuplicate: () => void
  onArchive: () => void
  onUnarchive: () => void
  onDelete: () => void
}

export function ProjectActionsMenu({
  project,
  onEdit,
  onDuplicate,
  onArchive,
  onUnarchive,
  onDelete,
}: ProjectActionsMenuProps) {
  return (
    <div className="relative group">
      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
      <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        <div className="py-1">
          <button
            onClick={onEdit}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onDuplicate}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
          <div className="border-t border-gray-200 my-1" />
          <button
            onClick={project.status === "archived" ? onUnarchive : onArchive}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Archive className="w-4 h-4" />
            {project.status === "archived" ? "Unarchive" : "Archive"}
          </button>
          <div className="border-t border-gray-200 my-1" />
          <button
            onClick={onDelete}
            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}