import React from "react"
import { UseFormRegister, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LearningsSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
  fieldArray: {
    append: UseFieldArrayAppend<ProjectFormValues, "learnings">
    remove: UseFieldArrayRemove
    fields: { id: string }[]
  }
}

export function LearningsSection({ register, errors, fieldArray }: LearningsSectionProps) {
  const { append, remove, fields } = fieldArray

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Learnings <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500">Key lessons from this project</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: "", body: "" })}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Learning
        </Button>
      </div>

      {errors.learnings && (
        <p className="text-sm text-red-600">{errors.learnings.message || "At least one learning is required"}</p>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Learning {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Title</label>
              <input
                {...register(`learnings.${index}.title` as const)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Key lesson title"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Description</label>
              <textarea
                {...register(`learnings.${index}.body` as const)}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="What did you learn?"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}