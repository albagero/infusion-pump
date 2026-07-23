import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Cpu, Zap, Radio, AlertTriangle, Monitor, Droplets, ArrowDown, MoveRight, ChevronRight, Activity } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { useLanguage } from '../i18n';

const EngineeringSection = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120 } }
  };

  const Block = ({
    title,
    subtitle,
    color = "bg-white text-navy-800 border border-blue-100",
  }: {
    title: string;
    subtitle?: string;
    color?: string;
  }) => (
    <motion.div
      variants={itemVariants}
      className={`${color} text-xs lg:text-sm font-semibold px-3 py-2 lg:px-5 lg:py-3 min-w-[80px] lg:min-w-[120px] shadow-md rounded-xl text-center flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-default`}
    >
      <div>{title}</div>
      {subtitle && <div className="text-[10px] lg:text-xs font-normal opacity-70 mt-0.5">{subtitle}</div>}
    </motion.div>
  );

  const HArrow = () => (
    <motion.div variants={itemVariants} className="flex items-center justify-center px-0.5 lg:px-2">
      <MoveRight className="text-blue-300 w-4 h-4 lg:w-6 lg:h-6 rtl:rotate-180" strokeWidth={2} />
    </motion.div>
  );

  const VArrow = () => (
    <motion.div variants={itemVariants} className="flex justify-center my-1 lg:my-2">
      <ArrowDown className="text-blue-300 w-4 h-4 lg:w-6 lg:h-6" strokeWidth={2} />
    </motion.div>
  );

  return (
    <SlideWrapper className="bg-section-gradient" id="engineering">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 w-full">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">09</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900">{t('eng.title')}</h2>
        </div>

        {/* MOBILE VIEW (Vertical List) */}
        <div className="sm:hidden w-full overflow-y-auto pb-4">
          <motion.div
            className="flex flex-col items-center justify-center w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Block title={t('eng.b1.title') as string} subtitle={t('eng.b1.sub') as string} />
            <VArrow />
            <Block title={t('eng.b2.title') as string} subtitle={t('eng.b2.sub') as string} />
            <VArrow />
            <Block
              title={t('eng.b3.title') as string}
              subtitle={t('eng.b3.sub') as string}
              color="bg-medical-blue text-white border-none shadow-xl shadow-medical-blue/40 font-extrabold"
            />
            <VArrow />
            <div className="flex gap-2 justify-center w-full my-2">
              <Block title={t('eng.c1.title') as string} subtitle={t('eng.c1.sub') as string} color="bg-blue-50 text-blue-800 border border-blue-200" />
              <Block title={t('eng.c2.title') as string} subtitle={t('eng.c2.sub') as string} color="bg-blue-50 text-blue-800 border border-blue-200" />
              <Block title={t('eng.c3.title') as string} subtitle={t('eng.c3.sub') as string} color="bg-red-50 text-red-700 border border-red-200" />
            </div>
            <VArrow />
            <Block title={t('eng.b4.title') as string} subtitle={t('eng.b4.sub') as string} />
            <VArrow />
            <Block title={t('eng.b5.title') as string} subtitle={t('eng.b5.sub') as string} />
            <VArrow />
            <Block title={t('eng.m1.title') as string} subtitle={t('eng.m1.sub') as string} />
            <VArrow />
            <Block title={t('eng.m2.title') as string} subtitle={t('eng.m2.sub') as string} />
            <VArrow />
            <Block
              title={t('eng.m3.title') as string}
              subtitle={t('eng.m3.sub') as string}
              color="bg-emerald-500 text-white border-none shadow-lg shadow-emerald-400/40"
            />
          </motion.div>
        </div>

        {/* DESKTOP VIEW (Diagram Card) */}
        <motion.div
          className="hidden sm:flex flex-col items-center glass-card rounded-3xl p-6 lg:p-8 w-full max-w-5xl border border-white/50 shadow-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Core Flow */}
          <div className="flex items-center justify-center w-full flex-wrap gap-2 lg:gap-4 mb-8">
            <Block title={t('eng.b1.title') as string} subtitle={t('eng.b1.sub') as string} />
            <HArrow />
            <Block title={t('eng.b2.title') as string} subtitle={t('eng.b2.sub') as string} />
            <HArrow />
            <Block
              title={t('eng.b3.title') as string}
              subtitle={t('eng.b3.sub') as string}
              color="bg-medical-blue text-white border-none shadow-xl shadow-medical-blue/40 font-extrabold"
            />
            <HArrow />
            <Block title={t('eng.b4.title') as string} subtitle={t('eng.b4.sub') as string} />
            <HArrow />
            <Block title={t('eng.b5.title') as string} subtitle={t('eng.b5.sub') as string} />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 lg:gap-16">
            {/* Peripherals (Sensory & UI) */}
            <div className="flex flex-col items-center">
              <h4 className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Radio size={16} /> {t('eng.ctrl')}</h4>
              <div className="flex items-center gap-2 lg:gap-4">
                <Block title={t('eng.c1.title') as string} subtitle={t('eng.c1.sub') as string} color="bg-blue-50 text-blue-800 border border-blue-200" />
                <Block title={t('eng.c2.title') as string} subtitle={t('eng.c2.sub') as string} color="bg-blue-50 text-blue-800 border border-blue-200" />
                <Block title={t('eng.c3.title') as string} subtitle={t('eng.c3.sub') as string} color="bg-red-50 text-red-700 border border-red-200" />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

            {/* Output (Delivery) */}
            <div className="flex flex-col items-center mt-4 lg:mt-0">
              <h4 className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Droplets size={16} /> {t('eng.mech')}</h4>
              <div className="flex items-center gap-2 lg:gap-4">
                <Block title={t('eng.m1.title') as string} subtitle={t('eng.m1.sub') as string} />
                <HArrow />
                <Block title={t('eng.m2.title') as string} subtitle={t('eng.m2.sub') as string} />
                <HArrow />
                <Block
                  title={t('eng.m3.title') as string}
                  subtitle={t('eng.m3.sub') as string}
                  color="bg-emerald-500 text-white border-none shadow-lg shadow-emerald-400/40"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default EngineeringSection;
