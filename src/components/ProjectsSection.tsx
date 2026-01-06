"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";

// Projects data from original portfolio
const projects = [
    {
        id: "parkwise",
        title: "ParkWISE",
        category: "mobile",
        categoryLabel: "Mobile",
        shortDescription: "Aplicativo móvel para monitoramento e gestão de estacionamento em tempo real.",
        fullDescription: "O ParkWISE permite que os usuários encontrem vagas, e podem tambem gerenciar suas reservas de estacionamento com facilidade. O aplicativo oferece funcionalidades como navegação até a vaga, notificações em tempo real sobre o status do estacionamento.",
        technologies: ["Flutter", "Firebase", "Dart"],
        image: "/images/projetos/parkwise.png",
        liveUrl: "https://github.com/AlguemDaRua/parkwise/releases/download/v1.0.1/app-arm64-v8a-release.apk",
        githubUrl: "https://github.com/AlguemDaRua/parkwise",
        featured: false,
        status: "completed",
        statusLabel: "Concluido",
    },
    {
        id: "ramsonsware",
        title: "Dummy Ramsonsware",
        category: "Desktop",
        categoryLabel: "Aplicativo Desktop",
        shortDescription: "Ransomware educacional desenvolvido em GoLang para fins de conscientização sobre segurança cibernética.",
        fullDescription: "Ransomware fictício criado para demonstrar como ataques de ransomware funcionam. Este projeto é destinado exclusivamente para fins educacionais e de conscientização, ajudando profissionais de segurança a entenderem as técnicas utilizadas por atacantes.",
        technologies: ["Golang"],
        image: "/images/projetos/ramson.png",
        liveUrl: "https://github.com/AlguemDaRua/Dummy-RansomeWare-GoLang/releases",
        githubUrl: "https://github.com/AlguemDaRua/Dummy-RansomeWare-GoLang",
        featured: false,
        status: "completed",
        statusLabel: "Concluido",
    },
    {
        id: "SnakeGame",
        title: "SnakeGame",
        category: "Desktop",
        categoryLabel: "Aplicativo Desktop",
        shortDescription: "Jogo de Cobra moderno e com minigames feito com Python e Pygame.",
        fullDescription: "Jogo clássico da cobra com gráficos modernos e minigames adicionais. Desenvolvido usando Python e a biblioteca Pygame, este projeto oferece uma experiência divertida e nostálgica para jogadores de todas as idades.",
        technologies: ["Python", "Pygame"],
        image: "",
        liveUrl: "",
        githubUrl: "https://github.com/AlguemDaRua/SnakeGame",
        featured: false,
        status: "paused",
        statusLabel: "Pausado",
    },
    {
        id: "prayer-times",
        title: "Prayer Times",
        category: "mobile",
        categoryLabel: "Mobile",
        shortDescription: "Aplicativo móvel FOSS para exibir horários de oração islâmica com base na localização do usuário.",
        fullDescription: "A aplicação busca horários de oração precisos usando APIs públicas e oferece notificações para lembrar os usuários dos horários de oração. Ideal para muçulmanos que desejam manter sua prática religiosa em dia.",
        technologies: ["Dart", "Flutter", "API REST", "Geolocalização", "Notificações Push", "Open Source", "FOSS"],
        image: "",
        liveUrl: "",
        githubUrl: "https://github.com/AlguemDaRua/Prayer-times",
        featured: false,
        status: "paused",
        statusLabel: "Pausado",
    },
    {
        id: "getjobs",
        title: "GetJobs",
        category: "web",
        categoryLabel: "Web",
        shortDescription: "GetJobs é uma plataforma web para busca e oferta de empregos para todas as areas.",
        fullDescription: "GetJobs conecta empregadores e candidatos a emprego, facilitando o processo de recrutamento. A plataforma oferece filtros avançados de busca, perfis detalhados de empresas e candidatos, além de um sistema de candidatura simplificado.",
        technologies: ["Angular", "Node.js", "Express", "MySql", "TailwindCSS"],
        image: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        status: "development",
        statusLabel: "Em Desenvolvimento",
    },
];

const categories = [
    { id: "all", label: "Todos" },
    { id: "mobile", label: "Mobile" },
    { id: "web", label: "Web" },
    { id: "Desktop", label: "Desktop" },
];

const statusClasses: Record<string, string> = {
    completed: "status-completed",
    active: "status-active",
    development: "status-development",
    paused: "status-paused",
};

export function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

    return (
        <section id="projetos" className="py-24 bg-background">
            <div className="max-w-[1200px] mx-auto px-5" ref={ref}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-[2.5rem] text-center mb-12 section-title"
                >
                    Projectos Recentes
                </motion.h2>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center flex-wrap gap-4 mb-10"
                >
                    {categories.map((cat, index) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                            className={`px-7 py-3 rounded-full font-semibold transition-all duration-400 shadow-[var(--shadow)] ${activeFilter === cat.id
                                ? "bg-primary text-white"
                                : "bg-card text-foreground hover:bg-primary hover:text-white hover:-translate-y-1"
                                }`}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            className={`glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col hover:-translate-y-2.5 ${project.featured ? "border-2 border-primary" : ""
                                }`}
                        >
                            {/* Project Image */}
                            <div className="h-[220px] bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
                                {project.image && (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                {/* Status Badge */}
                                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${statusClasses[project.status]}`}>
                                    {project.statusLabel}
                                </span>
                                {project.featured && (
                                    <span className="absolute -top-3.5 right-5 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-[0_2px_10px_rgba(0,198,255,0.3)]">
                                        Destaque
                                    </span>
                                )}
                            </div>

                            {/* Project Info */}
                            <div className="p-6 flex-1 flex flex-col">
                                <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-4 w-fit">
                                    {project.categoryLabel}
                                </span>
                                <h3 className="font-heading text-xl mb-3">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-5 flex-1">
                                    {project.shortDescription}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/70 backdrop-blur-lg"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background p-10 rounded-2xl max-w-[900px] w-full max-h-[90vh] overflow-y-auto shadow-[var(--shadow-hover)] relative"
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-accent hover:rotate-90 transition-all duration-400 text-2xl"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Modal Image */}
                            <div className="flex-1 max-w-[400px] rounded-xl overflow-hidden shadow-[var(--shadow)]">
                                <div className="aspect-video bg-gradient-to-br from-primary to-secondary relative">
                                    {selectedProject.image && (
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-[2]">
                                <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1.5 rounded-full mb-2.5">
                                    {selectedProject.categoryLabel}
                                </span>
                                <h3 className="font-heading text-2xl text-primary mb-4">
                                    {selectedProject.title}
                                </h3>
                                <p className="text-muted-foreground text-lg mb-6">
                                    {selectedProject.fullDescription}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-black/5 dark:bg-white/10 px-3.5 py-1.5 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full transition-all hover:bg-accent hover:-translate-y-1"
                                        >
                                            <ExternalLink size={18} />
                                            Visitar Site
                                        </a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-muted-foreground text-white font-semibold rounded-full transition-all hover:bg-foreground hover:-translate-y-1"
                                        >
                                            <Github size={18} />
                                            Ver no GitHub
                                        </a>
                                    )}
                                    {!selectedProject.liveUrl && !selectedProject.githubUrl && (
                                        <p className="text-muted-foreground text-center w-full">
                                            Links não disponíveis para este projeto
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
