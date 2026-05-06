import { z } from "zod"

const ecosystemItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  user: z.string(),
  description: z.string(),
})

const designChallengeSchema = z.object({
  number: z.string(),
  title: z.string(),
  problem: z.string(),
  solution: z.string(),
  insight: z.string(),
})

const learningSchema = z.object({
  title: z.string(),
  body: z.string(),
})

const screenSchema = z.object({
  label: z.string(),
  src: z.string(),
})

const nextProjectSchema = z.object({
  title: z.string(),
  url: z.string(),
})

export const projectSchema = z.object({
  id: z.string().min(1, "ID is required").regex(/^[a-z0-9-]+$/, "ID must be lowercase slug-friendly"),

  status: z.enum(["draft", "published", "archived"]),

  featured: z.boolean(),

  order: z.number().int().min(0),

  tag: z.string(),

  tagColor: z.string(),

  award: z.string().nullable(),

  title: z.string().min(1, "Title is required"),

  role: z.string(),

  client: z.string(),

  year: z.string(),

  duration: z.string(),

  context: z.string(),

  userInsight: z.string(),

  overview: z.string(),

  challenge: z.string(),

  solution: z.string(),

  team: z.array(z.string()),

  ecosystem: z.array(ecosystemItemSchema),

  designChallenges: z.array(designChallengeSchema),

  outcomes: z.array(z.string()),

  learnings: z.array(learningSchema),

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