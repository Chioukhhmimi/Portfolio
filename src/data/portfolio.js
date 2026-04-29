export const testimonials = [
  {
    id: "amine-yahia-cherif",
    name: "Amine Yahia Cherif",
    role: "CEO",
    company: "DadyCar",
    platform: "LinkedIn",
    quote: `J'ai eu le plaisir de travailler avec Hmimi Chioukh depuis plus de 3 ans en tant que son manager direct, et je peux dire que c'est un UI/UX Designer exceptionnel.
Hmimi se distingue par sa créativité, son sens du détail et sa capacité à transformer des idées complexes en interfaces simples, fluides et élégantes. Il a toujours su allier rigueur professionnelle et innovation, ce qui a fortement contribué à la qualité de nos produits.
Au-delà de ses compétences techniques, j'ai particulièrement apprécier son esprit d'équipe, sa fiabilité et son engagement constant. Il a su gagner la confiance de tous nos collaborateurs et a toujours livré un travail de grande qualité dans les délais impartis.
Je recommande vivement Hmimi pour tout projet ou toute entreprise cherchant un designer talentueux, impliqué et passionné.`,
  },
  {
    id: "aziz-trabelsi",
    name: "Aziz Trabelsi",
    role: "CEO",
    company: "Shihany",
    platform: "LinkedIn",
    quote: `I had the joy of working with Hmimi Chioukh for 3 years (2022–2025) at Shihany, and I can confidently say he was a huge asset to our team.
Beyond his strong skills in building intuitive and well-thought-out designs — from MVP to final product — he also brought a great energy to the team.
Always positive, collaborative, and fun to work with, Hmimi helped create a supportive atmosphere where creativity could thrive.
Any team would be lucky to have him!`,
  },
];

export const portfolio = {
  name: "Hmimi Chioukh",
  role: "Product Designer ",
  bio: "I design scalable SaaS platforms and digital experiences.",
  shortBio: "Sr Product Designer, UI/UX Design, AI Design, User Research",
  about: `I design operational SaaS products where clarity, speed, and structure directly impact how teams work.

By combining product thinking, system design, and AI-powered workflows, I simplify complexity, improve usability, and build scalable solutions that are efficient for both users and teams.`,
  skills: [
    "Product Design",
    "UI/UX Design",
    "AI Design",
    "User Research",
    "Figma",
    "React",
    "Playwright",
    "Tailwind CSS"
  ],
  howIWork: [
    {
      title: "Solve the Right Problem",
      description: "Understanding workflows, constraints, and real operational pain points before designing interfaces."
    },
    {
      title: "Clarity Creates Speed",
      description: "Reducing friction, cognitive load, and unnecessary steps to make workflows faster and easier to use."
    },
    {
      title: "Design for Scale",
      description: "Building systems that stay clear, consistent, and efficient as products and teams grow."
    },
    {
      title: "Build with Developers",
      description: "Designing with technical awareness to create realistic, scalable, and high-quality solutions."
    },
    {
      title: "AI-Powered Execution",
      description: "Using AI to accelerate research, iteration, QA, and execution while keeping product thinking at the center."
    }
  ],
  projects: [
    {
      title: "DadyCar",
      category: "Fleet Management",
      description: "Built a scalable fleet management system enabling companies to manage vehicles, service operations, and performance in a unified platform.",
      tags: ["Product Designer", "End-to-end UI/UX"],
      live: "#",
      image: "fleet"
    },
    {
      title: "FocusCare",
      category: "Healthcare",
      description: "Pre-Surgical Clinical Workflow Platform designed to streamline healthcare operations and patient care workflows.",
      tags: ["Product Designer", "End-to-end UI/UX"],
      live: "#",
      image: "healthcare"
    },
    {
      title: "Shihany",
      category: "Sports",
      description: "Sports Operations & Club Management SaaS platform for clubs and sports organizations to manage operations.",
      tags: ["Product Designer", "End-to-end UI/UX"],
      live: "#",
      image: "sports"
    },
    {
      title: "Resaglob",
      category: "Travel",
      description: "B2B hotel booking system for travel agencies with streamlined reservation workflow.",
      tags: ["Product Designer", "End-to-end UI/UX"],
      live: "#",
      image: "travel"
    }
  ],
  experience: [
    {
      company: "Dadycar",
      role: "Product Designer ",
      date: "2022 - Present",
      bulletPoints: [
        "Lead product design from concept to deployment",
        "Built custom Playwright testing framework reducing regression time by 80%",
        "Designed and implemented component library with 50+ reusable components"
      ]
    },
    {
      company: "TechVentures",
      role: "Senior UI/UX Designer",
      date: "2018 - 2022",
      bulletPoints: [
        "Designed customer-facing web and mobile applications",
        "Conducted user research and usability testing",
        "Collaborated with engineering teams to ensure design fidelity"
      ]
    },
    {
      company: "Digital Agency",
      role: "UI Designer & Frontend Developer",
      date: "2016 - 2018",
      bulletPoints: [
        "Created responsive websites for 20+ clients across various industries",
        "Implemented design systems and component libraries",
        "Introduced automated testing practices to improve code quality"
      ]
    }
  ],
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:hmimi@example.com"
  },
  blogPosts: [
    {
      id: 4,
      title: "My AI Workflow as a Product Designer",
      description: "Exploring how I leverage AI tools to accelerate research, iteration, QA, and execution while keeping product thinking at the center.",
      tag: "AI · Product Design",
      tagColor: "teal",
      readTime: "5 min read",
      url: "https://medium.com/@hmimichiouukh/my-ai-workflow-as-product-designer-b9baa93fb1d8",
    },
    {
      id: 1,
      title: "Improving Perceived Performance in Vehicle Monitoring",
      description: "How smart UX patterns can make fleet monitoring dashboards feel faster and more responsive without changing the underlying data.",
      tag: "Performance · UX",
      tagColor: "blue",
      readTime: "5 min read",
      url: "https://medium.com/@hmimichiouukh/improving-perceived-performance-in-vehicle-monitoring-8d51d4c5e77f",
    },
    {
      id: 2,
      title: "Designing a Bulk Import Workflow for Fleet Operations",
      description: "A deep dive into designing a clear, error-tolerant bulk data import experience for fleet managers handling large vehicle datasets.",
      tag: "Workflow · Product Design",
      tagColor: "orange",
      readTime: "6 min read",
      url: "https://medium.com/@hmimichiouukh/designing-a-bulk-import-workflow-for-fleet-operations-f74472333508",
    },
    {
      id: 3,
      title: "Delex Relay — UX Case Study",
      description: "A UX case study exploring the design decisions behind Delex Relay: a logistics relay platform focused on simplicity and operational clarity.",
      tag: "Case Study · UX",
      tagColor: "teal",
      readTime: "7 min read",
      url: "https://medium.com/@hmimichiouukh/delex-relay-ux-study-case-317e881751cb",
    },
  ],
}