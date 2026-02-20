export interface Skill {
    name: string;
}

export interface SkillCategory {
    title: string;
    emoji: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Languages",
        emoji: "🧠",
        skills: [
            { name: "Python" },
            { name: "JavaScript" },
            { name: "TypeScript" },
            { name: "Java" },
            { name: "C++" },
            { name: "Go" },
            { name: "Rust" },
            { name: "SQL" },
        ],
    },
    {
        title: "Backend & Databases",
        emoji: "🗄️",
        skills: [
            { name: "Node.js" },
            { name: "Express.js" },
            { name: "Django" },
            { name: "FastAPI" },
            { name: "MongoDB" },
            { name: "PostgreSQL" },
            { name: "Redis" },
            { name: "GraphQL" },
            { name: "Prisma" },
        ],
    },
    {
        title: "DevOps & Systems",
        emoji: "⚙️",
        skills: [
            { name: "Docker" },
            { name: "Kubernetes" },
            { name: "AWS" },
            { name: "CI/CD" },
            { name: "Linux" },
            { name: "Nginx" },
            { name: "Terraform" },
            { name: "GitHub Actions" },
        ],
    },
    {
        title: "Mobile & Web",
        emoji: "📱",
        skills: [
            { name: "React" },
            { name: "Next.js" },
            { name: "React Native" },
            { name: "Tailwind CSS" },
            { name: "Framer Motion" },
            { name: "HTML5" },
            { name: "CSS3" },
            { name: "REST APIs" },
        ],
    },
    {
        title: "AI & Data",
        emoji: "🤖",
        skills: [
            { name: "TensorFlow" },
            { name: "PyTorch" },
            { name: "LangChain" },
            { name: "OpenAI API" },
            { name: "Pandas" },
            { name: "NumPy" },
            { name: "Scikit-learn" },
            { name: "RAG Systems" },
        ],
    },
];
