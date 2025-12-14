import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Answer } from '../types';

interface RevelationSceneProps {
  answer: Answer;
  onRestart: () => void;
}

const RevelationScene: React.FC<RevelationSceneProps> = ({ answer, onRestart }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4 overflow-y-auto">
      
      {/* Realistic Book Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateX: 60 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full max-w-4xl aspect-[1.5/1] md:aspect-[1.6/1] perspective-1000 mt-8"
      >
        {/* Book Outer Cover Shadow */}
        <div className="absolute top-[2%] left-[2%] w-[96%] h-[96%] bg-[#1a110a] rounded-lg shadow-2xl transform translate-y-4 blur-sm"></div>

        {/* The Open Book */}
        <div className="absolute inset-0 flex">
            {/* Left Page */}
            <div className="relative w-1/2 h-full bg-[#fdfbf7] rounded-l-lg page-gradient-left border-l-4 border-[#3e2b10] overflow-hidden transform origin-right">
                 {/* Page Texture & Decoration */}
                 <div className="absolute inset-4 border-2 border-[#bf953f] opacity-20 rounded-l-md border-r-0"></div>
                 <div className="absolute top-8 left-8 bottom-8 right-0 border border-[#bf953f] opacity-10 border-r-0"></div>
                 
                 {/* Decorative Corner */}
                 <svg className="absolute top-4 left-4 w-16 h-16 opacity-30 text-[#bf953f]" viewBox="0 0 100 100">
                    <path fill="currentColor" d="M0 0 L100 0 L0 100 Z" />
                 </svg>

                 {/* Left Page Content (Static/Decoration) */}
                 <div className="absolute inset-12 opacity-30 font-serif text-[8px] leading-relaxed text-[#5c4018] overflow-hidden select-none pointer-events-none text-justify">
                    <p>
                        In the beginning, there was only the vast, silent void. The stars were yet to be born, and time itself held its breath. It was from this silence that the first whisper emerged, a sound so faint it could only be heard by the heart. This whisper wove itself into the fabric of existence, creating the threads of destiny that bind us all.
                        <br/><br/>
                        The ancient astronomers knew that the alignment of celestial bodies was not merely a matter of chance, but a language written in light. They spent lifetimes decoding these messages, understanding that every flicker of a star was a syllable in the grand poem of the universe.
                        <br/><br/>
                        To seek an answer is to partake in this ancient dialogue. It is to acknowledge that we are not separate from the cosmos, but a vital part of its unfolding story. When you ask, the universe does not merely reply; it resonates.
                    </p>
                 </div>
            </div>

            {/* Right Page (Active Answer) */}
            <div className="relative w-1/2 h-full bg-[#fdfbf7] rounded-r-lg page-gradient-right border-r-4 border-[#3e2b10] overflow-hidden transform origin-left">
                 {/* Page Texture & Decoration */}
                 <div className="absolute inset-4 border-2 border-[#bf953f] opacity-20 rounded-r-md border-l-0"></div>
                 
                 {/* Decorative Corner */}
                 <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-30 text-[#bf953f] rotate-180" viewBox="0 0 100 100">
                    <path fill="currentColor" d="M0 0 L100 0 L0 100 Z" />
                 </svg>

                 {/* Content Container */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 text-center">
                    {showContent && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className="text-[#8c6b38] font-serif text-sm md:text-base italic mb-6">The Universe Responds:</h3>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ delay: 0.5, duration: 1.5 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-[#bf953f] blur-[40px] opacity-20 rounded-full animate-pulse"></div>
                                <h1 className="relative text-2xl md:text-4xl text-[#5c4018] font-bold font-serif leading-tight drop-shadow-md">
                                    {answer}
                                </h1>
                                <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent mx-auto"></div>
                            </motion.div>
                        </>
                    )}
                 </div>
            </div>

            {/* Central Binding Shadow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(0,0,0,0.2)] via-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.2)] pointer-events-none z-20"></div>
        </div>
      </motion.div>

      {/* Action Button */}
      {showContent && (
        <motion.button 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            onClick={onRestart}
            className="mt-12 group relative px-8 py-3 bg-[#0a0f29] border border-[#bf953f] text-[#fcf6ba] font-serif uppercase tracking-widest text-xs md:text-sm rounded-full overflow-hidden shadow-[0_0_20px_rgba(191,149,63,0.3)] hover:shadow-[0_0_40px_rgba(191,149,63,0.6)] transition-all"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
            <span className="flex items-center gap-2">
                <RotateCcw size={14} /> Ask Again
            </span>
        </motion.button>
      )}
    </div>
  );
};

export default RevelationScene;