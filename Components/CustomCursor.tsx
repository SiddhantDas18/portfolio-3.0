'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only show custom cursor on devices with fine pointer (mouse)
        const mediaQuery = window.matchMedia('(pointer: fine)');
        setIsVisible(mediaQuery.matches);

        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsVisible(e.matches);
        };

        mediaQuery.addEventListener('change', handleMediaChange);

        if (!mediaQuery.matches) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if we should hide the cursor
            if (target.closest('[data-hide-cursor="true"]')) {
                setIsHovered(false); // Reset hover state
                setIsVisible(false); // Hide cursor
                return;
            } else {
                // Re-check media query before showing
                if (window.matchMedia('(pointer: fine)').matches) {
                    setIsVisible(true);
                }
            }

            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'H3' ||
                target.tagName === 'P' ||
                target.tagName === 'SPAN'
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            setIsHovered(false);
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (!e.relatedTarget) {
                setIsVisible(false);
                setIsHovered(false);
            }
        };

        const handleMouseEnter = () => {
            if (window.matchMedia('(pointer: fine)').matches) {
                setIsVisible(true);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: isVisible ? 1 : 0
            }}
            transition={{
                scale: { type: "spring", stiffness: 300, damping: 20 },
                opacity: { duration: 0.2 }
            }}
        />
    );
}
