import React from 'react';
import { motion } from 'framer-motion';
import { Star, Scroll, Sparkles } from 'lucide-react';

interface RitualSceneProps {
  onSelect: () => void;
}

const RitualScene: React.FC<RitualSceneProps> = ({ onSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl text-gold font-serif royal-font mb-4">
            Choose Your Fate
        </h2>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto"></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full place-items-center"
      >
        {/* Artifact 1: Stardust Card */}
        <RitualArtifact 
            icon={<Sparkles className="text-amber-200" strokeWidth={1} size={48} />} 
            title="Stardust" 
            desc="Draw from the cosmos"
            onClick={onSelect} 
            variants={itemVariants} 
        />
        
        {/* Artifact 2: Celestial Core */}
        <RitualArtifact 
            icon={<Star className="text-amber-200" strokeWidth={1} size={56} />} 
            title="The Core" 
            desc="Ignite the center"
            onClick={onSelect} 
            variants={itemVariants} 
            isCenter={true}
        />
        
        {/* Artifact 3: Ancient Scroll */}
        <RitualArtifact 
            icon={<Scroll className="text-amber-200" strokeWidth={1} size={48} />} 
            title="The Scroll" 
            desc="Read the prophecy"
            onClick={onSelect} 
            variants={itemVariants} 
        />
      </motion.div>
    </div>
  );
};

const RitualArtifact = ({ icon, title, desc, onClick, variants, isCenter }: any) => (
    <motion.button
      variants={variants}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className={`relative group flex flex-col items-center justify-center text-center transition-all duration-500
        ${isCenter ? 'w-64 h-80' : 'w-56 h-72'}
      `}
    >
        {/* Card Background: Gold Border + Dark Fill */}
        <div className="absolute inset-0 bg-[#0a0f29] border border-[#bf953f] rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Inner Border */}
            <div className="absolute inset-2 border border-[#bf953f] opacity-30 rounded-lg border-dashed"></div>
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#bf953f] rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#bf953f] rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#bf953f] rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#bf953f] rounded-br-xl"></div>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-6">
            <div className="p-4 bg-[#1a203d] rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)] group-hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-shadow">
                {icon}
            </div>
            <div>
                <h3 className="text-xl md:text-2xl text-gold font-serif mb-1 royal-font">{title}</h3>
                <p className="text-amber-100/40 text-sm font-serif italic">{desc}</p>
            </div>
        </div>
    </motion.button>
);

export default RitualScene;