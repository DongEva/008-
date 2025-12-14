import React, { useState, useEffect } from 'react';
import { AppState, Answer } from './types';
import { ANSWERS } from './constants';
import ParticleBackground from './components/ParticleBackground';
import IdleScene from './components/IdleScene';
import SilentScene from './components/SilentScene';
import RitualScene from './components/RitualScene';
import RevelationScene from './components/RevelationScene';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentAnswer, setCurrentAnswer] = useState<Answer>('');

  const pickAnswer = () => {
    const randomIndex = Math.floor(Math.random() * ANSWERS.length);
    setCurrentAnswer(ANSWERS[randomIndex]);
  };

  const handleStart = () => {
    setAppState(AppState.SILENT_QUESTION);
  };

  const handleSilentComplete = () => {
    setAppState(AppState.RITUAL_SELECTION);
  };

  const handleRitualSelect = () => {
    pickAnswer();
    setAppState(AppState.TRANSITION);
    
    // Transition duration logic
    setTimeout(() => {
        setAppState(AppState.REVELATION);
    }, 2000); // 2 seconds for the transition explosion effect
  };

  const handleRestart = () => {
    setAppState(AppState.IDLE);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-amber-50 selection:bg-amber-500/30">
      
      {/* Background Layer: Constant but changing modes */}
      <ParticleBackground appState={appState} />

      {/* Overlay: Transition Flash */}
      <AnimatePresence>
        {appState === AppState.TRANSITION && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-40 bg-white pointer-events-none mix-blend-overlay"
            />
        )}
      </AnimatePresence>

      {/* UI Layer */}
      <main className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          
          {appState === AppState.IDLE && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <IdleScene onStart={handleStart} />
            </motion.div>
          )}

          {appState === AppState.SILENT_QUESTION && (
            <motion.div
              key="silent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <SilentScene onComplete={handleSilentComplete} />
            </motion.div>
          )}

          {appState === AppState.RITUAL_SELECTION && (
            <motion.div
              key="ritual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: 'brightness(2)' }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <RitualScene onSelect={handleRitualSelect} />
            </motion.div>
          )}

          {appState === AppState.TRANSITION && (
            <div key="transition" className="w-full h-full flex items-center justify-center">
                 {/* Empty container, purely visual transition handled by ParticleBackground */}
            </div>
          )}

          {appState === AppState.REVELATION && (
            <motion.div
              key="revelation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <RevelationScene answer={currentAnswer} onRestart={handleRestart} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Audio hint (Visual only as we can't load real assets reliably) */}
      <div className="absolute bottom-4 right-4 z-50">
        <button className="text-amber-500/30 hover:text-amber-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default App;
