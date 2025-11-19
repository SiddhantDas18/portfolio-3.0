'use client'
import Image from "next/image"
import { motion } from "motion/react"
import ReactLogo from '@/Assets/reactlogo.png'
import JavascriptLogo from '@/Assets/JavaScript-logo.png'
import Typescriptlogo from '@/Assets/ts-logo-128.png'
import NextJs from "@/Assets/icons8-nextjs-48.png"
import Docker from "@/Assets/docker-mark-blue.png"
import Git from "@/Assets/git.png"
import Express from "@/Assets/exjs.png"
import Prisma from "@/Assets/prisma.png"
import Adonis from "@/Assets/adonis.png"
import Magnetic from "@/Components/Magnetic"

const skills = [
    { name: "JavaScript", icon: JavascriptLogo, color: "bg-yellow-400/10 border-yellow-400/20 text-yellow-200" },
    { name: "TypeScript", icon: Typescriptlogo, color: "bg-blue-400/10 border-blue-400/20 text-blue-200" },
    { name: "React", icon: ReactLogo, color: "bg-cyan-400/10 border-cyan-400/20 text-cyan-200" },
    { name: "Next.js", icon: NextJs, color: "bg-white/10 border-white/20 text-gray-200" },
    { name: "Docker", icon: Docker, color: "bg-blue-600/10 border-blue-600/20 text-blue-200" },
    { name: "Prisma", icon: Prisma, color: "bg-emerald-400/10 border-emerald-400/20 text-emerald-200" },
    { name: "Git", icon: Git, color: "bg-red-400/10 border-red-400/20 text-red-200" },
    { name: "Express", icon: Express, color: "bg-white/10 border-white/20 text-gray-200" },
    { name: "Adonis JS", icon: Adonis, color: "bg-purple-400/10 border-purple-400/20 text-purple-200" },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export default function Skills() {
    return (
        <section className="py-20 px-6 md:px-20 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold mb-2">Tech Stack</h2>
                <p className="text-white/60">Tools and technologies I work with.</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
            >
                {skills.map((skill) => (
                    <Magnetic key={skill.name}>
                        <motion.div
                            variants={item}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm
                                transition-colors duration-300 cursor-default bw-hover
                                ${skill.color}
                            `}
                            data-hide-cursor="true"
                        >
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                className="w-5 h-5 object-contain"
                            />
                            <span className="text-sm font-medium">{skill.name}</span>
                        </motion.div>
                    </Magnetic>
                ))}
            </motion.div>
        </section>
    )
}
