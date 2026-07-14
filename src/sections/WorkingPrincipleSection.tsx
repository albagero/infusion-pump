import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Cpu, Cog, RotateCcw, Droplets, ArrowRight, Play } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const WorkingPrincipleSection = () => {
  const [key, setKey] = useState(0); // Used to trigger animation replay

  const steps = [
    { name: 'Set Parameters', icon: <Settings size={32} />, image: '/img/new_params.jpg' },
    { name: 'Microcontroller', icon: <Cpu size={32} />, image: '/img/infusion_pump_internals.png' },
    { name: 'Motor Drives', icon: <Cog size={32} />, image: '/img/flow_mechanism.png' },
    { name: 'Rollers Compress', icon: <RotateCcw size={32} />, image: '/img/new_rollers.jpg' },
    { name: 'Fluid to Patient', icon: <Droplets size={32} />, image: '/img/new_fluid.jpg' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const replayAnimation = () => {
    setKey(prev => prev + 1);
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="working-principle">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 sm:px-8 sm:py-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-3 sm:mb-6 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-2">
             <div>
               <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase block text-left">
                05
               </span>
               <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 text-left">
                Working Principle
               </h2>
             </div>
             
             <button 
               onClick={replayAnimation}
               className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 hover:bg-medical-blue hover:text-white text-medical-blue rounded-full transition-colors text-xs sm:text-sm font-semibold self-start sm:self-auto"
             >
               <Play size={14} /> Play Animation
             </button>
          </div>
        </div>

        {/* === MOBILE: Vertical numbered list (hidden on sm+) === */}
        <div className="sm:hidden w-full overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              className="flex flex-col gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {steps.map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-center gap-3 glass-card p-3 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-medical-blue text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                    <img src={step.image} alt={step.name} className="w-full h-full object-contain mix-blend-multiply opacity-90" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-medical-blue">{React.cloneElement(step.icon as React.ReactElement, { size: 18 })}</div>
                    <span className="text-sm font-bold text-navy-800">{step.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === DESKTOP: Horizontal flowchart (hidden on mobile) === */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={key}
            className="hidden sm:flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-2 lg:gap-6 my-4 lg:my-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 lg:gap-8 group">
                  <div className="glass-card flex flex-col items-center justify-center p-4 w-36 h-36 lg:w-44 lg:h-44 rounded-3xl text-center relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-300">
                     <div className="absolute top-0 left-0 w-full h-1.5 bg-medical-blue transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                     
                     <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-blue-50 text-medical-blue flex items-center justify-center mb-2 lg:mb-4 shadow-inner transform group-hover:scale-110 transition-transform">
                       {React.cloneElement(step.icon as React.ReactElement, { className: 'w-7 h-7 lg:w-9 lg:h-9' })}
                     </div>
                     
                     <span className="text-xs lg:text-sm font-bold text-navy-800 leading-tight">
                       {step.name}
                     </span>
                  </div>
                  
                  {/* Real Image below the step card */}
                  <div className="w-36 h-28 lg:w-44 lg:h-32 rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-white/80 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 flex items-center justify-center p-2">
                    <img 
                      src={step.image} 
                      alt={step.name} 
                      className="w-full h-full object-contain mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity drop-shadow-sm"
                    />
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div variants={arrowVariants} className="hidden lg:flex mb-32">
                    <ArrowRight className="text-gray-300" size={24} />
                  </motion.div>
                )}
                
                {/* Tablet downward arrow */}
                {index < steps.length - 1 && (
                  <motion.div variants={arrowVariants} className="lg:hidden mb-2">
                    <ArrowRight className="text-gray-300 rotate-90" size={24} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Removed Continuous Precision Panel as requested */}
      </div>
    </SlideWrapper>
  );
};

export default WorkingPrincipleSection;
