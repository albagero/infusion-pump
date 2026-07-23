import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';
import { useLanguage } from '../i18n';

const WhatIsPumpSection = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="what-is-pump">
      <div className="w-full h-full flex flex-col justify-center px-4 py-8 sm:px-8 sm:py-8 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center gap-6 sm:gap-10 w-full h-full justify-center"
        >
          <div className="text-center mt-4">
             <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-4 capitalize">
                {t('whatIs.title1')}<br className="sm:hidden" />
                <span className="text-medical-blue sm:ms-3">{t('whatIs.title2')}</span>
             </motion.h2>
          </div>

          <motion.div variants={itemVariants} className="relative w-full max-w-4xl mx-auto h-[65vh] sm:h-[70vh]">
             <div className="absolute inset-0 bg-gradient-to-tr from-medical-blue/20 to-transparent rounded-2xl transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 -z-10"></div>
             <div className="glass-card p-0 sm:p-4 overflow-hidden rounded-2xl h-full shadow-2xl bg-white/70 backdrop-blur-md flex items-center justify-center">
               <img 
                 src={assetUrl('/gif/introp-infusion-pump.gif')} 
                 alt="Infusion Pump Introduction Animation" 
                 className="w-full h-full sm:rounded-xl object-contain bg-black/5"
               />
             </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default WhatIsPumpSection;
