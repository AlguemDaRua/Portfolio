"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center overflow-hidden relative">
            {/* Abstract Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-ring" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse-ring" style={{ animationDelay: "1s" }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="glass p-8 md:p-12 rounded-3xl border border-white/20 dark:border-white/5 shadow-[var(--shadow-hover)] max-w-lg w-full relative overflow-hidden"
            >
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary opactiy-20 blur-xl" />

                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-heading font-black text-[6rem] md:text-[8rem] leading-none gradient-text mb-2 select-none"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold mb-4 text-foreground"
                >
                    Página não encontrada
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-muted-foreground mb-8 text-base md:text-lg"
                >
                    Oops! Parece que você navegou para um território desconhecido.
                    Esta página não faz parte do universo de <span className="font-bold text-foreground">Azam Usman</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Link
                        href="/"
                        className="btn-primary inline-flex items-center gap-2 group"
                    >
                        <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                        Voltar ao Início
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 text-sm text-muted-foreground"
            >
                <div className="flex items-center gap-2 opacity-50">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    Azam Usman
                    <span className="w-1 h-1 rounded-full bg-primary" />
                </div>
            </motion.div>
        </div>
    );
}
