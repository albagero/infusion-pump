import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { useLanguage } from '../i18n';

const WhyNeededSection = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const leftCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const withoutPump = [
    t('why.w1'),
    t('why.w2'),
    t('why.w3'),
    t('why.w4')
  ];

  const withPump = [
    t('why.wp1'),
    t('why.wp2'),
    t('why.wp3'),
    t('why.wp4')
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="why-needed">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 sm:px-8 sm:py-8 lg:px-20 max-w-6xl mx-auto overflow-hidden">
        <div className="text-center mb-6 sm:mb-10 md:mb-16">
           <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-2 block">
            03
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900">
            {t('why.title1')}
            <span className="text-medical-blue">{t('why.title2')}</span>
          </h2>
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-4 w-full relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Left Card - Without Pump */}
          <motion.div variants={leftCardVariants} className="w-full sm:w-5/12">
            <div className="glass-card border-l-4 border-l-red-500 p-4 sm:p-8 h-full">
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-3 sm:mb-6 text-center">{t('why.without')}</h3>
              <div className="space-y-2 sm:space-y-6">
                {withoutPump.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-red-50/50 p-2 sm:p-4 rounded-xl">
                    <XCircle className="text-red-500 flex-shrink-0" size={20} />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center VS Badge */}
          <motion.div 
            className="z-10 flex-shrink-0 mx-2 my-0"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            viewport={{ once: false }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-medical-blue to-medical-cyan flex items-center justify-center shadow-xl text-white font-bold text-xl border-4 border-white">
              VS
            </div>
          </motion.div>

          {/* Right Card - With Pump */}
          <motion.div variants={rightCardVariants} className="w-full sm:w-5/12">
            <div className="glass-card border-l-4 border-l-green-500 p-4 sm:p-8 h-full">
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-3 sm:mb-6 text-center">{t('why.with')}</h3>
              <div className="space-y-2 sm:space-y-6">
                {withPump.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-green-50/50 p-2 sm:p-4 rounded-xl">
                    <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default WhyNeededSection;
