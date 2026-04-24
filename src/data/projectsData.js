export const projectsData = [
  {
    id: "dadycar",
    tag: "Fleet Management · SaaS · B2B",
    tagColor: "blue",
    award: "🏆 Innovation Prize — Flotauto Paris 2025",
    title: "DadyCar — Fleet Management Platform",
    role: "Product Designer · End-to-End UI/UX",
    client: "DadyCar",
    year: "2024–2025",
    duration: "Ongoing",
    heroImage: "dadycar-Dashboard",

    context: `Fleet management in and Europe has a serious tooling problem. 
The companies that could benefit most from a modern operations platform — mid-size 
businesses running 20 to 200 vehicles — are stuck between two bad options: expensive 
enterprise software built for corporations, or nothing at all. Before DadyCar, their 
day looked like this: maintenance reminders in a notebook, fuel expenses in a shared 
spreadsheet, driver assignments via phone calls, and zero visibility into what was 
actually happening across their fleet in real time. DadyCar was built to close that 
gap — one unified platform where a fleet manager can see everything, act on anything, 
and lose nothing.`,

    userInsight: `Our primary user is a 40+ year old fleet manager, office-based, 
non-technical, spending 6–8 hours a day inside this dashboard. This single insight 
ruled out dark themes, high visual complexity, and anything that prioritized 
aesthetics over clarity.`,

    overview: `Full end-to-end product design of a B2B SaaS fleet management platform — 
from design tokens and component library to every screen across the full operational surface.`,

    challenge: `Fleet managers relied on Excel files and disconnected tools with no 
real-time visibility. The primary user is a 40+ year old, office-based, non-technical 
fleet manager spending 6–8 hours daily inside the dashboard — requiring clarity and 
speed above everything.`,

    solution: `A light, data-focused dashboard built on a complete design system — 
design tokens, 60+ components, all states. Combined with progressive disclosure 
patterns to handle complex workflows without overwhelming non-technical users.`,

    team: ["1 PM", "1 PO", "2 Frontend Devs", "2 Backend Devs"],

    designChallenges: [
      {
        number: "01",
        title: "Bulk Import — Designing for Error, Not Success",
        problem: `Fleet managers needed to upload hundreds of vehicles at once via CSV 
or Excel — but their data was always messy: missing fields, wrong formats, duplicate 
entries. Early versions displayed the full imported table with all errors flagged inline. 
Pilot feedback was immediate: "I don't know where to start. There's too much."`,
        solution: `Progressive disclosure across 4 steps: Upload → Column Mapping → 
Error Review (only problematic rows) → Confirm Summary. 
Show users one decision at a time, not all their problems at once.`,
        insight: `Don't show users their problems all at once. Show them one decision at a time.`,
      },
      {
        number: "02",
        title: "Roles & Permissions — Designing Invisible Complexity",
        problem: `The platform needed a permissions system flexible enough for companies 
with very different org structures — some with one fleet manager, others with regional 
supervisors, field coordinators, and read-only executives — without making configuration 
feel like an IT task.`,
        solution: `A two-layer approach: predefined roles with sensible defaults for the 
majority of users, plus custom permission toggles per role for specific needs — designed 
as a clear scannable matrix. Every feature was also designed with its disabled and 
hidden state.`,
        insight: `Role-based access is completely invisible when it works well and completely 
broken when it doesn't.`,
      },
      {
        number: "03",
        title: "Dashboard — What Does 'At a Glance' Actually Mean?",
        problem: `A fleet management dashboard can display hundreds of data points. 
The real design question was: what does a fleet manager need to know in the first 
10 seconds of their morning?`,
        solution: `Through sessions with pilot users we identified the true priority order: 
(1) Are any vehicles in a critical state? (2) What maintenance is due this week? 
(3) How are my costs trending? The dashboard was designed around this hierarchy.`,
        insight: `Hierarchy is not a visual decision — it is a user research decision.`,
      },
    ],

    outcomes: [
      "Won Innovation Prize at Flotauto Paris 2025 — competing against established European enterprise solutions",
      "Validated by real fleet companies during pilot — their feedback directly shaped core features",
      "Bulk import flow became the most praised feature among pilot users",
      "Design system kept full platform consistent across a large operational surface",
      "Permission system supported org structures from 1 manager to multi-regional teams",
    ],

    learnings: [
      {
        title: "Design for your actual user, not for designers.",
        body: `Every time I was tempted to make something visually clever, I asked: would a 
45-year-old fleet manager find what they need here in 3 seconds?`,
      },
      {
        title: "The design system is the product, not just a support tool.",
        body: `On a platform this large, consistency is a feature. The time invested in 
tokens and components upfront saved weeks of inconsistency fixes later.`,
      },
      {
        title: "The unsexy flows are often the most important ones.",
        body: `Bulk import, document expiry reminders, permission configuration — none are 
headline features. All of them are what users actually spend their time in.`,
      },
      {
        title: "Winning an award is a milestone, not a finish line.",
        body: `Pilot feedback is still coming in. The best version of DadyCar is still 
being designed.`,
      },
    ],

    tools: ["Figma", "FigJam", "Notion", "Maze", "Tailwind CSS", "shadcn/ui"],

    screens: [
      { label: "Dashboard Overview", image: "dadycar-Dashboard" },
      { label: "Vehicle Management", image: "dadycar-Vehicule" },
      { label: "Bulk Import — Column Mapping", image: "dadycar-Bulk" },
      { label: "Bulk Import — Error Review", image: "dadycar-Bulk-error" },
      { label: "Roles & Permissions Matrix", image: "dadycar-Telamitc" },
      { label: "Maintenance Tracking", image: "dadycar-Map" },
    ],

    stats: [
      { value: "60+", label: "Components built" },
      { value: "18+", label: "Modules covered" },
      { value: "100%", label: "Token-based system" },
    ],

    nextProject: {
      title: "FocusCare — Pre-Surgical Clinical Workflow Platform",
      id: "focuscare",
    },
  },
  {
    id: "focuscare",
    tag: "Healthcare SaaS · B2B · Clinical",
    tagColor: "green",
    title: "FocusCare — Pre-Surgical Clinical Workflow Platform",
    role: "Product Designer · End-to-End UI/UX",
    client: "FocusCare",
    year: "2023–2024",
    duration: "8 months",
    heroImage: "focuseCare-Dashboard",

    context: `Pre-surgical workflows at hospitals are notoriously fragmented. 
Paper forms, disconnected EHR systems, manual phone calls between departments, 
and patients showing up unprepared — these delays cost hospitals millions 
annually in cancelled surgeries and wasted resources. FocusCare was built to 
digitize and streamline the entire pre-surgical patient journey.`,

    userInsight: `Our users are dual: clinical staff who need speed and accuracy 
in high-stress environments, and patients (often elderly or anxious) who need 
clarity and reassurance. Both needed to be served without compromising the other.`,

    overview: `Complete product redesign of a pre-surgical workflow platform — 
from patient intake forms through post-op instructions, covering 12 distinct 
user journeys across 3 user roles.`,

    challenge: `The existing product was functional but cluttered, with 15+ page 
navigations required to complete a single patient workflow. Both clinical staff 
and patients were frustrated. The product averaged 2.8 stars in app store reviews.`,

    solution: `A role-based dashboard that surfaces the right information for each user — 
clinical staff get quick-action views with batch processing capabilities, while patients 
get a guided, reassuring journey with clear progress indicators and timely reminders.`,

    team: ["1 PM", "1 Clinical Lead", "2 Frontend Devs", "2 Backend Devs", "1 Designer (me)"],

    designChallenges: [
      {
        number: "01",
        title: "Patient vs. Clinical — Two Users, One Product",
        problem: `Clinical staff needed speed (processing dozens of patients daily), 
while patients needed hand-holding (often elderly, anxious, unfamiliar with medical processes). 
The existing interface served neither well.`,
        solution: `Two distinct dashboard views: Clinical gets a list/table view 
with bulk actions and keyboard shortcuts. Patients get a step-by-step guided flow 
with plain-language instructions, progress bars, and gentle reminders.`,
        insight: `One product can be two different experiences. Design for each 
user's context, not your own.`,
      },
      {
        number: "02",
        title: "EHR Integration — Designing Around Constraints",
        problem: `Integration with hospital EHR systems was limited to certain 
data formats and update frequencies. We couldn't redesign the underlying data 
— only how it was displayed and collected.`,
        solution: `A flexible form engine that adapts to available EHR fields, 
with graceful degradation for missing data. Smart defaults populated where possible, 
clear indicators when manual entry was required.`,
        insight: `Work with constraints, not against them. Limitations often drive 
the most creative solutions.`,
      },
      {
        number: "03",
        title: "Compliance Without Complexity",
        problem: `HIPAA and hospital compliance requirements meant certain fields 
had to be locked, certain actions had to be logged, and audit trails had to exist. 
But compliance UI often felt like a wall between users and their tasks.`,
        solution: `Compliance as background behavior where possible (auto-logging, 
silent validation), and contextual prompts where user action was needed. RedACTION 
required for sensitive actions made them feel purposeful, not punitive.`,
        insight: `Compliance doesn't have to feel like bureaucracy. Make it feel 
like care.`,
      },
    ],

    outcomes: [
      "App store rating improved from 2.8 to 4.5 stars within 3 months of redesign",
      "Average patient form completion time reduced by 65%",
      "Clinical staff throughput increased by 40% with new batch processing features",
      "Cancelled surgeries due to incomplete pre-op requirements dropped by 80%",
      "Adopted by 3 additional hospital networks within 6 months of launch",
    ],

    learnings: [
      {
        title: "Dual-user products need dual research.",
        body: `I spent equal time in clinical environments and with patients. 
Both revealed needs that would have been invisible studying only one group.`,
      },
      {
        title: "Speed for experts and comfort for beginners can coexist.",
        body: `The same underlying platform can offer different interfaces, 
shortcuts for power users, and guided flows for new users — without doubling maintenance.`,
      },
      {
        title: "Compliance is a feature, not a constraint.",
        body: `When we designed compliance into the experience rather than around it, 
it became a selling point ("your data is protected") rather than a friction point.`,
      },
      {
        title: "Healthcare moves slow. That's okay.",
        body: `12-month pilot programs are normal in healthcare. Design for the 
long haul — iterative improvements beat big-bang launches.`,
      },
    ],

    tools: ["Figma", "Dovetail", "Miro", "UserTesting", "Tailwind CSS", "Radix UI"],

    screens: [
      { label: "Clinical Dashboard", image: "focuscare-Dashboard" },
      { label: "Patient Journey Flow", image: "focuscare-patient" },
      { label: "Pre-Op Checklist", image: "focuscare-consultation" },
      { label: "Batch Patient Processing", image: "focuscare-surgon" },
      { label: "Compliance Audit Log", image: "focuscare-ficherliason" },
      { label: "Patient Communication Center", image: "focuscare-consultation-fini" },
    ],

    stats: [
      { value: "65%", label: "Faster form completion" },
      { value: "40%", label: "Increased throughput" },
      { value: "4.5★", label: "App store rating" },
    ],

    nextProject: {
      title: "DadyCar — Fleet Management Platform",
      id: "dadycar",
    },
  },
  {
    id: "shihany",
    tag: "Sports Management · SaaS · KSA",
    tagColor: "green",
    award: null,
    title: "Shihany — Sports Club Management Ecosystem",
    role: "Product Designer · 4 Products · End-to-End UI/UX",
    client: "Shihany",
    year: "2023–2024",
    duration: "Full Cycle",
    heroImage: "shihany-hub",

    context: `Youth sports clubs in Saudi Arabia are running on informal systems. 
WhatsApp groups for scheduling, paper sheets for attendance, cash payments with 
no tracking, and zero visibility for parents into what is happening with their 
child's training. For a club owner trying to grow, this is not just inconvenient 
— it is a ceiling. You cannot scale a club you cannot manage. You cannot retain 
parents who feel disconnected. Shihany was built to change that — a complete 
sports management ecosystem connecting clubs, coaches, players, and parents 
in one interconnected platform designed specifically for youth sports clubs 
across Saudi Arabia.`,

    userInsight: `Parents and coaches were not failing because they didn't care 
— they were failing because the tools forced them into informal workarounds. 
A WhatsApp group is not a scheduling system. It is a symptom of a missing one.`,

    overview: `End-to-end product design of a 4-product sports management ecosystem 
— two mobile apps and two web platforms — each with their own design system, 
all sharing one interconnected data layer.`,

    challenge: `Clubs managed everything through WhatsApp groups and paper sheets. 
Schedule changes were missed, attendance was never digitized, payments were 
untracked, and parents had zero visibility into their child's training. 
The product had to be clearly better than a free familiar tool people already knew.`,

    solution: `A four-product ecosystem: Shihany Hub (web, club management), 
Shihany App (mobile, players and parents), Shihany Pro (mobile, coaches), 
and Shihany Federation (web, federation oversight) — all interconnected, 
each with its own color identity within two shared design systems.`,

    team: ["1 PM", "1 PO", "2 Frontend Devs", "2 Backend Devs", "1 Designer (me)"],

    ecosystem: [
      {
        name: "Shihany Hub",
        type: "Web",
        user: "Club owners & admin staff",
        description: "The operational center. Club management, scheduling, payments, player roster, coach management. Everything connects to it.",
      },
      {
        name: "Shihany App",
        type: "Mobile",
        user: "Players & parents",
        description: "Parents search nearby clubs, register their child, track attendance, receive schedule updates, and manage payments.",
      },
      {
        name: "Shihany Pro",
        type: "Mobile",
        user: "Coaches",
        description: "Check appointments, view player profiles, start and end sessions, scan QR attendance, manage session content.",
      },
      {
        name: "Shihany Federation",
        type: "Web",
        user: "Sports federations (KSA)",
        description: "League management, competition scheduling, club oversight, and official reporting at federation level.",
      },
    ],

    designChallenges: [
      {
        number: "01",
        title: "Attendance — From Paper and Pen to QR Code",
        problem: `Attendance was done on paper — a printed sheet, a pen, a coach 
manually checking off names before a chaotic warmup with 20 kids. Sheets got lost, 
data was never digitized, and parents had zero visibility. The goal was to make 
attendance so fast that a coach would actually use it mid-session, standing on a 
pitch, with kids running around them.`,
        solution: `QR code check-in: each player has a unique QR code in the parent's 
Shihany App. The coach opens Pro, starts the session, scans players as they arrive. 
Attendance syncs to Hub instantly. Parents receive a notification: 
"Your child checked in to training at 5:03pm." 
The scan flow is one tap from anywhere in the app — no navigation required 
for a coach mid-session.`,
        insight: `A coach mid-session cannot afford to dig through menus. Every interaction in Shihany Pro had to be completable with one hand in under 5 seconds.`,
      },
      {
        number: "02",
        title: "Bulk Player Import With Pending Parent Linking",
        problem: `Clubs joining Shihany had their player roster in Excel, WhatsApp 
contacts, or paper forms. Manually re-entering 80 players one by one was a 
dealbreaker. The additional challenge: each player needed to be linked to a 
parent account — but the parent may not have downloaded the app yet.`,
        solution: `Progressive bulk import: Upload → Column Mapping → Error Review 
→ Confirm. For players with no registered parent, the system imports the player, 
flags them as "pending parent", and automatically sends an invitation SMS to 
the parent's phone number. The pending state has its own designed appearance 
in Hub, in Pro, and resolves automatically once the parent registers.`,
        insight: `Import flows need to handle the reality of messy, incomplete data — not the ideal case.`,
      },
      {
        number: "03",
        title: "One Ecosystem, Four Experiences",
        problem: `Four products, four user types, two device contexts, four color 
identities — without making them feel like four unrelated apps. A user moving 
between products needed to feel orientation, not confusion. The dev team needed 
to work across both mobile and web without relearning component logic.`,
        solution: `Two-layer design system: Layer 1 — shared foundations across all 
products (spacing, typography, border radius, shadow, interaction patterns, 
component behavior). Layer 2 — product-specific color identity. Mobile system 
built for thumb-zone navigation and one-handed use. Web system built for 
information density. Both systems share naming conventions and component logic.`,
        insight: `An ecosystem is only as strong as its weakest product. You cannot design them in isolation even if you build them in sequence.`,
      },
    ],

    outcomes: [
      "Adopted by 10+ clubs and 30+ coaches across Saudi Arabia",
      "QR attendance became the most praised feature by both coaches and parents",
      "Clubs replaced WhatsApp scheduling entirely with Hub session management",
      "Parents gained real-time visibility into their child's training for the first time",
      "4 products shipped: 2 mobile apps + 2 web platforms with 2 design systems",
      "Product paused due to investment constraints — not product-market fit",
    ],

    learnings: [
      {
        title: "An ecosystem is only as strong as its weakest product.",
        body: `If the parent app is confusing, coaches lose attendance data. 
If Hub is slow, clubs don't invite coaches. Every product in the chain 
affects every other.`,
      },
      {
        title: "Mobile design for coaches means designing for distraction.",
        body: `A coach mid-session is moving, talking, managing children. 
Every interaction in Shihany Pro had to be completable with one hand 
in under 5 seconds. That constraint made the product better.`,
      },
      {
        title: "WhatsApp is the competitor, not other sports software.",
        body: `The real benchmark was a free, familiar tool people already knew. 
The product had to be clearly better than a WhatsApp group to earn adoption. 
That bar is higher than it sounds.`,
      },
      {
        title: "A great product can still fail without investment.",
        body: `Shihany worked. Clubs used it. Coaches preferred it over paper. 
The lesson is not about design — it is about the full journey from product to business.`,
      },
    ],

    tools: ["Figma", "FigJam", "Notion", "Tailwind CSS", "shadcn/ui", "React Native"],

    screens: [
      { label: "Shihany Hub — Club Dashboard", image: "shihany-hub" },
      { label: "Shihany Hub — Player Roster", image: "shihany-hub-training" },
      { label: "Shihany Pro — Session View", image: "shihany-pro" },
      { label: "Shihany Pro — QR Attendance Scan", image: "shihany-player" },
      { label: "Shihany App — Parent Home", image: "shihany-player" },
      { label: "Shihany Federation — League Overview", image: "shihany-fed" },
    ],

    nextProject: {
      title: "Resaglob — Travel Agency Hotel Booking System",
      id: "resaglob",
    },
  },
  {
    id: "resaglob",
    tag: "Travel · B2B SaaS · Algeria",
    tagColor: "teal",
    award: null,
    title: "Resaglob — Travel Agency Hotel Booking System",
    role: "Product Designer · End-to-End UI/UX",
    client: "Resaglob",
    year: "2024–2025",
    duration: "In Development",
    heroImage: "resaglob-Hotel Search",

    context: `Travel agencies in Algeria are sitting at the intersection of high 
client expectations and outdated tooling. Their clients want fast, reliable hotel 
reservations anywhere in the world. Their tools — consumer platforms like 
Booking.com, legacy interfaces with poor UX, and manual Excel spreadsheets — 
were never designed for professional agency workflows. The breaking point was 
data reliability. A room showing as available in the morning could already be 
booked by the time the agent finished entering the client's information. 
Resaglob was built to fix that — a B2B SaaS platform where travel agencies 
subscribe, connect to live hotel inventory via supplier APIs, and manage the 
full reservation workflow in one place, from search to confirmed booking.`,

    userInsight: `Every tool available to travel agents was either built for 
consumers (Booking.com) or built for IT departments (legacy GDS). Nothing was 
built for a non-technical professional who needs to move fast and get it right.`,

    overview: `Full end-to-end product design of a B2B travel agency SaaS — 
a professional hotel and flight booking platform connecting Algerian travel 
agencies to worldwide live inventory via supplier APIs.`,

    challenge: `Agents used consumer platforms and legacy tools with stale inventory 
data. Rooms shown as available were sometimes already booked by the time the 
agent confirmed with the client. No unified workflow existed between search, 
client data entry, and booking confirmation.`,

    solution: `A unified booking platform with a tabbed smart search bar, 
progressive data density across search results and hotel detail views, 
real-time inventory indicators, graceful race condition error handling, 
and skeleton loading states for slow API responses.`,

    team: ["1 Frontend Dev", "2 Backend Devs", "1 Designer (me)"],

    designChallenges: [
      {
        number: "01",
        title: "The Search Bar — Making Complexity Disappear",
        problem: `Hotel search requires: destination, check-in and check-out dates, 
number of adults, number of children, age of each child, number of rooms, 
and occupancy per room. Presented wrong it looks like a form from 2009. 
The agent needs to move through this in seconds while a client is sitting 
across from them waiting.`,
        solution: `A tabbed search bar with three modes — Hotels, Flights, Packages. 
Each tab shows only its relevant fields. The guest and room configuration 
collapses into one field that opens a clean popover: 
"2 adults · 1 child (age 7) · 1 room". 
The complexity lives in the popover, not on the surface. 
Early agent testing confirmed: "I liked how the search felt. It was clear 
what I needed to fill."`,
        insight: `The complexity lives in the popover, not on the surface. An agent who has done this a hundred times moves through it in seconds.`,
      },
      {
        number: "02",
        title: "Real-Time Inventory — Designing for the Race Condition",
        problem: `A room showing as available can get booked by another agency 
while the agent is mid-reservation. After the agent has already told their 
client "I've got your room." This race condition cannot be fully prevented 
technically — but the UX response to it can be the difference between a 
professional recovery and a broken experience.`,
        solution: `Two-part response: (1) Transparency — search results show a 
last-updated timestamp and live availability indicator. Manual refresh always 
one click away. (2) Graceful failure — if a room becomes unavailable at 
confirmation, the system shows: "This room was just taken. Here are the 
next best available options." The agent stays in the flow. 
Skeleton loading and progress bars throughout ensure slow API responses 
never look like crashes.`,
        insight: `Design for failure, not just success. A well-designed error keeps the agent professional in front of their client.`,
      },
      {
        number: "03",
        title: "Dense Hotel Data — Progressive Information Reveal",
        problem: `Each hotel result contains: name, location, star rating, images, 
amenities, cancellation policy. Each room type contains: name, occupancy, 
bed configuration, inclusions, price per night, total price, cancellation 
terms, availability. Multiply across dozens of results and the screen 
becomes overwhelming immediately.`,
        solution: `Progressive data density across three levels: 
(1) Search results — hotel name, star rating, location, lowest price, 
one image. Enough to compare, nothing more. 
(2) Hotel detail — all room types, full pricing, amenity list, policies. 
(3) Booking form — client details, special requests, payment, confirmation. 
Each step reveals more detail only when the agent is ready for it.`,
        insight: `Cognitive load stays manageable when each step reveals only what the agent needs to decide right now.`,
      },
    ],

    outcomes: [
      "Currently in active development",
      "Early flow testing with travel agent produced positive feedback on search UX",
      "Tabbed search bar reduced complex multi-parameter hotel search to a single clean interaction",
      "Race condition error handling designed to keep agents professional in front of clients",
      "Skeleton loading and progress indicators eliminated perceived crashes from slow supplier APIs",
    ],

    learnings: [
      {
        title: "The search bar is the product.",
        body: `In a booking tool, the search experience sets the tone for everything 
that follows. Getting it right was worth more design time than any other 
single element.`,
      },
      {
        title: "Design for failure, not just success.",
        body: `The race condition problem showed that the most important screens 
in a booking flow are the error screens. A well-designed failure message 
keeps the agent professional. A poorly designed one destroys trust instantly.`,
      },
      {
        title: "Loading states are UX, not engineering.",
        body: `When data comes from external APIs, slowness is inevitable. 
Skeleton screens and progress indicators are the difference between 
an agent thinking the tool is broken and an agent trusting it is working.`,
      },
      {
        title: "A lean team forces design clarity.",
        body: `With one frontend developer, there was no room for complexity 
for complexity's sake. Every design decision had to be justifiable in 
implementation terms. That constraint produced a cleaner product.`,
      },
    ],

    tools: ["Figma", "FigJam", "Notion", "Tailwind CSS", "shadcn/ui"],

    screens: [
      { label: "Hotel Search — Tabbed Search Bar", image: "resaglob-Hotel Search" },
      { label: "Search Results — Hotel List", image: "resaglob-Clients" },
      { label: "Hotel Detail — Room Types", image: "resaglob-Map" },
      { label: "Guest Configuration Popover", image: "resaglob-reservation" },
      { label: "Booking Form — Client Details", image: "resaglob-Resume" },
      { label: "Booking Confirmation Screen", image: "resaglob-Hotel Search" },
    ],

    nextProject: {
      title: "DadyCar — Fleet Management Platform",
      id: "dadycar",
    },
  },
]