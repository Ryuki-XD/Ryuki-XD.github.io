/**
 * Project data.
 *
 * Every field here is drawn from the project's own README — nothing is
 * estimated or embellished. Add a project by appending to this array;
 * `featured: true` promotes it to the wide case-study card at the top of the
 * Projects section.
 */

export interface Project {
  /** Stable key used for React keys and anchor ids. */
  slug: string;
  title: string;
  category: string;
  /** One-paragraph overview. */
  description: string;
  /** What I actually did on this project. */
  role: string;
  tags: string[];
  /** Concrete, verifiable capabilities. Shown on featured cards. */
  highlights?: string[];
  /** Public source repository. */
  code?: string;
  /** Playable / runnable build, where one exists. */
  demo?: string;
  /** Short status pill, e.g. for work not yet publicly released. */
  status?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "shivganga-delivery",
    title: "Shiv Ganga Delivery",
    category: "Mobile App",
    description:
      "An Android delivery partner app for Shiv Ganga Enterprises. Drivers sign in, see the orders assigned to them, call the customer, and move each order through confirmed, out for delivery, and delivered — with the order list syncing live from Firestore.",
    role: "Solo developer — built the Flutter app end to end, from the Firestore data model and auth through to the bilingual UI.",
    tags: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Provider"],
    highlights: [
      "Live order list backed by Cloud Firestore",
      "Email and password sign-in through Firebase Auth",
      "Three-stage delivery workflow with confirmation dialogs",
      "Full Hindi and English interface with an in-app language toggle",
      "One-tap call to the customer, and cash-on-delivery amount prompts",
      "Pending and delivered tabs with running totals",
    ],
    // Not public: no repository link, and the Play Store listing is not live yet.
    status: "In review on Google Play",
    featured: true,
  },
  {
    slug: "ai-solutions-website",
    title: "AI Solutions Website",
    category: "Full-Stack Web",
    description:
      "A demo business website with a CMS-style admin dashboard, an AI chatbot, and email automation. A vanilla-JavaScript front end talks to a Python HTTP server exposing a REST-style API backed by MongoDB.",
    role: "Solo developer — built the front end, the Python API, and the database layer for the CET333 Product Development module.",
    tags: ["JavaScript", "Python", "MongoDB", "REST API", "Gemini AI"],
    highlights: [
      "Admin dashboard for managing site content without touching code",
      "Chatbot powered by the Google Gemini API",
      "Email automation through Mailtrap",
      "REST-style API served by a Python HTTP server over MongoDB",
      "API keys entered at runtime in admin settings — never committed to the repo",
    ],
    code: "https://github.com/Ryuki-XD/ai-solutions-website",
    featured: true,
  },
  {
    slug: "chrono-architect",
    title: "Chrono Architect",
    category: "Browser Game",
    description:
      "A browser puzzle game built on the idea of cooperating with your own past. Record a run, commit it as a time clone, then solve each level alongside the clones you have already made. Every asset is generated in code — no backend, no image files.",
    role: "Solo developer — game design, ES6 module architecture, puzzle levels, and touch controls.",
    tags: ["JavaScript", "Phaser 3", "ES6 Modules", "HTML5 Canvas"],
    highlights: [
      "Record-and-replay clone mechanic driving every puzzle",
      "Pressure plates, doors, crates, laser beams, switches, and moving platforms",
      "Undo, restart, and in-level hint systems",
      "On-screen D-pad and action buttons appear automatically on touch devices",
      "Procedurally generated graphics — zero external assets",
    ],
    demo: "https://ryuki-xd.github.io/chrono-architect/",
    code: "https://github.com/Ryuki-XD/chrono-architect",
    featured: true,
  },
  {
    slug: "cyber-heist",
    title: "Cyber Heist",
    category: "Browser Game",
    description:
      "A cyberpunk stealth infiltration game: evade guard AI patrols and sweeping security cameras, hack terminals through a minigame, and escape before lockout. Graphics and audio are generated programmatically with Canvas and the Web Audio API.",
    role: "Solo developer — built the scene system, guard AI state machines, and save/achievement systems.",
    tags: ["JavaScript", "Phaser 3", "Canvas", "Web Audio"],
    highlights: [
      "Finite-state-machine guard AI and camera sweep detection",
      "Hacking minigame, save profiles, and achievement milestones",
      "Modular scene architecture across boot, menu, game, and overlay scenes",
      "Touch joystick and virtual action controls for mobile",
    ],
    demo: "https://ryuki-xd.github.io/cyber-heist/",
    code: "https://github.com/Ryuki-XD/cyber-heist",
  },
  {
    slug: "library-management-system",
    title: "Athena Library Management System",
    category: "Desktop App",
    description:
      "A JavaFX desktop application for managing books, students, and loans over MySQL. Built to the MVC pattern with a DAO abstraction over the database, plus dashboards, reports, and a light/dark theme switch.",
    role: "Solo developer — designed the layered architecture and implemented every layer from schema to UI.",
    tags: ["Java", "JavaFX", "MySQL", "Maven", "MVC"],
    highlights: [
      "MVC controllers with a DAO layer keeping SQL out of the UI",
      "SHA-256 hashed logins and session management",
      "Issue/return workflow with loan caps and automatic overdue fine accrual",
      "Dashboard with genre pie charts and six-month borrowing trends",
    ],
    code: "https://github.com/Ryuki-XD/library-management-system",
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System",
    category: "Desktop App",
    description:
      "A desktop inventory application with dashboard KPIs and charts, sales and purchase tracking, Code128 barcode generation, printable PDF invoices, Excel/CSV export, and database backup and restore.",
    role: "Solo developer — modular service-layer architecture with dataclass models and typed, PEP 8 code.",
    tags: ["Python", "CustomTkinter", "SQLite", "pandas"],
    highlights: [
      "PBKDF2-SHA256 password hashing for logins",
      "Full product CRUD with SKU, categories, and low-stock alerts",
      "Sales cart with tax and discounts; purchases auto-update stock",
      "Excel/CSV export, PDF invoices, and database backup/restore",
    ],
    code: "https://github.com/Ryuki-XD/inventory-management-system",
  },
  {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    category: "AI / Data App",
    description:
      "An ATS-style resume scorer built with Streamlit. Upload a CV, paste a job description, and get a compatibility score from TF-IDF and cosine similarity, plus matched and missing keywords and prioritised improvement suggestions.",
    role: "Solo developer — separated the Streamlit UI, analysis services, and data models into their own layers.",
    tags: ["Python", "Streamlit", "scikit-learn", "Plotly"],
    highlights: [
      "PDF and DOCX parsing with text extraction",
      "ATS score via TF-IDF and cosine similarity against the job description",
      "Skill gap analysis grouped by category",
      "Gauge, bar, and radar charts, plus a downloadable PDF report",
    ],
    code: "https://github.com/Ryuki-XD/ai-resume-analyzer",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
