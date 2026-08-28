declare module "@/components/ui/button" {
  import * as React from "react"

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
  }

  const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>
  export { Button }
}

declare module "@/components/ui/card" {
  import * as React from "react"

  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
  interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

  const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>
  const CardContent: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>
  export { Card, CardContent }
}

declare module "@/components/ui/badge" {
  import * as React from "react"

  interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "blue" | "purple" | "orange" | "teal" | "pink" | "emerald"
  }

  const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>
  export { Badge }
}

declare module "@/components/ui/input" {
  import * as React from "react"

  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

  const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
  export { Input }
}

declare module "@/components/ui/textarea" {
  import * as React from "react"

  interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

  const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>
  export { Textarea }
}

declare module "@/lib/utils" {
  export function cn(...inputs: (string | undefined | null | false)[]): string
}

declare module "@/lib/api" {
  export function fetchProjects(): Promise<any[]>
  export function fetchProjectById(id: string): Promise<any>
  export function fetchClients(): Promise<any[]>
  export function fetchBlogPosts(): Promise<any[]>
}

declare module "@/data/portfolio" {
  export const portfolio: {
    name: string
    nameZd: string
    role: string
    bio: string
    shortBio: string
    about: string
    skills: string[]
    howIWork: { title: string; description: string }[]
    projects: any[]
    experience: any[]
    social: {
      linkedin: string
      dribbble: string
      github: string
      behance: string
      email: string
    }
    [key: string]: any
  }
  export const testimonials: any[]
}
