import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Monitor, Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  progress: number;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSlide, totalSlides, progress, onNext }) => {
  const slideNumber = String(currentSlide + 1).padStart(2, '0');
  const totalNumber = String(totalSlides).padStart(2, '0');
  const isHeroOrDark = currentSlide === 0 || currentSlide === totalSlides - 1 || currentSlide === 11 || currentSlide === 13;
  const { lang, toggleLang, t } = useLanguage();

  return (
    <>
      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* Top Start - Language Toggle */}
      <motion.button
        onClick={toggleLang}
        className={`fixed top-3 sm:top-6 start-3 sm:start-8 z-50 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md shadow-sm border transition-all hover:scale-105 active:scale-95 ${isHeroOrDark ? 'bg-black/20 text-white border-white/10 hover:bg-black/40' : 'bg-white/60 text-navy-900 border-gray-200/50 hover:bg-white/90'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Globe size={16} className={isHeroOrDark ? 'text-white/70' : 'text-medical-blue'} />
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          {lang === 'en' ? 'عربي' : 'English'}
        </span>
      </motion.button>

      {/* Top End - Slide Counter */}
      <motion.div
        className="fixed top-3 sm:top-6 end-3 sm:end-8 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className={`hidden sm:flex items-center gap-1 text-sm font-semibold tracking-wider ${isHeroOrDark ? 'text-white/70' : 'text-gray-500'}`}>
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
        {/* Mobile: pill badge for better visibility */}
        <div className={`flex sm:hidden items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md border ${isHeroOrDark ? 'bg-black/20 text-white/90 border-white/10' : 'bg-white/60 text-navy-900 border-gray-200/50'}`}>
          <span className={isHeroOrDark ? 'text-white' : 'text-medical-blue'}>{slideNumber}</span>
          <span className="opacity-50">/</span>
          <span className="opacity-70">{totalNumber}</span>
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
            {currentSlide === 0 ? t('nav.scrollToExplore') : t('nav.scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 ${isHeroOrDark ? 'text-white/50' : 'text-gray-400'}`} />
          </motion.div>
        </motion.button>
      )}

    </>
  );
};

export default Navigation;
