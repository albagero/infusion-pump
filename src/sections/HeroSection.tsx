import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const HeroSection = () => {
  return (
    <SlideWrapper className="bg-hero-gradient" id="hero">
      <div className="w-full h-full flex flex-col lg:flex-row relative overflow-hidden">
        {/* ECG Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
            <path
              className="ecg-path"
              d="M0,50 L200,50 L230,20 L260,80 L290,50 L500,50 L530,30 L560,70 L590,50 L1000,50"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center px-5 sm:px-10 lg:px-20 pt-20 sm:pt-24 lg:pt-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-4 block">
              01
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Infusion Pump
            </h1>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold gradient-text mb-4 sm:mb-6">
              Intelligent. Precise. Reliable.
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-md mb-6 sm:mb-10">
              Advancing Patient Care Through Technology and Innovation
            </p>

            <div className="mt-4 sm:mt-8 border-t border-white/10 pt-4 sm:pt-8">
              <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">
                Biomedical Engineering Workshop
              </p>
              <p className="text-base sm:text-lg text-white font-medium">
                Presented by Albager Abdalsalam
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex-1 flex items-center justify-center relative z-10 p-4 sm:p-8 pb-16 lg:pb-8">
          <motion.div
            className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg aspect-square"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-medical-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <motion.div 
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 glass-card-dark"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <img 
                src="/img/infustion-pump.jpg" 
                alt="Infusion Pump" 
                className="w-full h-full object-cover opacity-90"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default HeroSection;
