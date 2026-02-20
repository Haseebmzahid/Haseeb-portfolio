export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const siteConfig = {
  name: "Haseeb",
  title: "Haseeb | Software Engineer",
  description:
    "Personal portfolio of Haseeb — Software Engineer specializing in modern web technologies.",
};
