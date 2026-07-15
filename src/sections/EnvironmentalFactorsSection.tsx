import React from 'react';
import { motion } from 'framer-motion';
import { Palette, ArrowUpDown, Mountain } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const EnvironmentalFactorsSection = () => {
  const factors = [
    {
      name: 'Fluid Color & Opacity',
      icon: <Palette size={24} className="text-white" />,
      iconLg: <Palette size={32} className="text-white" />,
      desc: 'Dark or opaque fluids can affect optical sensor accuracy',
      color: 'from-amber-400 to-amber-600',
    },
    {
      name: 'Pump Height',
      icon: <ArrowUpDown size={24} className="text-white" />,
      iconLg: <ArrowUpDown size={32} className="text-white" />,
      desc: 'IV bag height creates hydrostatic pressure affecting flow',
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Altitude & Pressure',
      icon: <Mountain size={24} className="text-white" />,
      iconLg: <Mountain size={32} className="text-white" />,
      desc: 'Lower atmospheric pressure causes gas expansion in tubing',
      color: 'from-purple-400 to-purple-600',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="environmental-factors">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-8 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-10 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            12
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-1 sm:mb-4">
            Engineering Challenges
          </h2>
          <h3 className="text-xs sm:text-xl text-medical-blue font-semibold">
            Environmental & Physical Factors
          </h3>
        </div>

        {/* Mobile: Vertical compact cards | Desktop: 3-col grid */}
        <motion.div 
          className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {factors.map((factor, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card rounded-2xl relative overflow-hidden group transition-all duration-300 hover:shadow-xl
                flex flex-row items-center gap-4 p-4
                sm:flex-col sm:items-center sm:text-center sm:p-6"
            >
              <div className={`absolute top-0 inset-x-0 h-1.5 sm:h-2 bg-gradient-to-r ${factor.color}`}></div>
              
              {/* Mobile: small circle | Desktop: larger */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${factor.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                <span className="sm:hidden">{factor.icon}</span>
                <span className="hidden sm:block">{factor.iconLg}</span>
              </div>

              <div className="flex-1 sm:flex-initial">
                <h4 className="text-base sm:text-xl font-bold text-navy-900 mb-0.5 sm:mb-3">{factor.name}</h4>
                <p className="text-gray-600 font-medium text-xs sm:text-sm leading-snug">{factor.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-4 sm:mt-8 flex-shrink-0">
          <p className="text-gray-400 text-xs sm:text-sm italic animate-pulse">
            Swipe through the next slides to explore each factor in detail &rarr;
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
};

export default EnvironmentalFactorsSection;
