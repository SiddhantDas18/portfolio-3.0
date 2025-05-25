import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Experience() {
    return (
        <section className="py-10 px-10 md:px-40" id="experience">
            <div>
                <p className="bg-grad">Experience</p>
                <div className="pt-5">
                    <div className="flex flex-col md:flex-row items-start gap-4 bg-slate-800/30 p-6 rounded-lg hover:bg-slate-800/40 transition-all">
                        <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0">
                            <Image
                                src="/geogo.png"
                                alt="Geogo Techsolutions"
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Full Stack Developer Intern</h3>
                            <p className="text-gray-400">Geogo Techsolutions</p>
                            <p className="text-sm text-gray-500">May 2025 - Present</p>
                            <p className="mt-2 text-gray-300">Working as a full stack intern at Geogo Techsolutions, contributing to various projects and gaining hands-on experience in full-stack development.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}