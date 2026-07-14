import React from 'react';
import { motion } from 'framer-motion';
import { Target, Settings, Activity, ShieldCheck } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const DefinitionSection = () => {
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

  const features = [
    { icon: <Target size={24} className="text-medical-blue" />, label: 'Precise Delivery' },
    { icon: <Settings size={24} className="text-medical-blue" />, label: 'Programmable Flow Rate' },
    { icon: <Activity size={24} className="text-medical-blue" />, label: 'Continuous Monitoring' },
    { icon: <ShieldCheck size={24} className="text-medical-blue" />, label: 'Patient Safety' }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="definition">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-8 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-2 block">
                02
              </span>
              <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-4 sm:mb-6">
                What is an<br />
                <span className="text-medical-blue">Infusion Pump?</span>
              </motion.h2>
            </div>

            <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg">
              An infusion pump is a medical device that delivers fluids, medications, or nutrients into a patient's body in controlled amounts and flow rates. Unlike gravity-based IV administration, infusion pumps regulate flow electronically, ensuring accurate dosage regardless of patient position or fluid level.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-semibold text-navy-800 leading-tight">
                    {feature.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content */}
          <motion.div variants={itemVariants} className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-medical-blue/10 to-transparent rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
             <div className="glass-card p-4 overflow-hidden group">
               <img 
                 src="/img/images (29).jpeg" 
                 alt="Infusion Pump Details" 
                 className="w-full h-auto rounded-xl object-cover transform transition-transform duration-700 group-hover:scale-105"
               />
             </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default DefinitionSection;
