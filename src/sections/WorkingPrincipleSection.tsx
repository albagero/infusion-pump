import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Cpu, Cog, RotateCcw, Activity, Droplets, ArrowRight, Play, ChevronDown } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';
import { useLanguage } from '../i18n';

const WorkingPrincipleSection = () => {
  const { t } = useLanguage();
  const [key, setKey] = useState(0); // Used to trigger animation replay
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const steps = [
    { 
      name: t('wp.s1.name') as string, 
      icon: <Settings size={32} />, 
      image: assetUrl('/img/new_params.jpg'),
      details: [t('wp.s1.d1') as string, t('wp.s1.d2') as string, t('wp.s1.d3') as string]
    },
    { 
      name: t('wp.s2.name') as string, 
      icon: <Cpu size={32} />, 
      image: assetUrl('/img/infusion_pump_internals.png'),
      details: [t('wp.s2.d1') as string, t('wp.s2.d2') as string, t('wp.s2.d3') as string]
    },
    { 
      name: t('wp.s3.name') as string, 
      icon: <Cog size={32} />, 
      image: assetUrl('/img/step3_motor.jpg'),
      details: [t('wp.s3.d1') as string, t('wp.s3.d2') as string, t('wp.s3.d3') as string]
    },
    { 
      name: t('wp.s4.name') as string, 
      icon: <RotateCcw size={32} />, 
      image: assetUrl('/img/new_rollers.jpg'),
      details: [t('wp.s4.d1') as string, t('wp.s4.d2') as string, t('wp.s4.d3') as string]
    },
    { 
      name: t('wp.s5.name') as string, 
      icon: <Activity size={32} />, 
      image: assetUrl('/img/pump_sensors.png'),
      details: [t('wp.s5.d1') as string, t('wp.s5.d2') as string, t('wp.s5.d3') as string]
    },
    { 
      name: t('wp.s6.name') as string, 
      icon: <Droplets size={32} />, 
      image: assetUrl('/img/new_fluid.jpg'),
      details: [t('wp.s6.d1') as string, t('wp.s6.d2') as string]
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
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const replayAnimation = () => {
    setKey(prev => prev + 1);
    setExpandedStep(null);
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="working-principle">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 sm:px-8 sm:py-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        
        <div className="text-center mb-2 sm:mb-4 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2 gap-2">
             <div>
               <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase block rtl:text-right text-left mb-1">
                06
               </span>
               <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 rtl:text-right text-left mb-1">
                {t('wp.title')}
               </h2>
               <p className="text-xs sm:text-sm text-gray-500 rtl:text-right text-left font-medium">{t('wp.subtitle')}</p>
             </div>
             
             <button 
               onClick={replayAnimation}
               className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 hover:bg-medical-blue hover:text-white text-medical-blue rounded-full transition-colors text-xs sm:text-sm font-semibold self-start sm:self-auto shadow-sm"
             >
               <Play size={14} className="rtl:rotate-180" /> {t('wp.play')}
             </button>
          </div>
        </div>

        {/* === MOBILE: Vertical Accordion (hidden on sm+) === */}
        <div className="sm:hidden w-full overflow-y-auto pb-6 pr-1" style={{ scrollbarWidth: 'none' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              className="flex flex-col gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <motion.div 
                    variants={itemVariants} 
                    className={`flex items-center gap-3 glass-card p-3 rounded-2xl cursor-pointer transition-all ${expandedStep === index ? 'ring-1 ring-medical-blue/30 bg-blue-50/10' : ''}`}
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                  >
                    <div className="w-7 h-7 rounded-full bg-medical-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 p-1">
                      <img src={step.image} alt={step.name} className="w-full h-full object-contain mix-blend-multiply opacity-90" />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="text-medical-blue">{React.cloneElement(step.icon as React.ReactElement, { size: 16 })}</div>
                      <span className="text-[11px] font-bold text-navy-800 leading-tight">{step.name}</span>
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${expandedStep === index ? 'rotate-180' : ''}`} />
                  </motion.div>
                  
                  <AnimatePresence>
                    {expandedStep === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-12 pl-3 py-2 border-l-2 border-medical-blue/20">
                          <ul className="list-disc text-[10px] font-semibold text-gray-600 space-y-1.5 pl-2">
                            {step.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === DESKTOP: Horizontal Scrollable Flowchart (hidden on mobile) === */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={key}
            className="hidden sm:flex flex-row items-center w-full gap-2 lg:gap-4 my-2 lg:my-6 overflow-x-auto snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div 
                  variants={itemVariants} 
                  className="flex flex-col items-center gap-4 group cursor-pointer snap-start flex-shrink-0"
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                >
                  <div className={`glass-card flex flex-col items-center justify-center p-3 w-32 h-32 lg:w-40 lg:h-40 rounded-3xl text-center relative overflow-hidden transition-all duration-300 ${expandedStep === index ? 'ring-2 ring-medical-blue shadow-lg scale-105 bg-white/60' : 'hover:-translate-y-2 hover:bg-white/40'}`}>
                     <div className={`absolute top-0 left-0 w-full h-1.5 bg-medical-blue transform origin-left transition-transform duration-300 ${expandedStep === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                     
                     <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-2 lg:mb-3 shadow-inner transform transition-all duration-300 ${expandedStep === index ? 'bg-medical-blue text-white scale-110' : 'bg-blue-50 text-medical-blue group-hover:scale-110'}`}>
                       {React.cloneElement(step.icon as React.ReactElement, { className: 'w-6 h-6 lg:w-8 lg:h-8' })}
                     </div>
                     
                     <span className="text-[10px] lg:text-xs font-bold text-navy-800 leading-tight px-1">
                       {step.name}
                     </span>

                     <div className="mt-1 lg:mt-2 text-gray-400">
                        <ChevronDown size={14} className={`transition-transform duration-300 ${expandedStep === index ? 'rotate-180 text-medical-blue' : ''}`} />
                     </div>
                  </div>
                  
                  {/* Real Image & Details Overlay */}
                  <div className="relative w-32 h-24 lg:w-40 lg:h-32 rounded-2xl overflow-hidden shadow-md border border-white/60 bg-white/80 transition-all duration-300 flex items-center justify-center p-2">
                    <img 
                      src={step.image} 
                      alt={step.name} 
                      className={`w-full h-full object-contain mix-blend-multiply transition-all duration-500 ${expandedStep === index ? 'opacity-10 blur-[2px] scale-110' : 'opacity-90 group-hover:scale-105 drop-shadow-sm'}`}
                    />
                    
                    <AnimatePresence>
                      {expandedStep === index && (
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          className="absolute inset-0 p-3 bg-white/50 backdrop-blur-md flex flex-col justify-center items-start text-left overflow-y-auto"
                        >
                          <ul className="list-disc pl-3 text-[9px] lg:text-[11px] text-navy-900 font-bold space-y-1.5 leading-tight">
                            {step.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div variants={arrowVariants} className="flex flex-shrink-0 mb-[7rem] lg:mb-[9rem]">
                    <ArrowRight className="text-medical-blue/30" size={24} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </SlideWrapper>
  );
};

export default WorkingPrincipleSection;
