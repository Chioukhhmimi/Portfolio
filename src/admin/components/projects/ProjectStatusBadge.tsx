import React from "react"
import { cn } from "@/lib/utils"
import { ProjectStatus } from "@/admin/types/project"

interface ProjectStatusBadgeProps {
  status: ProjectStatus
  className?: string
}

const statusStyles: Record<ProjectStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-yellow-100 text-yellow-700",
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}