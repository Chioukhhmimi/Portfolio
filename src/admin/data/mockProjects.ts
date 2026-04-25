import { Project } from "../types/project"

export const mockProjects: Project[] = [
  {
    id: "dadycar",
    status: "published",
    featured: true,
    order: 1,
    tag: "Fleet Management · SaaS · B2B",
    tagColor: "blue",
    award: "🏆 Innovation Prize — Flotauto Paris 2025",
    title: "DadyCar — Fleet Management Platform",
    role: "Product Designer · End-to-End UI/UX",
    client: "DadyCar",
    year: "2024–2025",
    duration: "Ongoing",
    context:
      "Fleet management in Europe has a tooling problem. Mid-size businesses running 20 to 200 vehicles are stuck between expensive enterprise software or nothing at all.",
    userInsight:
      "Our primary user is a 40+ year old fleet manager, office-based, non-technical, spending 6–8 hours a day inside this dashboard.",
    overview:
      "Full end-to-end product design of a B2B SaaS fleet management platform — from design tokens and component library to every screen.",
    challenge:
      "Fleet managers relied on Excel files and disconnected tools with no real-time visibility.",
    solution:
      "A light, data-focused dashboard built on a complete design system — design tokens, 60+ components, all states.",
    team: ["1 PM", "1 PO", "2 Frontend Devs", "2 Backend Devs"],
    designChallenges: [
      {
        number: "01",
        title: "Bulk Import — Designing for Error, Not Success",
        problem:
          "Fleet managers needed to upload hundreds of vehicles at once via CSV — but their data was always messy.",
        solution:
          "Progressive disclosure across 4 steps: Upload → Column Mapping → Error Review → Confirm Summary.",
        insight: "Don't show users their problems all at once. Show them one decision at a time.",
      },
      {
        number: "02",
        title: "Roles & Permissions — Designing Invisible Complexity",
        problem:
          "The platform needed a permissions system flexible enough for different company org structures.",
        solution:
          "A two-layer approach: predefined roles with sensible defaults, plus custom permission toggles per role.",
        insight:
          "Role-based access is completely invisible when it works well and completely broken when it doesn't.",
      },
    ],
    outcomes: [
      "Won Innovation Prize at Flotauto Paris 2025",
      "Validated by real fleet companies during pilot",
      "Bulk import flow became the most praised feature",
    ],
    learnings: [
      {
        title: "Design for your actual user, not for designers.",
        body: "Every time I was tempted to make something visually clever, I asked: would a 45-year-old fleet manager find what they need here in 3 seconds?",
      },
      {
        title: "The design system is the product, not just a support tool.",
        body: "On a platform this large, consistency is a feature. The time invested in tokens and components upfront saved weeks of inconsistency fixes later.",
      },
    ],
    tools: ["Figma", "FigJam", "Notion", "Maze", "Tailwind CSS", "shadcn/ui"],
    heroImage: "dadycar-Dashboard",
    screens: [
      { label: "Dashboard Overview", src: "dadycar-Dashboard" },
      { label: "Vehicle Management", src: "dadycar-Vehicule" },
      { label: "Bulk Import", src: "dadycar-Bulk" },
    ],
    nextProject: {
      title: "FocusCare — Pre-Surgical Clinical Workflow Platform",
      url: "focuscare",
    },
  },
  {
    id: "focuscare",
    status: "published",
    featured: false,
    order: 2,
    tag: "Healthcare SaaS · B2B · Clinical",
    tagColor: "green",
    award: null,
    title: "FocusCare — Pre-Surgical Clinical Workflow Platform",
    role: "Product Designer · End-to-End UI/UX",
    client: "FocusCare",
    year: "2023–2024",
    duration: "8 months",
    context:
      "Pre-surgical workflows at hospitals are fragmented. Paper forms, disconnected EHR systems, manual phone calls between departments waste time.",
    userInsight:
      "Our users are dual: clinical staff who need speed in high-stress environments, and patients who need clarity and reassurance.",
    overview:
      "Complete product redesign of a pre-surgical workflow platform — from patient intake forms through post-op instructions.",
    challenge:
      "The existing product was cluttered, with 15+ page navigations required to complete a single patient workflow.",
    solution:
      "A role-based dashboard that surfaces the right information for each user — clinical staff get quick-action views, patients get guided journey.",
    team: ["1 PM", "1 Clinical Lead", "2 Frontend Devs", "2 Backend Devs", "1 Designer (me)"],
    designChallenges: [
      {
        number: "01",
        title: "Patient vs. Clinical — Two Users, One Product",
        problem:
          "Clinical staff needed speed while patients needed hand-holding. The existing interface served neither well.",
        solution:
          "Two distinct dashboard views: Clinical gets list/table view with bulk actions. Patients get step-by-step guided flow.",
        insight: "One product can be two different experiences. Design for each user's context.",
      },
      {
        number: "02",
        title: "EHR Integration — Designing Around Constraints",
        problem:
          "Integration with hospital EHR systems was limited to certain data formats and update frequencies.",
        solution:
          "A flexible form engine that adapts to available EHR fields, with graceful degradation for missing data.",
        insight: "Work with constraints, not against them. Limitations often drive creative solutions.",
      },
    ],
    outcomes: [
      "App store rating improved from 2.8 to 4.5 stars",
      "Average patient form completion time reduced by 65%",
      "Clinical staff throughput increased by 40%",
    ],
    learnings: [
      {
        title: "Dual-user products need dual research.",
        body: "I spent equal time in clinical environments and with patients. Both revealed needs that would have been invisible studying only one group.",
      },
      {
        title: "Speed for experts and comfort for beginners can coexist.",
        body: "The same underlying platform can offer different interfaces, shortcuts for power users, and guided flows for new users.",
      },
    ],
    tools: ["Figma", "Dovetail", "Miro", "UserTesting", "Tailwind CSS", "Radix UI"],
    heroImage: "focuseCare-Dashboard",
    screens: [
      { label: "Clinical Dashboard", src: "focuscare-Dashboard" },
      { label: "Patient Journey Flow", src: "focuscare-patient" },
      { label: "Pre-Op Checklist", src: "focuscare-consultation" },
    ],
    nextProject: {
      title: "DadyCar — Fleet Management Platform",
      url: "dadycar",
    },
  },
  {
    id: "shihany",
    status: "draft",
    featured: false,
    order: 3,
    tag: "Sports Management · SaaS · KSA",
    tagColor: "green",
    award: null,
    title: "Shihany — Sports Club Management Ecosystem",
    role: "Product Designer �� 4 Products · End-to-End UI/UX",
    client: "Shihany",
    year: "2023–2024",
    duration: "Full Cycle",
    context:
      "Youth sports clubs in Saudi Arabia run on informal systems. WhatsApp for scheduling, paper for attendance, cash payments with no tracking.",
    userInsight:
      "Parents and coaches were not failing because they didn't care — they were failing because the tools forced them into informal workarounds.",
    overview:
      "End-to-end product design of a 4-product sports management ecosystem — two mobile apps and two web platforms.",
    challenge:
      "Clubs managed everything through WhatsApp groups and paper sheets. Zero visibility for parents.",
    solution:
      "A four-product ecosystem: Shihany Hub, Shihany App, Shihany Pro, and Shihany Federation — all interconnected.",
    team: ["1 PM", "1 PO", "2 Frontend Devs", "2 Backend Devs", "1 Designer (me)"],
    ecosystem: [
      {
        name: "Shihany Hub",
        type: "Web",
        user: "Club owners & admin staff",
        description: "The operational center. Club management, scheduling, payments, player roster.",
      },
      {
        name: "Shihany App",
        type: "Mobile",
        user: "Players & parents",
        description: "Parents search nearby clubs, register their child, track attendance.",
      },
      {
        name: "Shihany Pro",
        type: "Mobile",
        user: "Coaches",
        description: "Check appointments, view player profiles, start sessions, scan QR attendance.",
      },
      {
        name: "Shihany Federation",
        type: "Web",
        user: "Sports federations (KSA)",
        description: "League management, competition scheduling, club oversight.",
      },
    ],
    designChallenges: [
      {
        number: "01",
        title: "Attendance — From Paper and Pen to QR Code",
        problem:
          "Attendance was done on paper — manual check-off before a chaotic warmup with 20 kids. Sheets got lost.",
        solution:
          "QR code check-in: each player has a unique QR code in the parent's app. Coach scans as they arrive.",
        insight:
          "A coach mid-session cannot afford to dig through menus. Every interaction had to be completable with one hand in under 5 seconds.",
      },
      {
        number: "02",
        title: "Bulk Player Import With Pending Parent Linking",
        problem:
          "Clubs joining had player roster in Excel or WhatsApp contacts. Manually re-entering 80 players was a dealbreaker.",
        solution:
          "Progressive bulk import: Upload → Column Mapping → Error Review → Confirm. Pending parent invitations auto-sent.",
        insight: "Import flows need to handle the reality of messy, incomplete data — not the ideal case.",
      },
    ],
    outcomes: [
      "Adopted by 10+ clubs across Saudi Arabia",
      "QR attendance became the most praised feature",
      "4 products shipped in 2 design systems",
    ],
    learnings: [
      {
        title: "An ecosystem is only as strong as its weakest product.",
        body: "If the parent app is confusing, coaches lose attendance data. Every product in the chain affects every other.",
      },
      {
        title: "Mobile design for coaches means designing for distraction.",
        body: "A coach mid-session is moving, talking, managing children. Every interaction had to be completable with one hand.",
      },
    ],
    tools: ["Figma", "FigJam", "Notion", "Tailwind CSS", "shadcn/ui", "React Native"],
    heroImage: "shihany-hub",
    screens: [
      { label: "Shihany Hub — Club Dashboard", src: "shihany-hub" },
      { label: "Shihany Pro — Session View", src: "shihany-pro" },
      { label: "Shihany Federation — League Overview", src: "shihany-fed" },
    ],
    nextProject: {
      title: "Resaglob — Travel Agency Hotel Booking System",
      url: "resaglob",
    },
  },
  {
    id: "resaglob",
    status: "draft",
    featured: false,
    order: 4,
    tag: "Travel · B2B SaaS · Algeria",
    tagColor: "teal",
    award: null,
    title: "Resaglob — Travel Agency Hotel Booking System",
    role: "Product Designer · End-to-End UI/UX",
    client: "Resaglob",
    year: "2024–2025",
    duration: "In Development",
    context:
      "Travel agencies in Algeria sit at the intersection of high client expectations and outdated tooling. No unified workflow exists.",
    userInsight:
      "Every tool available to travel agents was either built for consumers or built for IT departments. Nothing was built for professionals.",
    overview:
      "Full end-to-end product design of a B2B travel agency SaaS — connecting agencies to worldwide live inventory via supplier APIs.",
    challenge:
      "Agents used consumer platforms and legacy tools with stale inventory data. Rooms shown as available could be booked by the time of confirmation.",
    solution:
      "A unified booking platform with tabbed smart search bar, progressive data density, real-time inventory indicators, graceful race condition handling.",
    team: ["1 Frontend Dev", "2 Backend Devs", "1 Designer (me)"],
    designChallenges: [
      {
        number: "01",
        title: "The Search Bar — Making Complexity Disappear",
        problem:
          "Hotel search requires many fields: destination, dates, guests, rooms. Presented wrong it looks like a form from 2009.",
        solution:
          "A tabbed search bar with three modes. Guest and room configuration collapses into one field that opens a clean popover.",
        insight:
          "The complexity lives in the popover, not on the surface. An agent who has done this a hundred times moves through it in seconds.",
      },
      {
        number: "02",
        title: "Real-Time Inventory — Designing for the Race Condition",
        problem:
          "A room showing as available can get booked by another agency while the agent is mid-reservation.",
        solution:
          "Transparency: search results show last-updated timestamp and live availability indicator. Graceful failure shows next best options.",
        insight:
          "Design for failure, not just success. A well-designed error keeps the agent professional in front of their client.",
      },
    ],
    outcomes: [
      "Currently in active development",
      "Early flow testing produced positive feedback on search UX",
      "Tabbed search bar reduced complex search to a single clean interaction",
    ],
    learnings: [
      {
        title: "The search bar is the product.",
        body: "In a booking tool, the search experience sets the tone for everything that follows. Getting it right was worth more design time than any other element.",
      },
      {
        title: "Design for failure, not just success.",
        body: "The race condition problem showed that the most important screens are the error screens. A well-designed failure message keeps the agent professional.",
      },
    ],
    tools: ["Figma", "FigJam", "Notion", "Tailwind CSS", "shadcn/ui"],
    heroImage: "resaglob-Hotel Search",
    screens: [
      { label: "Hotel Search", src: "resaglob-Hotel Search" },
      { label: "Search Results", src: "resaglob-Clients" },
      { label: "Hotel Detail", src: "resaglob-Map" },
    ],
    nextProject: {
      title: "DadyCar — Fleet Management Platform",
      url: "dadycar",
    },
  },
]