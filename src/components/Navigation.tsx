import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Monitor } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  progress: number;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSlide, totalSlides, progress, onNext }) => {
  const slideNumber = String(currentSlide + 1).padStart(2, '0');
  const totalNumber = String(totalSlides).padStart(2, '0');
  const isHeroOrDark = currentSlide === 0 || currentSlide === totalSlides - 1 || currentSlide === 12;

  return (
    <>
      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* Top Right - Slide Counter */}
      <motion.div
        className="fixed top-3 sm:top-6 right-4 sm:right-8 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className={`hidden sm:flex items-center gap-1 text-sm font-semibold tracking-wider ${isHeroOrDark ? 'text-white/70' : 'text-gray-400'}`}>
          <AnimatePresence mode="wait">
            <motion.span
              key={slideNumber}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`text-lg font-bold ${isHeroOrDark ? 'text-white' : 'text-medical-blue'}`}
            >
              {slideNumber}
            </motion.span>
          </AnimatePresence>
          <span className="mx-1">/</span>
          <span>{totalNumber}</span>
        </div>
        {/* Mobile: just show current/total compact */}
        <div className={`flex sm:hidden items-center gap-0.5 text-xs font-bold ${isHeroOrDark ? 'text-white/70' : 'text-gray-400'}`}>
          <span className={isHeroOrDark ? 'text-white' : 'text-medical-blue'}>{slideNumber}</span>
          <span>/</span>
          <span>{totalNumber}</span>
        </div>
      </motion.div>

      {/* Bottom Center - Navigation Hint */}
      {currentSlide < totalSlides - 1 && (
        <motion.button
          className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 cursor-pointer group"
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className={`hidden sm:block text-xs font-medium tracking-wider uppercase ${isHeroOrDark ? 'text-white/50' : 'text-gray-400'}`}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 ${isHeroOrDark ? 'text-white/50' : 'text-gray-400'}`} />
          </motion.div>
        </motion.button>
      )}

      {/* Bottom Right - Fullscreen Hint (hidden on mobile) */}
      <motion.div
        className="hidden sm:flex fixed bottom-8 right-8 z-50 items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <Monitor className={`w-3.5 h-3.5 ${isHeroOrDark ? 'text-white/30' : 'text-gray-300'}`} />
        <span className={`text-[10px] font-medium tracking-wider uppercase ${isHeroOrDark ? 'text-white/30' : 'text-gray-300'}`}>
          Press F for fullscreen
        </span>
      </motion.div>
    </>
  );
};

export default Navigation;
