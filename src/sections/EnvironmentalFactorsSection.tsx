import React from 'react';
import { motion } from 'framer-motion';
import { Palette, ArrowUpDown, Mountain } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const EnvironmentalFactorsSection = () => {
  const factors = [
    {
      name: 'Fluid Color & Opacity',
      icon: <Palette size={32} className="text-white" />,
      desc: 'Dark or opaque fluids can affect optical sensor accuracy',
      color: 'from-amber-400 to-amber-600',
    },
    {
      name: 'Pump Height (Hydrostatic Pressure)',
      icon: <ArrowUpDown size={32} className="text-white" />,
      desc: 'IV bag height creates hydrostatic pressure affecting flow',
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Altitude & Atmospheric Pressure',
      icon: <Mountain size={32} className="text-white" />,
      desc: 'Lower atmospheric pressure causes gas expansion in tubing',
      color: 'from-purple-400 to-purple-600',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="environmental-factors">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-4 sm:mb-12 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">
            12
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2 sm:mb-4">
            Engineering Challenges
          </h2>
          <h3 className="text-sm sm:text-xl text-medical-blue font-semibold mb-2 sm:mb-4">
            Environmental & Physical Factors Affecting Infusion Pump Performance
          </h3>
          <p className="text-xs sm:text-base text-gray-600 max-w-3xl mx-auto hidden sm:block">
            Modern infusion pumps are designed to deliver fluids with high accuracy. However, several environmental and physical factors can influence their performance.
          </p>
        </div>

        <motion.div 
          className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible gap-4 lg:gap-6 mb-4 sm:mb-8 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {factors.map((factor, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden flex flex-col items-center text-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-auto snap-center"
            >
              <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${factor.color}`}></div>
              
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${factor.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {factor.icon}
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-navy-900 mb-2 sm:mb-3">{factor.name}</h4>
              <p className="text-gray-600 font-medium text-xs sm:text-sm">{factor.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-auto flex-shrink-0">
          <p className="text-gray-400 text-xs sm:text-sm italic animate-pulse">
            Swipe through the next slides to explore each factor in detail &rarr;
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
};

export default EnvironmentalFactorsSection;
