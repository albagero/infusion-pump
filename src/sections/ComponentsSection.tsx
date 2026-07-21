import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Keyboard, Cog, CircuitBoard, Radio, Battery, Cpu, Zap } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';

const ComponentsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const componentsList = [
    { name: 'Display Screen', icon: <Monitor size={20} className="text-medical-blue" /> },
    { name: 'Control Panel', icon: <Keyboard size={20} className="text-medical-blue" /> },
    { name: 'Microcontroller', icon: <Cpu size={20} className="text-medical-blue" /> },
    { name: 'Motor Driver', icon: <Zap size={20} className="text-medical-blue" /> },
    { name: 'Stepper Motor', icon: <Cog size={20} className="text-medical-blue" /> },
    { name: 'Peristaltic Pump Mechanism', icon: <CircuitBoard size={20} className="text-medical-blue" /> },
    { name: 'Sensors (Pressure, Air-in-Line, Door)', icon: <Radio size={20} className="text-medical-blue" /> },
    { name: 'Battery', icon: <Battery size={20} className="text-medical-blue" /> }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="components">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-4 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div>
            <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">
              05
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2 sm:mb-4 lg:mb-6">
              Internal Components
            </h2>

            <motion.div 
              className="space-y-1 sm:space-y-2 lg:space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              {componentsList.map((comp, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4 glass-card p-2 sm:p-3 lg:p-4 rounded-xl group hover:border-medical-light/50 transition-colors"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {React.cloneElement(comp.icon as React.ReactElement, { className: 'w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-medical-blue' })}
                  </div>
                  <div className="flex gap-2 sm:gap-3 lg:gap-4 items-center">
                    <span className="text-xs sm:text-sm font-bold text-medical-blue/50 w-3 sm:w-4">{index + 1}</span>
                    <span className="text-xs sm:text-sm lg:text-base font-semibold text-navy-800">{comp.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content */}
          <motion.div 
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.1 }}
          >
            <motion.div 
              className="relative w-full glass-card p-2 sm:p-4 lg:p-6 rounded-2xl shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <img 
                src={assetUrl('/img/infusion_pump_internals.png')} 
                alt="Internal Components Diagram" 
                className="w-full h-auto rounded-xl max-h-[150px] sm:max-h-[55vh] object-contain"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </SlideWrapper>
  );
};

export default ComponentsSection;
