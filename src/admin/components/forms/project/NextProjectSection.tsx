import React from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"

interface NextProjectSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
}

export function NextProjectSection({ register, errors }: NextProjectSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Next Project <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500">The project shown at the end of this case study</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Title</label>
          <input
            {...register("nextProject.title")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., FocusCare — Pre-Surgical Clinical Workflow Platform"
          />
          {errors.nextProject?.title && (
            <p className="text-sm text-red-600 mt-1">{errors.nextProject.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">URL</label>
          <input
            {...register("nextProject.url")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., focuscare"
          />
          <p className="text-xs text-gray-400 mt-1">The project ID (used in /projects/:id)</p>
          {errors.nextProject?.url && (
            <p className="text-sm text-red-600 mt-1">{errors.nextProject.url.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}