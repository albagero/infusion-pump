import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Wrench, Settings, Zap, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { useLanguage } from '../i18n';

const ResponsibilitiesSection = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const responsibilities = [
    { title: t('resp.r1') as string, icon: <CheckSquare size={32} />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: t('resp.r2') as string, icon: <Settings size={32} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { title: t('resp.r3') as string, icon: <Wrench size={32} />, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: t('resp.r4') as string, icon: <CheckCircle size={32} />, color: 'text-green-500', bg: 'bg-green-50' },
    { title: t('resp.r5') as string, icon: <Zap size={32} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { title: t('resp.r6') as string, icon: <BookOpen size={32} />, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: t('resp.r7') as string, icon: <ShieldCheck size={32} />, color: 'text-indigo-500', bg: 'bg-indigo-50' }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="responsibilities">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-6xl mx-auto overflow-hidden">
        <div className="text-center mb-6 sm:mb-10 lg:mb-16">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            11
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2 sm:mb-4">
            {t('resp.title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500">
            {t('resp.subtitle')}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {responsibilities.map((resp, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`glass-card p-3 sm:p-6 rounded-2xl flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300 ${index === 6 ? 'sm:col-span-3 lg:col-span-1' : ''}`}
            >
              <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full ${resp.bg} ${resp.color} flex items-center justify-center mb-2 sm:mb-4 group-hover:shadow-lg transition-shadow`}>
                {React.cloneElement(resp.icon as React.ReactElement, { className: 'w-5 h-5 sm:w-8 sm:h-8' })}
              </div>
              <h3 className="font-bold text-navy-900 text-xs sm:text-lg leading-tight">{resp.title}</h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SlideWrapper>
  );
};

export default ResponsibilitiesSection;
