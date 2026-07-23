import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';
import { useLanguage } from '../i18n';

const OperationVideoSection = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="operation-video">
      <div className="w-full h-full flex flex-col justify-center px-4 py-8 sm:px-8 sm:py-8 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center gap-6 sm:gap-10 w-full h-full justify-center"
        >
          <div className="text-center mt-4">
             <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-2 sm:mb-4 capitalize">
                {t('vid.title1')} <span className="text-medical-blue">{t('vid.title2')}</span>
             </motion.h2>
             <motion.p variants={itemVariants} className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
               {t('vid.sub')}
             </motion.p>
          </div>

          <motion.div variants={itemVariants} className="relative w-full max-w-4xl mx-auto h-[65vh] sm:h-[70vh]">
             <div className="absolute inset-0 bg-gradient-to-tr from-medical-blue/20 to-transparent rounded-2xl transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 -z-10"></div>
             
             {/* Video Container */}
             <div className="glass-card overflow-hidden rounded-2xl h-full shadow-2xl bg-black/90 relative flex items-center justify-center group">
               <video 
                 ref={videoRef}
                 src={assetUrl('/vedio/operation-infuison-pump.mp4')}
                 autoPlay
                 muted
                 loop
                 playsInline
                 onTimeUpdate={handleTimeUpdate}
                 className="w-full h-full object-contain"
               />
               
               {/* Custom Video Progress Bar (YouTube style) */}
               <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-white/30 group-hover:h-2 transition-all duration-200 cursor-pointer">
                  <div 
                    className="h-full bg-red-600 relative transition-all duration-75" 
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 translate-x-1.5 sm:translate-x-2"></div>
                  </div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default OperationVideoSection;
