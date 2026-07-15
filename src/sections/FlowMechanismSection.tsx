import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowDownToLine, ArrowRight, CheckCircle } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';

const FlowMechanismSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const steps = [
    { text: 'Rollers rotate', icon: <RotateCcw size={20} />, color: 'blue' },
    { text: 'Tube is compressed', icon: <ArrowDownToLine size={20} />, color: 'blue' },
    { text: 'Fluid is pushed forward', icon: <ArrowRight size={20} />, color: 'blue' },
    { text: 'Accurate flow is maintained', icon: <CheckCircle size={20} />, color: 'green' }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="flow-mechanism">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-8 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 md:gap-16 items-center">
          
          {/* Left Content - Vertical Flow */}
          <div>
            <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">
              07
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-3 sm:mb-12">
              Flow Mechanism
            </h2>

            <motion.div 
              className="relative pl-6 sm:pl-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              {/* Vertical Line */}
              <div className="absolute left-[31px] sm:left-[39px] top-4 bottom-4 w-0.5 bg-gray-200">
                 <motion.div 
                   className="w-full bg-medical-blue"
                   initial={{ height: 0 }}
                   whileInView={{ height: '100%' }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                   viewport={{ once: false }}
                 />
              </div>

              <div className="space-y-3 sm:space-y-12">
                {steps.map((step, index) => (
                  <motion.div key={index} variants={itemVariants} className="relative flex items-center gap-3 sm:gap-6">
                    {/* Dot */}
                    <div className={`absolute -left-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-white shadow-sm z-10 ${step.color === 'green' ? 'bg-accent-green' : 'bg-medical-blue'}`}></div>
                    
                    <div className="glass-card flex items-center gap-3 sm:gap-4 px-3 py-2 sm:px-6 sm:py-4 rounded-xl shadow-sm w-full">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${step.color === 'green' ? 'bg-green-50 text-accent-green' : 'bg-blue-50 text-medical-blue'}`}>
                        {React.cloneElement(step.icon as React.ReactElement, { className: 'w-4 h-4 sm:w-5 sm:h-5' })}
                      </div>
                      <span className="font-semibold text-navy-800 text-xs sm:text-base lg:text-lg">{step.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div 
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="glass-card p-4 rounded-3xl shadow-xl border border-white/50 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src={assetUrl('/img/flow_mechanism.png')} 
                alt="IV Pump Mechanism" 
                className="w-full h-auto rounded-2xl shadow-inner"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </SlideWrapper>
  );
};

export default FlowMechanismSection;
