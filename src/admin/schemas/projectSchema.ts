import { z } from "zod"

const ecosystemItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  user: z.string().min(1, "User is required"),
  description: z.string().min(1, "Description is required"),
})

const designChallengeSchema = z.object({
  number: z.string().min(1, "Number is required"),
  title: z.string().min(1, "Title is required"),
  problem: z.string().min(1, "Problem is required"),
  solution: z.string().min(1, "Solution is required"),
  insight: z.string().min(1, "Insight is required"),
})

const learningSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
})

const screenSchema = z.object({
  label: z.string().min(1, "Label is required"),
  src: z.string().min(1, "Image path is required"),
})

const nextProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "URL is required"),
})

export const projectSchema = z.object({
  id: z.string().min(1, "ID is required").regex(/^[a-z0-9-]+$/, "ID must be lowercase slug-friendly"),

  status: z.enum(["draft", "published", "archived"]),

  featured: z.boolean(),

  order: z.number().int().min(0),

  tag: z.string().min(1, "Tag is required"),

  tagColor: z.string().min(1, "Tag color is required"),

  award: z.string().nullable(),

  title: z.string().min(1, "Title is required"),

  role: z.string().min(1, "Role is required"),

  client: z.string().min(1, "Client is required"),

  year: z.string().min(1, "Year is required"),

  duration: z.string().min(1, "Duration is required"),

  context: z.string().min(1, "Context is required"),

  userInsight: z.string().min(1, "User insight is required"),

  overview: z.string().min(1, "Overview is required"),

  challenge: z.string().min(1, "Challenge is required"),

  solution: z.string().min(1, "Solution is required"),

  team: z.array(z.string()).min(1, "At least one team member is required"),

  ecosystem: z.array(ecosystemItemSchema).optional(),

  designChallenges: z.array(designChallengeSchema).min(1, "At least one design challenge is required"),

  outcomes: z.array(z.string()).min(1, "At least one outcome is required"),

  learnings: z.array(learningSchema).min(1, "At least one learning is required"),

  tools: z.array(z.string()),

  heroImage: z.string(),

  screens: z.array(screenSchema),

  nextProject: nextProjectSchema,
})

export type ProjectFormValues = z.infer<typeof projectSchema>

export const projectDefaultValues: ProjectFormValues = {
  id: "",
  status: "draft",
  featured: false,
  order: 1,
  tag: "",
  tagColor: "blue",
  award: null,
  title: "",
  role: "",
  client: "",
  year: "",
  duration: "",
  context: "",
  userInsight: "",
  overview: "",
  challenge: "",
  solution: "",
  team: [],
  ecosystem: [],
  designChallenges: [
    {
      number: "01",
      title: "",
      problem: "",
      solution: "",
      insight: "",
    },
  ],
  outcomes: [""],
  learnings: [
    {
      title: "",
      body: "",
    },
  ],
  tools: [],
  heroImage: "",
  screens: [],
  nextProject: {
    title: "",
    url: "",
  },
}