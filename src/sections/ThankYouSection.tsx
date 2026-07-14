import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';

const ThankYouSection = () => {
  return (
    <SlideWrapper className="bg-dark-gradient" id="thank-you">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 relative z-10 overflow-hidden">
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-3 sm:mb-6 tracking-tight">
            Thank You!
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-medical-cyan font-semibold mb-6 sm:mb-12">
            Any Questions?
          </p>

          <div className="mb-8 sm:mb-16">
            <p className="text-base sm:text-xl text-white font-medium mb-1">Albager Abdalsalam</p>
            <p className="text-blue-200/70 uppercase tracking-widest text-xs sm:text-sm">Biomedical Engineering Department</p>
          </div>

          {/* References */}
          <div className="max-w-2xl mx-auto glass-card-dark p-4 sm:p-6 rounded-2xl border border-white/10">
            <h4 className="text-gray-400 uppercase tracking-wider text-xs font-bold mb-3 sm:mb-4">References</h4>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
              <span className="bg-white/5 px-2 py-1 sm:px-3 rounded-full">FDA Guidance</span>
              <span className="bg-white/5 px-2 py-1 sm:px-3 rounded-full">IEC 60601 Series</span>
              <span className="bg-white/5 px-2 py-1 sm:px-3 rounded-full">ISO 14971</span>
              <span className="bg-white/5 px-2 py-1 sm:px-3 rounded-full">Service Manuals</span>
            </div>
          </div>
        </motion.div>

      </div>
    </SlideWrapper>
  );
};

export default ThankYouSection;
