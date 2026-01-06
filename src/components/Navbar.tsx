"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#projetos", label: "Projectos" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#contato", label: "Contacto" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = (e?: React.MouseEvent) => {
        const isDark = resolvedTheme === "dark";

        // @ts-ignore - View Transitions API is not yet in all TS definitions
        if (!e || !document.startViewTransition) {
            setTheme(isDark ? "light" : "dark");
            return;
        }

        const x = e.clientX;
        const y = e.clientY;

        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setTheme(isDark ? "light" : "dark");
            // Force DOM update for View Transition to capture correct state immediately
            if (isDark) {
                document.documentElement.classList.remove("dark");
            } else {
                document.documentElement.classList.add("dark");
            }
        });

        // @ts-ignore
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 1500,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Smooth, "wavy" feel
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled
                ? "glass shadow-[0_2px_15px_rgba(0,0,0,0.05)]"
                : "bg-transparent"
                }`}
        >
            <nav className="py-4">
                <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#inicio"
                        className="font-heading font-extrabold text-[1.8rem] tracking-tight transition-all duration-500 group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className={`transition-colors duration-400 ${scrolled ? "text-foreground group-hover:text-[#ff4d94]" : "text-white group-hover:text-[#ff4d94]"}`}>Azam</span>
                        <span className={`mx-1 ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>·</span>
                        <span className={`transition-colors duration-400 ${scrolled ? "text-[#ff4d94] group-hover:text-foreground" : "text-[#ff4d94] group-hover:text-white"}`}>Usman</span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8 list-none">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className={`relative font-medium py-1 transition-colors group ${scrolled
                                        ? "text-foreground hover:text-primary"
                                        : "text-white hover:text-white/80"
                                        }`}
                                >
                                    {label}
                                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-400 group-hover:w-full ${scrolled ? "bg-primary" : "bg-white"}`} />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-5">
                        <motion.button
                            onClick={toggleTheme}
                            className={`w-11 h-11 rounded-full backdrop-blur flex items-center justify-center shadow-[var(--shadow)] transition-all duration-400 hover:scale-105 ${scrolled
                                ? "bg-black/5 dark:bg-white/10"
                                : "bg-white/20"
                                }`}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Alternar tema"
                        >
                            {resolvedTheme === "dark" ? (
                                <Sun size={22} className="text-yellow-400" />
                            ) : (
                                <Moon size={22} className={scrolled ? "text-foreground" : "text-white"} />
                            )}
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex flex-col justify-around w-10 h-10 p-0 bg-transparent border-none cursor-pointer z-[1002]"
                            aria-label="Abrir menu"
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }}
                                className={`block w-full h-[3px] rounded transition-all ${scrolled ? "bg-foreground" : "bg-white"}`}
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className={`block w-full h-[3px] rounded transition-all ${scrolled ? "bg-foreground" : "bg-white"}`}
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -11 } : { rotate: 0, y: 0 }}
                                className={`block w-full h-[3px] rounded transition-all ${scrolled ? "bg-foreground" : "bg-white"}`}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[1000]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed top-0 right-0 w-[280px] h-full bg-background z-[1001] pt-24 px-5 shadow-[-5px_0_20px_rgba(0,0,0,0.1)]"
                        >
                            <ul className="flex flex-col gap-4 list-none">
                                {navLinks.map(({ href, label }) => (
                                    <li key={href}>
                                        <a
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-lg text-foreground py-3 px-4 rounded-lg bg-black/5 dark:bg-white/5 text-center transition-colors hover:bg-primary/10"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setIsOpen(false);
                                }}
                                className="w-full mt-6 py-3 px-6 bg-primary text-white font-medium rounded-full flex items-center justify-center gap-2"
                            >
                                {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                                Alternar Tema
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
