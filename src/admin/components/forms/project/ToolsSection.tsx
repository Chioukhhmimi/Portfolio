import React from "react"
import { UseFormRegister, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolsSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
  fieldArray: {
    append: UseFieldArrayAppend<ProjectFormValues, "tools">
    remove: UseFieldArrayRemove
    fields: { id: string }[]
  }
}

export function ToolsSection({ register, errors, fieldArray }: ToolsSectionProps) {
  const { append, remove, fields } = fieldArray

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tools</label>
          <p className="text-xs text-gray-500">Design and development tools used</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Tool
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-400 italic">No tools added yet.</p>
      )}

      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-1">
            <input
              {...register(`tools.${index}` as const)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="e.g., Figma"
              style={{ width: "120px" }}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}