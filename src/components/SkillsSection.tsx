"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

// Skills data from original portfolio
const skills = [
    { id: "html", name: "HTML5", description: "Estrutura e semântica", icon: "/icons/html.svg", category: "frontend", url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
    { id: "css", name: "CSS3", description: "Estilização e design", icon: "/icons/css.svg", category: "frontend", url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS" },
    { id: "javascript", name: "JavaScript", description: "Lógica e interatividade", icon: "/icons/javascript.svg", category: "frontend", url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" },
    { id: "flutter", name: "Flutter", description: "Desenvolvimento mobile", icon: "/icons/flutter.svg", category: "mobile", url: "https://flutter.dev/" },
    { id: "golang", name: "Golang", description: "Servidores de alto desempenho", icon: "/icons/golang.svg", category: "backend", url: "https://golang.org/" },
    { id: "java", name: "Java", description: "Aplicações empresariais", icon: "/icons/java.svg", category: "backend", url: "https://www.java.com/" },
    { id: "python", name: "Python", description: "Automação e data science", icon: "/icons/python.svg", category: "backend", url: "https://www.python.org/" },
    { id: "Angular", name: "Angular", description: "Desenvolvimento de UI", icon: "/icons/angular.svg", category: "frontend", url: "https://angular.dev/" },
    { id: "nodejs", name: "Node.js", description: "JavaScript no servidor", icon: "/icons/nodejs.svg", category: "backend", url: "https://nodejs.org/" },
];

const categoryColors: Record<string, string> = {
    frontend: "border-t-[#00c6ff]",
    backend: "border-t-[#0072ff]",
    mobile: "border-t-[#ff4d94]",
    devops: "border-t-[#10b981]",
};

function SkillCard({ skill, index, isInView }: { skill: typeof skills[0]; index: number; isInView: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`block glass-card rounded-2xl p-8 text-center border-t-[3px] hover:-translate-y-2.5 w-full ${categoryColors[skill.category]}`}
        >
            <div className="relative w-15 h-15 mx-auto mb-4">
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={60}
                    height={60}
                    className={`transition-all duration-400 ${isHovered ? "grayscale-0 scale-110 rotate-[5deg]" : "grayscale"}`}
                />
            </div>

            <h3 className={`font-heading text-lg mb-1 transition-all duration-400 ${isHovered ? "text-primary drop-shadow-[0_0_8px_var(--primary)]" : "text-foreground"}`}>
                {skill.name}
            </h3>
            <p className={`text-sm mb-4 transition-all duration-400 ${isHovered ? "text-primary drop-shadow-[0_0_8px_var(--primary)]" : "text-muted-foreground"}`}>
                {skill.description}
            </p>

            <div className="w-full mt-2.5">
            </div>
        </motion.a>
    );
}

export function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="habilidades" className="py-24 bg-background">
            <div className="max-w-[1200px] mx-auto px-5" ref={ref}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-[2.5rem] text-center mb-12 section-title"
                >
                    Habilidades e Ferramentas
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.id} skill={skill} index={index} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
