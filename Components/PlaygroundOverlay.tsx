'use client';

import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const words = [
    { text: "Calm", color: "bg-blue-400/20 text-blue-200" },
    { text: "Code", color: "bg-purple-400/20 text-purple-200" },
    { text: "Human", color: "bg-rose-400/20 text-rose-200" },
    { text: "Systems", color: "bg-emerald-400/20 text-emerald-200" },
    { text: "Design", color: "bg-amber-400/20 text-amber-200" },
    { text: "Minimal", color: "bg-stone-400/20 text-stone-200" },
    { text: "Play", color: "bg-pink-400/20 text-pink-200" },
    { text: "Thoughtful", color: "bg-cyan-400/20 text-cyan-200" },
];

export default function PlaygroundOverlay({ onClose }: { onClose: () => void }) {
    const containerRef = useRef(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 text-white"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="absolute top-20 md:top-32 left-0 right-0 text-center px-4 z-10 pointer-events-none">
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold mb-4"
                >
                    Hi, I&apos;m Siddhant.
                </motion.h2>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/60 max-w-lg mx-auto leading-relaxed"
                >
                    I&apos;m a developer who prefers calm conversations, simple systems, and thoughtful design. I enjoy building things that feel stable, quiet, and human.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-sm text-white/30 uppercase tracking-widest"
                >
                    Throw the words around
                </motion.p>
            </div>

            <div ref={containerRef} className="absolute inset-0 w-full h-full">
                {words.map((word, i) => (
                    <DraggableWord
                        key={word.text}
                        word={word}
                        containerRef={containerRef}
                        index={i}
                        windowSize={windowSize}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function DraggableWord({ word, containerRef, index, windowSize }: { word: any, containerRef: any, index: number, windowSize: any }) {
    // Random initial positions spread across the screen
    const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 100 : 300);
    const randomY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight - 100 : 500);

    return (
        <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.1, cursor: "grab" }}
            whileDrag={{ scale: 1.2, cursor: "grabbing" }}
            initial={{ y: -100, x: randomX, opacity: 0 }}
            animate={{
                y: randomY, // Fall to a random position
                x: randomX,
                opacity: 1,
                transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 50,
                    delay: index * 0.1 + 0.5
                }
            }}
            className={`absolute px-6 py-3 rounded-full text-sm md:text-base font-medium backdrop-blur-md border border-white/10 shadow-xl ${word.color}`}
        >
            {word.text}
        </motion.div>
    );
}
