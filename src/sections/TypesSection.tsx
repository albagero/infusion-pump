import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Syringe, Hand, Pill, Circle } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';

const TypesSection = () => {
  const [selectedType, setSelectedType] = useState(0);

  const pumpTypes = [
    { 
      name: 'Volumetric Pump', 
      icon: <Beaker size={28} />, 
      shortDesc: 'Most Common', 
      fullDesc: 'Used for controlled delivery of large volumes of fluids over a specific period. Standard in general wards.',
      image: assetUrl('/img/volumetric_pump.png'),
      isHighlight: true
    },
    { 
      name: 'Syringe Pump', 
      icon: <Syringe size={28} />, 
      shortDesc: 'High Precision', 
      fullDesc: 'Uses a motor-driven syringe plunger. Extremely accurate flow rates, ideal for ICU and neonatal care.',
      image: assetUrl('/img/syringe_pump.png'),
      isHighlight: false
    },
    { 
      name: 'Insulin Pump', 
      icon: <Pill size={28} />, 
      shortDesc: 'Continuous Delivery', 
      fullDesc: 'Small, wearable devices for continuous subcutaneous insulin delivery in diabetes management.',
      image: assetUrl('/img/insulin_pump.png'),
      isHighlight: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="pump-types">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-2 sm:mb-8 sm:mb-12">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            04
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-1 sm:mb-4">
            Types of Infusion Pumps
          </h2>
          <p className="text-xs sm:text-base lg:text-lg text-gray-500">
            Each type is optimized for different clinical applications
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div 
          className="flex lg:grid lg:grid-cols-3 lg:max-w-3xl lg:mx-auto overflow-x-auto lg:overflow-visible gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-8 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {pumpTypes.map((pump, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => setSelectedType(index)}
              className={`snap-start flex-shrink-0 w-36 sm:w-44 lg:w-auto cursor-pointer glass-card p-3 sm:p-6 flex flex-col items-center text-center rounded-2xl transition-all duration-300 relative overflow-hidden group ${selectedType === index ? 'ring-2 ring-medical-blue scale-105 shadow-xl' : 'hover:bg-blue-50/50 hover:-translate-y-1'}`}
            >
              {pump.isHighlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-medical-blue to-medical-cyan"></div>
              )}
              
              <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-4 transition-colors ${selectedType === index ? 'bg-medical-blue text-white' : 'bg-blue-100 text-medical-blue group-hover:bg-medical-blue group-hover:text-white'}`}>
                {pump.icon}
              </div>
              
              <h3 className="font-bold text-navy-900 text-xs sm:text-sm mb-1">{pump.name}</h3>
              <p className="text-[9px] sm:text-xs text-medical-blue font-semibold uppercase tracking-wider">{pump.shortDesc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detail Panel */}
        <div className="mt-2 sm:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-3 sm:p-6 rounded-3xl shadow-2xl border border-white/50 max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-8 items-center"
            >
              {/* Large Image Container */}
              <div className="w-full sm:w-56 h-40 sm:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-inner border border-blue-50/50 bg-white/60 group flex items-center justify-center">
                <img 
                  src={pumpTypes[selectedType].image} 
                  alt={pumpTypes[selectedType].name}
                  className="w-full h-full object-contain p-4 sm:p-2 transform transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
                />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-medical-blue to-medical-cyan flex items-center justify-center flex-shrink-0 text-white shadow-md">
                    {pumpTypes[selectedType].icon}
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-3xl font-bold text-navy-900">{pumpTypes[selectedType].name}</h4>
                    <span className="text-[11px] sm:text-sm text-medical-blue font-bold uppercase tracking-widest">{pumpTypes[selectedType].shortDesc}</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base lg:text-xl text-gray-600 leading-relaxed max-w-2xl mt-2 sm:mt-4">
                  {pumpTypes[selectedType].fullDesc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </SlideWrapper>
  );
};

export default TypesSection;
