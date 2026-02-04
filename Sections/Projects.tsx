'use client'
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

const projects = [
    {
        title: "Collaborative Code Editor",
        description: "Real-time collaborative code editor with room management and live synchronization.",
        link: "https://github.com/SiddhantDas18/Colaborative-compiler",
        tags: ["React", "Socket.io", "Node.js"]
    },
    {
        title: "Solana WEB3 Wallet",
        description: "Web-based Solana wallet for creating accounts, managing keys, and viewing balances.",
        link: "https://solana-wallet-blond.vercel.app/",
        tags: ["Solana", "Web3.js", "Next.js"],
        live: true
    },
    {
        title: "Typing UI",
        description: "A rich, interactive typing interface component designed for speed and aesthetics.",
        link: "https://github.com/SiddhantDas18/BasicUI-Rewritting",
        tags: ["React", "UI/UX"]
    },
    {
        title: "Todo Application",
        description: "Full-stack task management app with Prisma ORM and complete CRUD operations.",
        link: "https://github.com/SiddhantDas18/Todo-Geogo",
        tags: ["Next.js", "Prisma", "PostgreSQL"]
    },
    {
        title: "Spotify Integration",
        description: "Real-time Spotify dashboard showing currently playing track and top songs.",
        link: "https://github.com/SiddhantDas18/portfolio-3.0/tree/main/app/api/spotify",
        tags: ["Spotify API", "Next.js"],
        live: true
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export default function Projects() {
    return (
        <section className="py-20 px-6 md:px-20 max-w-5xl mx-auto" id="projects">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold mb-2">Projects</h2>
                <p className="text-muted-foreground">Selected works and experiments.</p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {projects.map((project, index) => (
                    <motion.a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariants}
                        className="group p-6 rounded-2xl bg-card border border-card-border hover:bg-muted/50 hover:border-muted-foreground/20 transition-all duration-300 h-full flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground transition-colors">{project.title}</h3>
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>

                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 group-hover:text-foreground/80 transition-colors flex-grow">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground border border-card-border">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        </section>
    )
}