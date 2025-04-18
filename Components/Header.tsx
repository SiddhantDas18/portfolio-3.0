'use client'
import { useState } from "react"
import ArrowRight from "@/Assets/ArrowRight"
import MenuItem from "@/Assets/MenuItem"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    function opener() {
        setOpen(!open)
    }

    function closeMenu() {
        setOpen(false)
    }

    return (
        <header className="sticky top-0 backdrop-blur-sm z-[999] text-white">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Boldonse&display=swap');
            `}</style>

            <div className="bg-black text-white flex justify-center items-center py-0.5 gap-2">
                <a href="https://drive.google.com/file/d/17zpOqSsjTtILqCfhuJyjjGuaqaxCRPPk/view?usp=sharing" target="blank"><p>Hire Me</p></a>
                
                <ArrowRight className="h-6 w-6 rounded-4xl" />
            </div>

            <div className="py-5 px-6 rounded-md">
                <div className="flex justify-between items-center">
                    <p className="text-2xl md:text-3xl font-['Boldonse']">Siddhant</p>

                    <button className="md:hidden" onClick={opener}>
                        <MenuItem className="h-7 w-7" />
                    </button>

                    <nav className="hidden md:flex md:justify-center md:items-center md:gap-3">
                        <a href="#hero">Home</a>
                        <a href="#projects">Projects</a>
                        <a href="mailto:siddhant.physics@gmail.com">
                            <button className="btn text-black">Contact</button>
                        </a>
                    </nav>
                </div>

                {/* Mobile nav */}
                <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-2 text-white/80 text-xl w-full justify-center align-center text-center py-2">
                        <a href="#hero" onClick={closeMenu}>Home</a>
                        <a href="#projects" onClick={closeMenu}>Projects</a>
                        <a href="mailto:siddhant.physics@gmail.com" onClick={closeMenu}>
                            <button className="btn w-fit mx-auto">Contact</button>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}
