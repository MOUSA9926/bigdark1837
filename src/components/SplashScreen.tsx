import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Show logo
    const timer1 = setTimeout(() => setStage(1), 500);
    // Stage 2: Glow & Text
    const timer2 = setTimeout(() => setStage(2), 2000);
    // Stage 3: Fade out
    const timer3 = setTimeout(() => {
      setStage(3);
      setTimeout(onFinish, 800);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] overflow-hidden"
          dir="ltr"
        >
          {/* Background ambient light */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[70vmin] h-[70vmin] rounded-full bg-cyan-500/10 blur-[100px]"
            />
            <motion.div 
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1.2, 0.9, 1.2]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-[60vmin] h-[60vmin] rounded-full bg-orange-500/10 blur-[80px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={stage >= 1 ? { scale: 1, opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
              className="relative flex items-center justify-center h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] p-6"
            >
              {/* Spinning gradient background */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-orange-500/40 blur-[30px]" />
                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-cyan-500/40 blur-[30px]" />
              </motion.div>
              
              {/* Inner dark circle for contrast */}
              <div className="absolute inset-2 rounded-full bg-[#050510]/80 z-0"></div>

              <img 
                src="https://i.ibb.co/DDLS4qdm/Picsart-26-05-08-07-08-21-213.png" 
                alt="Alliance Logo" 
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
              />
              
              {/* Scanline effect */}
              <motion.div 
                initial={{ top: "-20%" }}
                animate={{ top: "120%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-white/40 blur-[1px] z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              />
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={stage >= 2 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mt-10 relative flex flex-col items-center"
            >
              <div 
                className="absolute inset-0 text-5xl sm:text-7xl font-black tracking-widest text-transparent bg-clip-text blur-2xl opacity-80"
                style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #ffffff, #f97316)' }}
              >
                BiGDARK
              </div>
              <h1 
                className="relative text-5xl sm:text-7xl font-black tracking-widest text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #ffffff, #f97316)' }}
              >
                BiGDARK
              </h1>
              
              <div className="relative mt-4 w-full flex flex-col items-center">
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={stage >= 2 ? { width: "100%", opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                  className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-3/4 max-w-[200px]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-4 text-gray-300 font-bold tracking-[0.8em] text-sm sm:text-base uppercase ml-[0.8em]"
                >
                  ALLIANCE
                </motion.div>
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={stage >= 2 ? { width: "100%", opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                  className="h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent w-3/4 max-w-[200px] mt-4"
                />
              </div>
            </motion.div>

            {/* Loading text / indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={stage >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-10 flex flex-col items-center gap-2"
            >
              <div className="flex gap-1">
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white rounded-full" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
              </div>
              <span className="text-[10px] text-gray-500 tracking-wider uppercase" dir="rtl">جاري التحميل...</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
