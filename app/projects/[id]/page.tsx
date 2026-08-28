import type { Metadata } from "next"
import { ProjectClient } from "./ProjectClient"
import { StructuredData } from "@/components/seo/StructuredData"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

async function getProject(id: string) {
  const res = await fetch(`${API_URL}/projects/${id}`, { cache: "no-store" })
  if (!res.ok) return null
  const data = await res.json()
  return data.data
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(id)
  if (!project) return { title: "Project Not Found" }
  return {
    title: `${project.title} | Hmimi Chioukh`,
    description: `${project.title} — ${project.role}. ${project.overview || ""}`.slice(0, 160),
    keywords: [project.title, project.role, "Product Design", "UI/UX", "Case Study", ...(project.tools || [])],
    openGraph: {
      title: `${project.title} | Hmimi Chioukh`,
      description: `${project.title} — ${project.role}`,
      images: project.heroImage
        ? [{ url: project.heroImage, width: 1200, height: 675, alt: `${project.title} — Hmimi Chioukh` }]
        : [],
      url: `https://hmimi.design/projects/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Hmimi Chioukh`,
      description: `${project.title} — ${project.role}`,
      images: project.heroImage ? [project.heroImage] : [],
    },
    alternates: {
      canonical: `https://hmimi.design/projects/${id}`,
    },
  }
}

const projectFAQs: Record<string, { question: string; answer: string }[]> = {
  dadycar: [
    { question: "What is DadyCar?", answer: "DadyCar is a scalable fleet management platform for Algeria, enabling companies to manage vehicles, service operations, and performance in a unified dashboard." },
    { question: "What was the role on DadyCar?", answer: "Lead Product Designer — end-to-end UI/UX from research to deployment, including a custom Playwright testing framework and 50+ component library." },
    { question: "What results did DadyCar achieve?", answer: "50K+ users, 200% ROI, 4.6★ App Store rating, and 80% reduction in regression testing time." },
  ],
  focuscare: [
    { question: "What is FocusCare?", answer: "FocusCare is a pre-surgical clinical workflow platform streamlining healthcare operations and patient care workflows in Saudi Arabia." },
    { question: "What was the role on FocusCare?", answer: "Product Designer — designed end-to-end clinical workflows for appointment scheduling, patient records, and provider dashboards." },
    { question: "What results did FocusCare achieve?", answer: "95% appointment completion rate, $20M+ revenue, 300K+ patients served, and 60% faster patient onboarding." },
  ],
  shihany: [
    { question: "What is Shihany?", answer: "Shihany is an EdTech marketplace connecting tutors with students for personalized learning experiences in Saudi Arabia." },
    { question: "What was the role on Shihany?", answer: "Product Designer — designed the tutor marketplace, booking system, and student dashboard from MVP to production." },
    { question: "What results did Shihany achieve?", answer: "12K+ students, 40% revenue growth, 500+ active tutors, and 4.8★ app rating." },
  ],
  resaglob: [
    { question: "What is Resaglob?", answer: "Resaglob is a B2B hotel booking system for travel agencies with streamlined reservation workflows and inventory management." },
    { question: "What was the role on Resaglob?", answer: "Product Designer — designed the booking flow, agency dashboard, and hotel management interface." },
    { question: "What results did Resaglob achieve?", answer: "Streamlined booking workflow, reduced reservation processing time, and improved agency operational efficiency." },
  ],
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  return (
    <>
      <StructuredData
        page="project"
        project={
          project
            ? {
                title: project.title,
                description: `${project.title} — ${project.role}. ${project.overview || ""}`,
                url: `/projects/${id}`,
                role: project.role,
                client: project.client,
                tools: project.tools,
                heroImage: project.heroImage,
                outcomes: project.outcomes,
              }
            : undefined
        }
        faq={projectFAQs[id] || []}
      />
      <ProjectClient id={id} />
    </>
  )
}
