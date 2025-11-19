'use client'
import { useState } from "react"
import ArrowRight from "@/Assets/ArrowRight"
import MenuItem from "@/Assets/MenuItem"
import { motion, AnimatePresence } from 'motion/react'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed top-0 w-full z-[999] px-6 md:px-12 py-6">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-5xl mx-auto bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center"
            >
                <a href="#hero" className="text-xl font-bold tracking-tight">Siddhant</a>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
                    <a href="#hero" className="hover:text-white transition-colors">Home</a>
                    <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                    <a href="#experience" className="hover:text-white transition-colors">Experience</a>
                    <a
                        href="mailto:siddhant.physics@gmail.com"
                        className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors"
                    >
                        Contact
                    </a>
                </nav>

                <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
                    <MenuItem className="h-6 w-6" />
                </button>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-20 left-6 right-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4 text-center">
                            <a href="#hero" onClick={() => setOpen(false)} className="text-lg text-white/80">Home</a>
                            <a href="#projects" onClick={() => setOpen(false)} className="text-lg text-white/80">Projects</a>
                            <a href="#experience" onClick={() => setOpen(false)} className="text-lg text-white/80">Experience</a>
                            <a href="mailto:siddhant.physics@gmail.com" onClick={() => setOpen(false)} className="text-lg text-white font-medium">Contact</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
