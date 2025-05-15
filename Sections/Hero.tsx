'use client'
import Image from "next/image"
import SiddhantImge from '@/Assets/Siddhant_beta.jpg'
import { motion } from "motion/react"
import Xlogo from '@/Assets/logo-white.png'
import LinktreeLogo from '@/Assets/linktree-white-icon.png'
import ReactLogo from '@/Assets/reactlogo.png'
import JavascriptLogo from '@/Assets/JavaScript-logo.png'
import Typescriptlogo from '@/Assets/ts-logo-128.png'
import NextJs from "@/Assets/icons8-nextjs-48.png"
import Docker from "@/Assets/docker-mark-blue.png"
import Git from "@/Assets/git.png"
import Express from "@/Assets/exjs.png"
import Prisma from "@/Assets/prisma.png"
import Github from '@/Assets/github-white-icon.png'

export default function HeroElement() {
    return <section className="my-10 pt-20 px-10 md:px-40" id="hero">
        <div className="">
            <div className="flex justify-between">
                <motion.div whileHover={{ scale: 1.2 }}>
                    <Image
                        src={SiddhantImge}
                        alt="Siddhant"
                        className="rounded-2xl h-[120px] w-[120px] md:h-[160px] md:w-[160px] lg:h-[160px] lg:w-[160px]"
                    />
                </motion.div>

                <div>
                    <div className="flex gap-3 items-start justify-end">
                        <motion.div whileHover={{ scale: 1.5 }}>
                            <a href="https://x.com/siddhantspacee" target="blank">
                                <Image src={Xlogo} alt="X logo" width={25} height={25} className="w-[25px] h-[25px]" />
                            </a>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.5 }}>
                            <a href="https://linktr.ee/siddhant05" target="blank">
                                <Image src={LinktreeLogo} alt="Linktree logo" width={25} height={25} className="w-[25px] h-[25px]" />
                            </a>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.5 }}>
                            <a href="https://github.com/siddhantdas18" target="blank">
                                <Image src={Github} alt="Github logo" width={25} height={25} className="w-[25px] h-[25px]" />
                            </a>
                        </motion.div>
                    </div>

                    <div className="pt-5 opacity-60">
                        <div className="md:hidden"><h2>23 | M Kolkata<br />India</h2></div>
                        <div className="hidden md:block"><h2>23 | M Kolkata India</h2></div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <h1 className="text-3xl">I'm Siddhant Das</h1>

                <div className="pt-4 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">About</h2>
                    <h2 className="opacity-70">I am a Backend and a Frontend Developer. Trying to make a space of mine</h2>
                    <h2 className="opacity-70">2024 CS graduate</h2>
                </div>

                <div className="pt-4">
                    <h2 className="text-xl font-bold">Skills</h2>
                    <div className="pt-5">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 gap-y-8">
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-yellow-100 text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-yellow-300/60 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={JavascriptLogo} alt="JavascriptLogo" className="h-7 w-7 rounded-md" />
                                    JavaScript
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-blue-300 text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-blue-300/60 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={Typescriptlogo} alt="Typescriptlogo" className="h-7 w-7 rounded-md" />
                                    TypeScript
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileDrag={{}}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-[#03dbfd] text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-blue-300/60 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={ReactLogo} alt="ReactLogo" className="h-7 w-7 rounded-md" />
                                    React
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-white text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-white/60 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={NextJs} alt="NextJs" className="h-7 w-7 rounded-md" />
                                    Next.js
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-blue-600 text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-blue-600/60 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={Docker} alt="Docker" className="h-7 w-7 rounded-md" />
                                    Docker
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-[#17a394] text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-green-300/30 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={Prisma} alt="Prisma" className="h-7 w-7 rounded-md" />
                                    Prisma
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-red-300 text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-red-300/60 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={Git} alt="Git" className="h-7 w-7 rounded-md" />
                                    Git
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="relative h-12 w-full"
                            >
                                <div className="absolute top-2 left-1.5 h-12 w-full bg-white text-black shadow-md rounded-md"></div>
                                <div className="absolute top-0 left-0 h-12 w-full bg-[#1e1f2c] text-center text-white border-white/70 border-t border-l shadow-xl rounded-md flex items-center justify-center font-bold gap-1">
                                    <Image src={Express} alt="Express" className="h-7 w-7 rounded-md" />
                                    Express
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
