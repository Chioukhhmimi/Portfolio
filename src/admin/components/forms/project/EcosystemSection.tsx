import React from "react"
import { UseFormRegister, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, useWatch } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EcosystemSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
  fieldArray: {
    append: UseFieldArrayAppend<ProjectFormValues, "ecosystem">
    remove: UseFieldArrayRemove
    fields: { id: string }[]
  }
}

export function EcosystemSection({ register, errors, fieldArray }: EcosystemSectionProps) {
  const { append, remove, fields } = fieldArray
  const ecosystemValues = useWatch({ name: "ecosystem" }) as ProjectFormValues["ecosystem"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ecosystem</label>
          <p className="text-xs text-gray-500">Only for projects with multiple products (e.g., Shihany)</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({ name: "", type: "", user: "", description: "" })
          }
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-400 italic">
          No ecosystem products added. Leave empty if not applicable.
        </p>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Product {index + 1}
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
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  {...register(`ecosystem.${index}.name` as const)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., Shihany Hub"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Type</label>
                <input
                  {...register(`ecosystem.${index}.type` as const)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., Web, Mobile"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Target User</label>
              <input
                {...register(`ecosystem.${index}.user` as const)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="e.g., Club owners & admin staff"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Description</label>
              <textarea
                {...register(`ecosystem.${index}.description` as const)}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="The operational center..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}