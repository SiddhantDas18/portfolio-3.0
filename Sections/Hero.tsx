'use client'
import Image from "next/image"
import SiddhantImge from '@/Assets/Siddhant_beta.jpg'
import { motion } from "motion/react"
import Xlogo from '@/Assets/logo-white.png'
import LinktreeLogo from '@/Assets/linktree-white-icon.png'
import Github from '@/Assets/github-white-icon.png'
import Magnetic from "@/Components/Magnetic"

export default function HeroElement() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20 max-w-5xl mx-auto pt-20" id="hero">
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center md:items-start">
                {/* Profile Image */}
                <Magnetic>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative group"
                        data-hide-cursor="true"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <Image
                            src={SiddhantImge}
                            alt="Siddhant"
                            className="relative rounded-2xl h-[160px] w-[160px] md:h-[200px] md:w-[200px] object-cover shadow-2xl bw-hover"
                            priority
                        />
                    </motion.div>
                </Magnetic>

                {/* Content */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            Siddhant Das
                        </h1>
                        <h2 className="text-xl md:text-2xl text-white/60 font-light">
                            Full Stack Developer
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2 text-white/80 max-w-lg mx-auto md:mx-0 leading-relaxed"
                    >
                        <p>Building digital experiences with a focus on minimalism and performance.</p>
                        <p className="text-sm text-white/50">2024 CS Graduate • Kolkata, India</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-6 justify-center md:justify-start pt-4"
                    >
                        <SocialLink href="https://github.com/siddhantdas18" icon={Github} alt="Github" />
                        <SocialLink href="https://x.com/siddhantspacee" icon={Xlogo} alt="X" />
                        <SocialLink href="https://linktr.ee/siddhant05" icon={LinktreeLogo} alt="Linktree" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function SocialLink({ href, icon, alt }: { href: string, icon: any, alt: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform"
        >
            <Image src={icon} alt={alt} width={24} height={24} className="w-6 h-6" />
        </a>
    )
}
