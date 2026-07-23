import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { useLanguage } from '../i18n';

const AdvantagesSection = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const advantages = [
    t('adv.a1'),
    t('adv.a2'),
    t('adv.a3'),
    t('adv.a4'),
    t('adv.a5'),
    t('adv.a6')
  ];

  const limitations = [
    t('adv.l1'),
    t('adv.l2'),
    t('adv.l3'),
    t('adv.l4'),
    t('adv.l5')
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="advantages">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-6xl mx-auto overflow-hidden">
        <div className="text-center mb-6 sm:mb-10 lg:mb-16">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">
            12
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900">
            {t('adv.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 lg:gap-16 w-full relative">
           
           {/* Center Icon/Image Background */}
           <div className="hidden sm:flex absolute inset-0 justify-center items-center opacity-5 pointer-events-none z-0">
             <div className="w-64 h-64 rounded-full border-[20px] border-medical-blue"></div>
           </div>

          {/* Advantages */}
          <motion.div 
            className="glass-card rounded-2xl overflow-hidden shadow-lg z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className="bg-gradient-to-r from-accent-green to-emerald-400 h-1 sm:h-2 w-full"></div>
            <div className="p-4 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span className="text-accent-green">{t('adv.adv')}</span>
              </h3>
              <div className="space-y-2 sm:space-y-4">
                {advantages.map((adv, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-center gap-2 sm:gap-4">
                    <CheckCircle2 className="text-accent-green flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-lg text-gray-700 font-medium">{adv}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Limitations */}
          <motion.div 
            className="glass-card rounded-2xl overflow-hidden shadow-lg z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className="bg-gradient-to-r from-accent-red to-orange-400 h-1 sm:h-2 w-full"></div>
            <div className="p-4 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <span className="text-accent-red">{t('adv.lim')}</span>
              </h3>
              <div className="space-y-2 sm:space-y-4">
                {limitations.map((lim, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-center gap-2 sm:gap-4">
                    <XCircle className="text-accent-red flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-lg text-gray-700 font-medium">{lim}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </SlideWrapper>
  );
};

export default AdvantagesSection;
