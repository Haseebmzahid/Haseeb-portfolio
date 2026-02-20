/**
 * Central site configuration — feeds into layout.tsx metadata,
 * sitemap generation, OG images, and structured data.
 */

export const siteConfig = {
    name: "Haseeb Zahid",
    title: "Haseeb Zahid | AI & Backend Software Engineer",
    description:
        "Full-Stack Software Engineer specializing in AI systems, backend development, and DevOps practices.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://haseebzahid.dev",
    locale: "en_US",
    keywords: [
        "Haseeb Zahid",
        "AI Software Engineer",
        "Backend Developer",
        "Full-Stack Developer",
        "DevOps Engineer",
        "Next.js",
        "TypeScript",
        "Python",
        "Machine Learning",
        "MongoDB",
        "React",
        "Node.js",
        "Portfolio",
    ],
    author: {
        name: "Haseeb Zahid",
        url: "https://github.com/Haseebmzahid",
    },
    social: {
        github: "https://github.com/Haseebmzahid",
        linkedin: "https://www.linkedin.com/in/m-haseeb-zahid-033ab632a/",
        email: "haseebg460@gmail.com",
    },
} as const;
