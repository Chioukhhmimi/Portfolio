import React from "react"
import { UseFormRegister, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScreensSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
  fieldArray: {
    append: UseFieldArrayAppend<ProjectFormValues, "screens">
    remove: UseFieldArrayRemove
    fields: { id: string }[]
  }
}

export function ScreensSection({ register, errors, fieldArray }: ScreensSectionProps) {
  const { append, remove, fields } = fieldArray

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Screens</label>
          <p className="text-xs text-gray-500">Project screenshots and images</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ label: "", src: "" })}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Screen
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-400 italic">No screens added yet.</p>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Screen {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Label</label>
                <input
                  {...register(`screens.${index}.label` as const)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., Dashboard Overview"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Image Src</label>
                <input
                  {...register(`screens.${index}.src` as const)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., dadycar-Dashboard"
                />
                <p className="text-xs text-gray-400 mt-1">Public image path or URL</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}