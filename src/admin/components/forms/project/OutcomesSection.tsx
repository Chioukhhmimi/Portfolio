import React from "react"
import { UseFormRegister, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OutcomesSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
  fieldArray: {
    append: UseFieldArrayAppend<ProjectFormValues, "outcomes">
    remove: UseFieldArrayRemove
    fields: { id: string }[]
  }
}

export function OutcomesSection({ register, errors, fieldArray }: OutcomesSectionProps) {
  const { append, remove, fields } = fieldArray

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Outcomes <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500">Key results and achievements</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Outcome
        </Button>
      </div>

      {errors.outcomes && (
        <p className="text-sm text-red-600">{errors.outcomes.message || "At least one outcome is required"}</p>
      )}

      {fields.length === 0 && (
        <p className="text-sm text-gray-400 italic">No outcomes added yet.</p>
      )}

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              {...register(`outcomes.${index}` as const)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="e.g., App store rating improved from 2.8 to 4.5 stars"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}