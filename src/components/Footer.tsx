"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 500);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <footer className="bg-background py-10 text-center text-muted-foreground text-sm">
                <div className="max-w-[1200px] mx-auto px-5">
                    <p className="mb-2">© {currentYear} Azam Usman. Todos os direitos reservados.</p>
                    <p>Desenvolvido com paixão e excelência técnica.</p>
                </div>
            </footer>

            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={showBackToTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer z-[100] shadow-[var(--shadow)] transition-all duration-400 hover:bg-accent hover:-translate-y-1 animate-pulse-ring"
                aria-label="Voltar ao topo"
            >
                <ArrowUp size={24} />
            </motion.button>
        </>
    );
}
