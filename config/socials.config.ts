import type React from "react";
import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react";

export interface SocialLink {
    label: string;
    href: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const socialLinks: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/Haseebmzahid",
        icon: Github,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/m-haseeb-zahid-033ab632a/",
        icon: Linkedin,
    },
    {
        label: "Email",
        href: "mailto:haseebg460@gmail.com",
        icon: Mail,
    },
];

export { ArrowDown, FileText };
