interface StructuredDataProps {
  page?: "home" | "blog" | "project" | "resources"
  post?: {
    title: string
    description: string
    url: string
    date?: string
    image?: string
  }
  project?: {
    title: string
    description: string
    url: string
    role?: string
    client?: string
    tools?: string[]
    heroImage?: string
    outcomes?: string[]
  }
  faq?: { question: string; answer: string }[]
}

export function StructuredData({ page = "home", post, project, faq }: StructuredDataProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hmimi Chioukh",
    jobTitle: "AI Product Designer",
    url: "https://hmimi.design",
    image: "https://hmimi.design/og-image.png",
    description: "AI Product Designer building scalable SaaS platforms. Case studies from DadyCar, FocusCare, Shihany, Resaglob.",
    sameAs: [
      "https://linkedin.com/in/hmimi-chioukh",
      "https://dribbble.com/chioukh_hmimi",
      "https://github.com/Chioukhhmimi",
      "https://www.behance.net/thekinghc16490",
    ],
    knowsAbout: [
      "Product Design",
      "UI/UX Design",
      "AI Design",
      "User Research",
      "SaaS",
      "Figma",
      "React",
      "Tailwind CSS",
      "Playwright",
      "Design Systems",
      "Accessibility",
      "Prototyping",
      "Design Tokens",
      "Component Libraries",
      "Interaction Design",
      "Information Architecture",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hmimi Chioukh — Portfolio",
    url: "https://hmimi.design",
    description: "AI Product Designer building scalable SaaS platforms.",
    author: {
      "@type": "Person",
      name: "Hmimi Chioukh",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hmimi.design/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        url: `https://hmimi.design${post.url}`,
        image: post.image || "https://hmimi.design/og-image.png",
        author: {
          "@type": "Person",
          name: "Hmimi Chioukh",
          url: "https://hmimi.design",
        },
        publisher: {
          "@type": "Organization",
          name: "Hmimi Chioukh",
          url: "https://hmimi.design",
          logo: {
            "@type": "ImageObject",
            url: "https://hmimi.design/og-image.png",
          },
        },
        datePublished: post.date || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://hmimi.design${post.url}`,
        },
      }
    : null

  const projectSchema = project
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `https://hmimi.design${project.url}`,
        author: {
          "@type": "Person",
          name: "Hmimi Chioukh",
          url: "https://hmimi.design",
        },
        ...(project.heroImage && { image: project.heroImage }),
        ...(project.role && {
          abstract: project.role,
        }),
        ...(project.client && {
          contributor: {
            "@type": "Organization",
            name: project.client,
          },
        }),
        ...(project.tools && { keywords: project.tools.join(", ") }),
        ...(project.outcomes && {
          about: project.outcomes.join("; "),
        }),
      }
    : null

  const breadcrumbSchema = page !== "home"
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://hmimi.design",
          },
          ...(page === "project" && project
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Work",
                  item: "https://hmimi.design",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: project.title,
                  item: `https://hmimi.design${project.url}`,
                },
              ]
            : page === "blog" && post
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://hmimi.design",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `https://hmimi.design${post.url}`,
                },
              ]
            : page === "resources"
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Resources",
                  item: "https://hmimi.design/resources",
                },
              ]
            : []),
        ],
      }
    : null

  const faqSchema = faq && faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null

  const schemas: Record<string, unknown>[] = [personSchema, websiteSchema]
  if (articleSchema) schemas.push(articleSchema)
  if (projectSchema) schemas.push(projectSchema)
  if (breadcrumbSchema) schemas.push(breadcrumbSchema)
  if (faqSchema) schemas.push(faqSchema)

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
