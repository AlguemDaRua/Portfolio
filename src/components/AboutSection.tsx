"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Download, User } from "lucide-react";
import Image from "next/image";

// Profile data from original portfolio
const profile = {
    name: "Azam Usman",
    bio: `Saudações! Sou <strong>Azam Usman</strong>, Estudante de Engenharia Informática e Telecomunicações na <strong>ISUTC</strong>. Com uma paixão por tecnologia e inovação, estou constantemente a explorar novas fronteiras no desenvolvimento de software. Tenho experiência em <strong>desenvolvimento web</strong>, <strong>desenvolvimento mobile</strong> e <strong>programação em várias linguagens</strong>. Estou entusiasmado por contribuir para projetos que façam a diferença e por colaborar com profissionais que partilham a minha visão.`,
    profileImage: "/images/profile/meuperfil.jpg",
    competencies: [
        "Desenvolvimento Web Basico(HTML5, CSS3, JavaScript)",
        "Desenvolvimento Web Avancado(Angular, Tailwind, NodeJS)",
        "Desenvolvimento Mobile com Flutter",
        "Java para aplicações empresariais",
        "Python para análise de dados e automação",
        "Golang para sistemas de alto desempenho",
    ],
    cvs: [
        { label: "Download CV (PT)", file: "/docs/cv-pt.pdf" },
        { label: "Download CV (EN)", file: "/docs/cv-en.pdf" },
    ],
};

// Profile Image component with placeholder fallback
function ProfileImage() {
    const [imageError, setImageError] = useState(false);

    if (imageError) {
        // Placeholder with initials when image fails to load
        return (
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow)] group">
                <div className="w-full aspect-square bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform duration-400 group-hover:scale-[1.03]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <User size={64} className="text-white" />
                        </div>
                        <span className="text-white/90 text-2xl font-heading font-bold tracking-wider">
                            AU
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl overflow-hidden shadow-[var(--shadow)] group">
            <Image
                src={profile.profileImage}
                alt="Foto de perfil"
                width={400}
                height={400}
                className="w-full h-auto transition-transform duration-400 group-hover:scale-[1.03]"
                priority
                onError={() => setImageError(true)}
            />
        </div>
    );
}

export function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="sobre" className="py-24 bg-background">
            <div className="max-w-[1200px] mx-auto px-5" ref={ref}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-[2.5rem] text-center mb-12 section-title"
                >
                    Sobre Mim
                </motion.h2>

                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <ProfileImage />

                        {/* CV Buttons */}
                        <div className="flex gap-4 justify-center mt-6 flex-wrap">
                            {profile.cvs.map((cv) => (
                                <a
                                    key={cv.label}
                                    href={cv.file}
                                    download
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-full shadow-[var(--shadow)] transition-all duration-400 hover:bg-accent hover:-translate-y-1"
                                >
                                    <Download size={16} />
                                    {cv.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bio Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div
                            className="text-muted-foreground leading-relaxed mb-8"
                            dangerouslySetInnerHTML={{ __html: profile.bio }}
                        />

                        <div>
                            <h3 className="font-heading text-xl text-primary mb-5">
                                Competências Técnicas
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-4 list-none">
                                {profile.competencies.map((competency, index) => (
                                    <motion.li
                                        key={competency}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                                        <span className="text-foreground">{competency}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
