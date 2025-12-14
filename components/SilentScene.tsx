import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SilentSceneProps {
  onComplete: () => void;
}

const SilentScene: React.FC<SilentSceneProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    if (progress === 100) {
        const timeout = setTimeout(onComplete, 1200);
        return () => clearTimeout(timeout);
    }

    return () => clearInterval(timer);
  }, [progress, onComplete]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-12 flex flex-col items-center"
      >
        <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl text-gold font-serif royal-font">
            Silence Your Mind
            </h2>
            <p className="text-xl text-gold-flat/80 italic font-serif">
            The stars are listening...
            </p>
        </div>

        {/* Magical Rune Circle */}
        <div className="relative w-72 h-72 flex items-center justify-center cursor-pointer" onClick={progress === 100 ? onComplete : undefined}>
          
          {/* Outer Rotating Runes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-amber-500/20 flex items-center justify-center"
          >
            <div className="absolute top-0 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
            <div className="absolute bottom-0 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
            <div className="absolute left-0 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
            <div className="absolute right-0 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"></div>
          </motion.div>

          {/* Inner Progress Ring */}
          <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
             <circle
              cx="144"
              cy="144"
              r="100"
              stroke="rgba(191, 149, 63, 0.2)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="144"
              cy="144"
              r="100"
              stroke="#bf953f"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          
          {/* Center Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-32 h-32 bg-amber-500/10 rounded-full blur-xl"
            />
            <span className="text-2xl font-serif text-gold tabular-nums z-10 relative">
                {Math.floor(progress / 10)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SilentScene;