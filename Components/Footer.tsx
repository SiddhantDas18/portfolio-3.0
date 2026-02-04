'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function FooterSection() {
    const [copied, setCopied] = useState(false);
    const email = "siddhant.physics@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="relative py-20 px-6 mt-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col gap-10 mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter"
                    >
                        Let&apos;s work<br />together.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                    >
                        <button
                            onClick={handleCopy}
                            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                        >
                            <span className="text-white/80 group-hover:text-white">{email}</span>
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />}
                        </button>

                        <a
                            href="mailto:siddhant.physics@gmail.com"
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white"
                        >
                            Send Email <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 border-t border-white/10 pt-10">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Siddhant Das</h3>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            Crafting digital experiences with code and creativity. Focused on performance and aesthetics.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider">Socials</h4>

                        {/* Mobile: Horizontal Icon Row */}
                        <div className="flex md:hidden gap-6">
                            <SocialIcon href="https://github.com/siddhantdas18" icon={<FaGithub />} label="GitHub" />
                            <SocialIcon href="https://x.com/siddhantspacee" icon={<FaTwitter />} label="Twitter" />
                            <SocialIcon href="https://www.linkedin.com/in/siddhantspacee/" icon={<FaLinkedin />} label="LinkedIn" />
                            <SocialIcon href="https://www.instagram.com/9_em_9/" icon={<FaInstagram />} label="Instagram" />
                        </div>

                        {/* Desktop: Vertical List */}
                        <div className="hidden md:flex flex-col gap-3">
                            <SocialLink href="https://github.com/siddhantdas18" label="GitHub" />
                            <SocialLink href="https://x.com/siddhantspacee" label="Twitter / X" />
                            <SocialLink href="https://www.linkedin.com/in/siddhantspacee/" label="LinkedIn" />
                            <SocialLink href="https://www.instagram.com/9_em_9/" label="Instagram" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider">Navigation</h4>
                        <div className="grid grid-cols-2 md:flex md:flex-col gap-3">
                            <PageLink href="#hero" label="Home" />
                            <PageLink href="#projects" label="Projects" />
                            <PageLink href="#experience" label="Experience" />
                            <PageLink href="#about" label="About" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-20 pt-8 border-t border-white/5 text-xs text-white/30">
                    <p>© {new Date().getFullYear()} Siddhant Das. All rights reserved.</p>
                    <p>Designed & Built with Next.js 15 & Motion</p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, label }: { href: string, label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group hover:text-white text-white/60 transition-colors w-full sm:w-32"
        >
            {label}
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </a>
    )
}

function SocialIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-white/60 hover:text-white transition-colors text-xl"
        >
            {icon}
        </a>
    )
}

function PageLink({ href, label }: { href: string, label: string }) {
    return (
        <a
            href={href}
            className="text-white/60 hover:text-white transition-colors"
        >
            {label}
        </a>
    )
}
