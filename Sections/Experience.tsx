'use client'
import Image from 'next/image';
import { motion } from 'motion/react';

export default function Experience() {
    return (
        <section className="py-20 px-6 md:px-20 max-w-5xl mx-auto" id="experience">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold mb-2">Experience</h2>
                <p className="text-white/60">My professional journey.</p>
            </motion.div>

            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative pl-8 border-l border-white/10 hover:border-white/30 transition-colors duration-300"
                >
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-300"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-xl font-semibold">Full Stack Developer</h3>
                        <span className="text-sm text-white/40 font-mono">Jan 2026 - Present</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-white/70">
                        <div className="w-6 h-6 relative rounded overflow-hidden">
                            <Image
                                src="/geogo.png"
                                alt="Geogo Techsolutions"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span>Geogo Techsolutions</span>
                    </div>

                    <p className="text-white/60 leading-relaxed max-w-2xl">
                        Full Stack Role with a focus on Frontend Development.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group relative pl-8 border-l border-white/10 hover:border-white/30 transition-colors duration-300"
                >
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-300"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-xl font-semibold">Full Stack Developer Intern</h3>
                        <span className="text-sm text-white/40 font-mono">May 2025 - Present</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-white/70">
                        <div className="w-6 h-6 relative rounded overflow-hidden">
                            <Image
                                src="/geogo.png"
                                alt="Geogo Techsolutions"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span>Geogo Techsolutions</span>
                    </div>

                    <p className="text-white/60 leading-relaxed max-w-2xl">
                        Working as a full stack intern, contributing to various projects and gaining hands-on experience in full-stack development.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}