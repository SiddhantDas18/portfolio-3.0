'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  // Scroll-based animation for shrinking width
  const { scrollY } = useScroll();

  // Mobile Shrink: Shrinks width by 10px on both left and right sides on scroll
  const mobileWidth = useTransform(scrollY, [0, 600], ['calc(100% - 20px)', 'calc(100% - 20px)']);

  // Desktop/Tablet Shrink: Less shrink (95%)
  const responsiveWidth = useTransform(scrollY, [0, 600], ['100%', '95%']);

  const borderRadius = useTransform(scrollY, [0, 600], ['0rem', '1.5rem']);

  // Detect screen width
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Mobile detection for smaller screens
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      style={{
        width: isMobile ? mobileWidth : responsiveWidth, // Shrink on scroll based on screen type
        borderRadius,
      }}
      className="h-screen mx-auto flex items-center justify-center bg-gradient-to-tr from-red-500 via-purple-500 to-yellow-400 transition-all duration-1000 overflow-hidden relative"
    >
      {/* Readability Overlay */}
      <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm z-0" />

      {/* Typing Text */}
      <div className="z-10 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          {text}
          <span className="ml-1 border-r-2 border-black dark:border-white animate-pulse" />
        </h1>
      </div>

      {/* Background Animation */}
      <style jsx>{`
        @keyframes gradientFade {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-fade {
          background-size: 300% 300%;
          animation: gradientFade 15s ease infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default TypingEffect;
