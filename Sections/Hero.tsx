
import Image from "next/image"
import SiddhantImge from '@/Assets/Siddhant_beta.jpg'
import Xlogo from '@/Assets/logo-white.png'
import LinktreeLogo from '@/Assets/linktree-white-icon.png'
import Link from "next/link"

export default function HeroElement() {
    return <section className="my-10 pt-20 px-10">
        <div className="">


            <div className="flex justify-between">
                <div>
                    <Image src={SiddhantImge} alt="Siddhant" height={120} width={120} className="rounded-2xl" />
                </div>

                <div>

                    <div className="flex gap-2 items-start justify-end">
                        <Image src={Xlogo} alt="X logo" width={25} height={25} className="w-[25px] h-[25px]" />
                        <Image src={LinktreeLogo} alt="Linktree logo" width={25} height={25} className="w-[25px] h-[25px]" />
                    </div>

                    <div className=" pt-5 opacity-60">
                        <h2>23|M Kolkata India</h2>
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
            </div>

            <div>

            </div>

        </div>
    </section>
}