import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm, useFieldArray, FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Loader2, FileText, Users, Layout, Lightbulb, Target, Wrench, Image, ArrowRight, Check } from "lucide-react"
import { PageHeader, LoadingState } from "@/admin/components/ui"
import { projectsService } from "@/admin/services/projectsService"
import { Project, ProjectFormData } from "@/admin/types/project"
import { projectSchema, ProjectFormValues, projectDefaultValues } from "@/admin/schemas/projectSchema"
import { Button } from "@/components/ui/button"
import { BasicInfoSection } from "@/admin/components/forms/project/BasicInfoSection"
import { NarrativeSection } from "@/admin/components/forms/project/NarrativeSection"
import { TeamSection } from "@/admin/components/forms/project/TeamSection"
import { EcosystemSection } from "@/admin/components/forms/project/EcosystemSection"
import { DesignChallengesSection } from "@/admin/components/forms/project/DesignChallengesSection"
import { OutcomesSection } from "@/admin/components/forms/project/OutcomesSection"
import { LearningsSection } from "@/admin/components/forms/project/LearningsSection"
import { ToolsSection } from "@/admin/components/forms/project/ToolsSection"
import { ScreensSection } from "@/admin/components/forms/project/ScreensSection"
import { NextProjectSection } from "@/admin/components/forms/project/NextProjectSection"

const sections = [
  { id: "basic", label: "Basic Info", icon: FileText },
  { id: "narrative", label: "Narrative", icon: FileText },
  { id: "team", label: "Team", icon: Users },
  { id: "ecosystem", label: "Ecosystem", icon: Layout },
  { id: "challenges", label: "Challenges", icon: Lightbulb },
  { id: "outcomes", label: "Outcomes", icon: Target },
  { id: "learnings", label: "Learnings", icon: Lightbulb },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "screens", label: "Screens", icon: Image },
  { id: "next", label: "Next Project", icon: ArrowRight },
]

export function ProjectForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const [loading, setLoading] = React.useState(isEditing)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [activeSection, setActiveSection] = React.useState("basic")
  const [toast, setToast] = React.useState<{ show: boolean; message: string; isError?: boolean }>({
    show: false,
    message: "",
    isError: false,
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: projectDefaultValues,
  })

  const teamFieldArray = useFieldArray({ control, name: "team" })
  const ecosystemFieldArray = useFieldArray({ control, name: "ecosystem" })
  const designChallengesFieldArray = useFieldArray({ control, name: "designChallenges" })
  const outcomesFieldArray = useFieldArray({ control, name: "outcomes" })
  const learningsFieldArray = useFieldArray({ control, name: "learnings" })
  const toolsFieldArray = useFieldArray({ control, name: "tools" })
  const screensFieldArray = useFieldArray({ control, name: "screens" })

  React.useEffect(() => {
    if (isEditing && id) {
      loadProject(id)
    }
  }, [id])

  const loadProject = async (projectId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await projectsService.getProjectById(projectId)
      if (response.success && response.data) {
        reset({
          ...response.data,
          award: response.data.award || "",
          ecosystem: response.data.ecosystem || [],
        })
      } else {
        setError("Project not found")
      }
    } catch (err) {
      console.error("Error loading project:", err)
      setError(err instanceof Error ? err.message : "Failed to load project")
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: string, isError = false) => {
    setToast({ show: true, message, isError })
    setTimeout(() => setToast({ show: false, message: "", isError: false }), 3000)
  }

  const onSubmit = async (data: ProjectFormValues) => {
    setSaving(true)
    setError(null)
    try {
      const payload = {
        ...data,
        award: data.award === "" ? null : data.award,
      }

      if (isEditing && id) {
        await projectsService.updateProject(id, payload)
        showToast("Project saved successfully!")
      } else {
        await projectsService.createProject(payload)
        showToast("Project created successfully!")
        navigate("/admin/projects")
      }
    } catch (err) {
      console.error("Error saving project:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to save project"
      setError(errorMessage)
      showToast(errorMessage, true)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveDraft = handleSubmit(async (data) => {
    setSaving(true)
    setError(null)
    try {
      const payload = {
        ...data,
        status: "draft",
        award: data.award === "" ? null : data.award,
      }

      if (isEditing && id) {
        await projectsService.updateProject(id, payload)
        showToast("Saved as draft!")
      } else {
        await projectsService.createProject(payload)
        navigate("/admin/projects")
      }
    } catch (err) {
      console.error("Error saving draft:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to save draft"
      setError(errorMessage)
      showToast(errorMessage, true)
    } finally {
      setSaving(false)
    }
  })

  const handlePublish = handleSubmit(async (data) => {
    setSaving(true)
    setError(null)
    try {
      const payload = {
        ...data,
        status: "published",
        award: data.award === "" ? null : data.award,
      }

      if (isEditing && id) {
        await projectsService.updateProject(id, payload)
        showToast("Published!")
      } else {
        const response = await projectsService.createProject(payload)
        if (response.success && response.data) {
          await projectsService.updateProjectStatus(response.data.id, "published")
        }
        navigate("/admin/projects")
      }
    } catch (err) {
      console.error("Error publishing:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to publish"
      setError(errorMessage)
      showToast(errorMessage, true)
    } finally {
      setSaving(false)
    }
  })

  if (loading) {
    return (
      <div>
        <PageHeader
          title={isEditing ? "Edit Project" : "New Project"}
          action={{ label: "Back to Projects", href: "/admin/projects" }}
        />
        <LoadingState />
      </div>
    )
  }

  if (error && isEditing && !loading) {
    return (
      <div>
        <PageHeader
          title={isEditing ? "Edit Project" : "New Project"}
          action={{ label: "Back to Projects", href: "/admin/projects" }}
        />
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button onClick={() => navigate("/admin/projects")}>Back to Projects</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title={isEditing ? "Edit Project" : "New Project"}
        action={{ label: "Back to Projects", href: "/admin/projects" }}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[240px_1fr] min-h-[600px]">
            <aside className="border-r border-gray-200 bg-gray-50 p-4">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                        activeSection === section.id
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {section.label}
                    </button>
                  )
                })}
              </nav>
            </aside>

            <div className="p-6">
              {activeSection === "basic" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <BasicInfoSection register={register} errors={errors} isEditing={isEditing} />
                </div>
              )}

              {activeSection === "narrative" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Narrative</h3>
                  <NarrativeSection register={register} errors={errors} />
                </div>
              )}

              {activeSection === "team" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team</h3>
                  <TeamSection register={register} errors={errors} fieldArray={teamFieldArray} />
                </div>
              )}

              {activeSection === "ecosystem" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ecosystem</h3>
                  <EcosystemSection register={register} errors={errors} fieldArray={ecosystemFieldArray} />
                </div>
              )}

              {activeSection === "challenges" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Challenges</h3>
                  <DesignChallengesSection register={register} errors={errors} fieldArray={designChallengesFieldArray} />
                </div>
              )}

              {activeSection === "outcomes" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Outcomes</h3>
                  <OutcomesSection register={register} errors={errors} fieldArray={outcomesFieldArray} />
                </div>
              )}

              {activeSection === "learnings" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learnings</h3>
                  <LearningsSection register={register} errors={errors} fieldArray={learningsFieldArray} />
                </div>
              )}

              {activeSection === "tools" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
                  <ToolsSection register={register} errors={errors} fieldArray={toolsFieldArray} />
                </div>
              )}

              {activeSection === "screens" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Screens</h3>
                  <ScreensSection register={register} errors={errors} fieldArray={screensFieldArray} />
                </div>
              )}

              {activeSection === "next" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Project</h3>
                  <NextProjectSection register={register} errors={errors} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save Draft
            </Button>
            <Button type="button" onClick={handlePublish} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Publish
            </Button>
          </div>
        </div>
      </form>

      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.isError ? "bg-red-600" : "bg-green-600"
          }`}
        >
          <Check className="w-4 h-4" />
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default ProjectForm