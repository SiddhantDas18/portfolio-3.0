'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const TypingEffect: React.FC = () => {
    const phrases = [
        'a Developer.',
        'a Designer.',
        'a Coder.',
        'a Problem Solver.',
        'an Introvert.',
    ];

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        const fullText = `I'm ${currentPhrase}`;

        const handleTyping = () => {
            setText((prev) =>
                isDeleting
                    ? fullText.substring(0, prev.length - 1)
                    : fullText.substring(0, prev.length + 1)
            );

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            }

            setTypingSpeed(isDeleting ? 50 : 120);
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, phraseIndex, typingSpeed]);

    const { scrollY } = useScroll();

    const width = useTransform(scrollY,
        [0, 300],
        ['100vw', 'calc(100vw - 2rem)']
    );

    const borderRadius = useTransform(scrollY,
        [0, 300],
        ['0rem', '1.5rem']
    );

    return (
        <motion.div
            style={{
                width,
                borderRadius,
                margin: '0 auto',
            }}
            className="h-[50vh] flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-1000 overflow-hidden relative my-20"
        >
            <div className="z-10 text-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                    {text}
                    <span className="ml-1 border-r-2 border-white animate-pulse" />
                </h1>
            </div>
        </motion.div>
    );
};

export default TypingEffect;
