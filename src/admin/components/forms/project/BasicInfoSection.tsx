import React from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { ProjectFormValues } from "../../schemas/projectSchema"
import { TAG_COLOR_OPTIONS } from "@/admin/constants"
import { cn } from "@/lib/utils"

interface BasicInfoSectionProps {
  register: UseFormRegister<ProjectFormValues>
  errors: FieldErrors<ProjectFormValues>
  isEditing?: boolean
}

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  teal: "bg-teal-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
  yellow: "bg-yellow-500",
}

export function BasicInfoSection({ register, errors, isEditing }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project ID <span className="text-red-500">*</span>
        </label>
        <input
          {...register("id")}
          disabled={isEditing}
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent",
            isEditing && "bg-gray-50 cursor-not-allowed"
          )}
          placeholder="e.g., dadycar"
        />
        <p className="text-xs text-gray-500 mt-1">Used in the public URL, e.g. /projects/dadycar</p>
        {errors.id && <p className="text-sm text-red-600 mt-1">{errors.id.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="Project title"
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tag <span className="text-red-500">*</span>
          </label>
          <input
            {...register("tag")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., Fleet Management · SaaS · B2B"
          />
          {errors.tag && <p className="text-sm text-red-600 mt-1">{errors.tag.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tag Color <span className="text-red-500">*</span>
          </label>
          <select
            {...register("tagColor")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            {TAG_COLOR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.tagColor && (
            <p className="text-sm text-red-600 mt-1">{errors.tagColor.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Award</label>
        <input
          {...register("award", { setValueAs: (v) => (v === "" ? null : v) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="e.g., 🏆 Innovation Prize — Flotauto Paris 2025"
        />
        <p className="text-xs text-gray-500 mt-1">Leave empty if no award</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            {...register("role")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., Product Designer · End-to-End UI/UX"
          />
          {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client <span className="text-red-500">*</span>
          </label>
          <input
            {...register("client")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Client name"
          />
          {errors.client && (
            <p className="text-sm text-red-600 mt-1">{errors.client.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            {...register("year")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., 2024-2025"
          />
          {errors.year && (
            <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration <span className="text-red-500">*</span>
          </label>
          <input
            {...register("duration")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., Ongoing"
          />
          {errors.duration && (
            <p className="text-sm text-red-600 mt-1">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            {...register("order", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("featured")}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Mark as featured project</span>
          </label>
        </div>
      </div>
    </div>
  )
}