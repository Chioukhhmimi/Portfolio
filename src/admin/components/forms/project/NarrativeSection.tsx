import React from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"

interface NarrativeSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
}

export function NarrativeSection({ register, errors }: NarrativeSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Context <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("context")}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="The market or user problem that led to this project..."
        />
        {errors.context && (
          <p className="text-sm text-red-600 mt-1">{errors.context.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Insight <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("userInsight")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="Key insight that shaped design decisions..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Short strategic insight highlighted in the case study
        </p>
        {errors.userInsight && (
          <p className="text-sm text-red-600 mt-1">{errors.userInsight.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overview <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("overview")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="What did you build? Summarize the scope and deliverables..."
        />
        {errors.overview && (
          <p className="text-sm text-red-600 mt-1">{errors.overview.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Challenge <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("challenge")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="What was the problem you needed to solve?"
        />
        {errors.challenge && (
          <p className="text-sm text-red-600 mt-1">{errors.challenge.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Solution <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("solution")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="How did you solve it? What's the key deliverable?"
        />
        {errors.solution && (
          <p className="text-sm text-red-600 mt-1">{errors.solution.message}</p>
        )}
      </div>
    </div>
  )
}