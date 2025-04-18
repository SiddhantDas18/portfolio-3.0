'use client'
import Image from "next/image"
import SiddhantImge from '@/Assets/Siddhant_beta.jpg'
import {motion} from "motion/react"
import Xlogo from '@/Assets/logo-white.png'
import LinktreeLogo from '@/Assets/linktree-white-icon.png'
import ReactLogo from '@/Assets/reactlogo.png'
import JavascriptLogo from '@/Assets/JavaScript-logo.png'
import Typescriptlogo from '@/Assets/ts-logo-128.png'
import NextJs from "@/Assets/icons8-nextjs-48.png"
import Docker from "@/Assets/docker-mark-blue.png"

export default function HeroElement() {
    return <section className="my-10 pt-20 px-10 md:px-40" id="hero">
        <div className="">


            <div className="flex justify-between">
                <motion.div whileHover={{scale:1.2}}>
                    <Image 
                        src={SiddhantImge} 
                        alt="Siddhant" 
                        className="rounded-2xl h-[120px] w-[120px] md:h-[160px] md:w-[160px] lg:h-[160px] lg:w-[160px]" 
                    />
                </motion.div>

                <div>

                    <div className="flex gap-2 items-start justify-end">

                        <motion.div whileHover={{scale:1.5}}>
                        <a href="https://x.com/99em99" target="blank"><Image src={Xlogo} alt="X logo" width={25} height={25} className="w-[25px] h-[25px]" /></a>
                        </motion.div>
                        
                        <motion.div whileHover={{scale:1.5}}>
                        <a href="https://linktr.ee/siddhant05" target="blank"><Image src={LinktreeLogo} alt="Linktree logo" width={25} height={25} className="w-[25px] h-[25px]" /></a>
                        </motion.div>
                    </div>

                    <div className=" pt-5 opacity-60">
                        <h2>23 | M Kolkata India</h2>
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
                <h2 className=" text-xl font-bold ">About</h2>
                <div className="pt-5 flex gap-4.5 justify-items-center">
                    <Image src={ReactLogo} alt="ReactLogo" className="h-10 w-10"/>
                    <Image src={JavascriptLogo} alt="JavascriptLogo" className="h-10 w-10"/>
                    <Image src={Typescriptlogo} alt="Typescriptlogo" className="h-10 w-10"/>
                    <Image src={NextJs} alt="NextJs" className="h-10 w-10"/>
                    <Image src={Docker} alt="NextJs" className="h-10 w-10"/>
                    
                </div>

                </div>
            </div>

            <div>

            </div>

        </div>
    </section>
}