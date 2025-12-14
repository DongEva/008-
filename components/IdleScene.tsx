import React from 'react';
import { motion } from 'framer-motion';

interface IdleSceneProps {
  onStart: () => void;
}

const IdleScene: React.FC<IdleSceneProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-between h-full text-center py-16 px-6" onClick={onStart}>
      
      {/* Top Text Group */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="mt-8 space-y-6 md:space-y-8 cursor-pointer"
      >
        <p className="text-xl md:text-2xl text-gold-flat tracking-wider font-serif">
          In the vast universe,
        </p>
        <h1 className="text-2xl md:text-4xl text-gold font-bold leading-relaxed royal-font">
          Every thought finds its echo.
        </h1>
        <p className="text-lg md:text-xl text-gold-flat/80 tracking-wide">
          Please whisper your question to the stars.
        </p>
      </motion.div>

      {/* Bottom CTA & Book Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="flex flex-col items-center w-full max-w-lg cursor-pointer group"
      >
        <div className="mb-8 text-center">
            <p className="text-gold-flat text-sm md:text-base tracking-[0.3em] uppercase border-b border-amber-500/30 pb-2 inline-block animate-pulse">
                When you are ready, touch the stars
            </p>
        </div>

        {/* Decorative Closed/Half-Open Book Graphic mimicking the image */}
        <div className="relative w-64 h-48 md:w-96 md:h-64 perspective-1000">
            {/* Glow behind book */}
            <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full"></div>
            
            {/* Book Body */}
            <motion.div 
                whileHover={{ scale: 1.05, rotateX: 10 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
            >
                {/* Book Cover / Pages representation */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-4/5 bg-[#1a110a] rounded-b-xl book-shadow flex overflow-hidden border border-[#5c4018]">
                    {/* Left Page */}
                    <div className="w-1/2 h-full bg-[#1a110a] relative border-r border-[#3e2b10]">
                         {/* Gold Ornamentation */}
                         <div className="absolute top-2 left-2 w-full h-full border-2 border-[#bf953f] opacity-30 rounded-tl-lg"></div>
                         <div className="absolute bottom-2 left-2 w-full h-full border-2 border-[#bf953f] opacity-30 rounded-bl-lg"></div>
                    </div>
                    {/* Right Page */}
                    <div className="w-1/2 h-full bg-[#1a110a] relative">
                         <div className="absolute top-2 right-2 w-full h-full border-2 border-[#bf953f] opacity-30 rounded-tr-lg"></div>
                         <div className="absolute bottom-2 right-2 w-full h-full border-2 border-[#bf953f] opacity-30 rounded-br-lg"></div>
                    </div>
                </div>

                {/* Pages slightly open */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] h-[70%] flex">
                     <div className="w-1/2 h-full bg-gradient-to-r from-[#2a1d12] to-[#46331f] rounded-tl-md transform skew-y-3 origin-bottom-right border-t border-[#856b3e]"></div>
                     <div className="w-1/2 h-full bg-gradient-to-l from-[#2a1d12] to-[#46331f] rounded-tr-md transform -skew-y-3 origin-bottom-left border-t border-[#856b3e]"></div>
                </div>
                
                {/* Glowing Dust */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full text-center">
                    <div className="inline-block relative">
                         <div className="absolute inset-0 blur-lg bg-amber-400/30"></div>
                    </div>
                </div>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default IdleScene;