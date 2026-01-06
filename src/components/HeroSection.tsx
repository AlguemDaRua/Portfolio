"use client";

import { motion } from "framer-motion";

// Profile data from original portfolio
const profile = {
    name: "Azam Usman",
    heroTitle: "Vamos Construir Algo Incrível Juntos",
    tagline: "Desenvolvedor Full Stack | Desenvolvedor Mobile | Entusiasta de Tecnologia",
};

export function HeroSection() {
    return (
        <section
            id="inicio"
            className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-hero"
        >
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-15"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center max-w-[800px] px-5">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-white text-[clamp(2.5rem,5vw,4rem)] mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                        {profile.heroTitle}
                    </h1>

                    <p className="text-white/90 text-[clamp(1.1rem,2vw,1.4rem)] mb-10 max-w-[600px] mx-auto">
                        {profile.tagline}
                    </p>

                    <motion.a
                        href="#projetos"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold text-lg rounded-full shadow-[var(--shadow)] transition-all duration-400 hover:bg-accent hover:text-white hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Explorar Projectos
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll Indicator - Original Mouse Design */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="w-[30px] h-[50px] border-2 border-white/70 rounded-[15px] relative">
                    <motion.div
                        className="w-1.5 h-1.5 bg-white/70 rounded-full absolute top-2.5 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 15, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
