'use client'
import { useState } from "react"
import ArrowRight from "@/Assets/ArrowRight"
import MenuItem from "@/Assets/MenuItem"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    function opener() {
        setOpen(!open)
        console.log(open)
    }

    return <header className="">
        <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Boldonse&display=swap');
        `}</style>
        <div className="bg-black text-white flex justify-center items-center py-0.5 gap-2">
            <p>Hire Me</p>
            <ArrowRight className="h-6 w-6 " />
        </div>
        <div className="py-2 px-4 rounded-md">
            <div className="flex justify-between">
                <p className="text-2xl md:text-3xl font-['Boldonse']">Siddhant</p>

                <button className="md:hidden" onClick={opener}>
                    <MenuItem className="h-7 w-7" />
                </button>

                <nav className="hidden md:flex md:justify-center md:items-center md:gap-3">
                    <a href="">Home</a>
                    <a href="">Projects</a>
                    <button className="btn">Contact</button>
                </nav>
            </div>

            <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-2 text-black/80 text-xl w-full justify-center align-center text-center py-2">
                    <a href="">Home</a>
                    <a href="">Projects</a>
                    <button className="btn">Contact</button>
                </div>
            </div>
        </div>
    </header>
}