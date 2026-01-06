"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";

const socialLinks = [
    { id: "github", icon: "/icons/github.svg", url: "https://github.com/AlguemDaRua", label: "GitHub" },
    { id: "linkedin", icon: "/icons/linkedin.svg", url: "https://www.linkedin.com/in/azam-usman-57b227299", label: "LinkedIn" },
    { id: "twitter", icon: "/icons/x.svg", url: "https://x.com/AlguemDaRua", label: "X" },
];

export function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
    const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("loading");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFormState("success");
        setFormData({ nome: "", email: "", mensagem: "" });
        setTimeout(() => setFormState("idle"), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section id="contato" className="py-24 gradient-hero relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="max-w-[1200px] mx-auto px-5 relative z-10" ref={ref}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-[2.5rem] text-center mb-4 text-white relative section-title after:bg-white"
                >
                    Contacto
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center text-white/90 mb-12 max-w-xl mx-auto"
                >
                    Para propostas de colaboração ou esclarecimentos adicionais, envie a sua mensagem.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto"
                >
                    <div className="mb-6">
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome completo"
                            required
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full py-4 px-5 bg-white/10 backdrop-blur text-white rounded-xl border-none outline-none transition-all duration-400 placeholder:text-white/70 focus:bg-white/15 focus:ring-[3px] focus:ring-white/20"
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Endereço electrónico"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full py-4 px-5 bg-white/10 backdrop-blur text-white rounded-xl border-none outline-none transition-all duration-400 placeholder:text-white/70 focus:bg-white/15 focus:ring-[3px] focus:ring-white/20"
                        />
                    </div>

                    <div className="mb-6">
                        <textarea
                            name="mensagem"
                            placeholder="Mensagem"
                            rows={5}
                            required
                            value={formData.mensagem}
                            onChange={handleChange}
                            className="w-full py-4 px-5 bg-white/10 backdrop-blur text-white rounded-xl border-none outline-none transition-all duration-400 placeholder:text-white/70 focus:bg-white/15 focus:ring-[3px] focus:ring-white/20 resize-none"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={formState !== "idle"}
                        whileHover={{ scale: formState === "idle" ? 1.02 : 1 }}
                        whileTap={{ scale: formState === "idle" ? 0.98 : 1 }}
                        className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-400 shadow-[var(--shadow)] ${formState === "success"
                            ? "bg-green-500 text-white"
                            : "bg-white text-primary hover:bg-accent hover:text-white hover:-translate-y-1"
                            } disabled:opacity-80`}
                    >
                        {formState === "loading" ? (
                            <><Loader2 size={20} className="animate-spin" /> A enviar...</>
                        ) : formState === "success" ? (
                            <><CheckCircle size={20} /> Mensagem enviada!</>
                        ) : (
                            <><Send size={20} /> Enviar Mensagem</>
                        )}
                    </motion.button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center gap-6 mt-10"
                >
                    {socialLinks.map((social) => (
                        <motion.a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all duration-400 hover:bg-accent hover:-translate-y-1"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={social.label}
                        >
                            <Image src={social.icon} alt={social.label} width={24} height={24} className="brightness-0 invert" />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
