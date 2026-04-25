import React from "react"
import { UseFormRegister, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DesignChallengesSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
  fieldArray: {
    append: UseFieldArrayAppend<ProjectFormValues, "designChallenges">
    remove: UseFieldArrayRemove
    fields: { id: string }[]
  }
}

export function DesignChallengesSection({ register, errors, fieldArray }: DesignChallengesSectionProps) {
  const { append, remove, fields } = fieldArray

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Design Challenges <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500">Main deep-dive sections of the case study</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              number: String(fields.length + 1).padStart(2, "0"),
              title: "",
              problem: "",
              solution: "",
              insight: "",
            })
          }
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Challenge
        </Button>
      </div>

      {errors.designChallenges && (
        <p className="text-sm text-red-600">{errors.designChallenges.message || "At least one design challenge is required"}</p>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Challenge {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Number</label>
                <input
                  {...register(`designChallenges.${index}.number` as const)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="01"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-600 mb-1">Title</label>
                <input
                  {...register(`designChallenges.${index}.title` as const)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Challenge title"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Problem</label>
              <textarea
                {...register(`designChallenges.${index}.problem` as const)}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="What was the design problem?"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Solution</label>
              <textarea
                {...register(`designChallenges.${index}.solution` as const)}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="How did you solve it?"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Key Insight</label>
              <textarea
                {...register(`designChallenges.${index}.insight` as const)}
                rows={2}
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