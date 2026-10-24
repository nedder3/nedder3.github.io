import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Ariel Jaime | Senior Backend Engineer",
  DESCRIPTION: "Senior Backend Engineer and Distributed Systems Architect specializing in Java 21, high-concurrency architectures, and scalable distributed primitives.",
  AUTHOR: "Ariel Jaime",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work Experience",
  DESCRIPTION: "Professional engineering history, enterprise clients, and technical leadership roles.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Articles & Architecture",
  DESCRIPTION: "Deep dives on concurrency, distributed systems, cache topologies, and modern Java runtime internals.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Engineering Projects",
  DESCRIPTION: "Production systems, distributed infrastructure, non-blocking libraries, and open-source tooling.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search technical articles and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Work", 
    HREF: "/work", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "arij.dev@gmail.com",
    HREF: "mailto:arij.dev@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "nedder3",
    HREF: "https://github.com/nedder3"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "Ariel Jaime",
    HREF: "https://www.linkedin.com/in/ariel-jaime/",
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "arij_dev",
    HREF: "https://twitter.com/arij_dev",
  },
]
