import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Ariel Jaime",
  DESCRIPTION: "Welcome to Ariel Jaime, a portfolio and blog for designers and developers.",
  AUTHOR: "Ariel Jaime",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
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
    TEXT: "Blog", 
    HREF: "/blog", 
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
    HREF: "https://github.com/nedder3/nedder3"
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

