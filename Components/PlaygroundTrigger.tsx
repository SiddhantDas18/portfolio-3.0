'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Puzzle } from 'lucide-react';
import PlaygroundOverlay from './PlaygroundOverlay';

export default function PlaygroundTrigger() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[50] bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md border border-white/10 shadow-2xl transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="sr-only">Open Playground</span>
                <span className="text-2xl group-hover:rotate-12 transition-transform block">🪁</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && <PlaygroundOverlay onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
