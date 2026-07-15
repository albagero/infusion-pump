import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const PumpHeightSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="pump-height">
      <div className="w-full h-full flex flex-col justify-start px-4 py-4 sm:px-8 sm:py-6 lg:px-16 max-w-7xl mx-auto overflow-y-auto">
        
        <div className="text-center mb-6 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            14
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2">
            Pump Height & Hydrostatic Pressure
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Left Section - Scientific Principle */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            
            <div className="glass-card rounded-2xl p-5 sm:p-6 border-l-4 border-l-medical-blue flex-1">
              <h3 className="text-xl font-bold text-navy-900 mb-4">Scientific Principle</h3>
              
              <div className="bg-blue-50/50 rounded-xl p-4 mb-4 border border-blue-100 flex flex-col items-center">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Hydrostatic Pressure</span>
                <div className="text-3xl sm:text-4xl font-serif italic font-bold text-medical-blue bg-white px-6 py-2 rounded-lg shadow-sm">
                  P = &rho;gh
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-serif italic font-bold text-medical-blue w-4">P</span>
                  <span className="text-gray-700">= Pressure</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-serif italic font-bold text-medical-blue w-4">&rho;</span>
                  <span className="text-gray-700">= Fluid Density</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-serif italic font-bold text-medical-blue w-4">g</span>
                  <span className="text-gray-700">= Gravity</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-serif italic font-bold text-medical-blue w-4">h</span>
                  <span className="text-gray-700">= Height</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center">
                <div className="w-full flex justify-between items-center px-4 mb-2">
                  <div className="flex flex-col items-center">
                    <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-bold text-sm shadow-sm border border-blue-200">Higher IV Bag</div>
                    <ArrowDown size={20} className="text-blue-400 my-1" />
                    <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-bold text-sm shadow-sm border border-gray-200">Pump</div>
                    <ArrowDown size={20} className="text-blue-400 my-1" />
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-sm shadow-sm border border-green-200">Patient</div>
                  </div>
                  <div className="hidden sm:flex flex-col gap-2 pl-4 border-l border-gray-200 text-sm font-semibold text-gray-600">
                    <span className="text-blue-600">Higher height</span>
                    <span className="text-gray-400">&darr;</span>
                    <span className="text-blue-700">Higher hydrostatic pressure</span>
                    <span className="text-gray-400">&darr;</span>
                    <span className="text-blue-800">Greater force pushing fluid</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-5 border-l-4 border-l-red-400">
              <h4 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> Potential Problems
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-100">Free Flow</span>
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-100">Siphoning</span>
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-100">Inaccurate infusion</span>
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-100">Occlusion pressure changes</span>
              </div>
            </div>

          </motion.div>

          {/* Right Section - Engineering Solution */}
          <motion.div variants={itemVariants} className="flex flex-col h-full">
            <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-center items-center text-center border-2 border-green-100 bg-gradient-to-b from-white to-green-50/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity"></div>
              
              <div className="w-20 h-20 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6 shadow-inner transform group-hover:scale-110 transition-transform duration-500">
                <Shield size={40} />
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Biomedical Engineering Solution</h3>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-6 leading-tight">
                Anti-Free-Flow <br/> Valve (AFF)
              </h2>

              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed max-w-md mx-auto mb-8">
                The valve <strong className="text-green-700">automatically closes</strong> when the pump door is opened, completely preventing uncontrolled gravity-driven flow to the patient.
              </p>

              <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md border border-green-100">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-sm font-bold text-navy-800">Critical Safety Mechanism</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default PumpHeightSection;
