import React from 'react';
import { motion } from 'framer-motion';
import { Eye, AlertTriangle, CheckCircle, Droplets } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const FluidColorSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="fluid-color">
      <div className="w-full h-full flex flex-col justify-start px-4 py-4 sm:px-8 sm:py-6 lg:px-12 max-w-[1400px] mx-auto overflow-y-auto">
        
        <div className="text-center mb-6 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            13
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2">
            Fluid Color & Optical Sensors
          </h2>
          <h3 className="text-lg sm:text-xl text-amber-500 font-semibold">
            Why Fluid Color Matters
          </h3>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Section 1 - The Problem */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col border-t-4 border-t-amber-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Eye size={20} />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Scientific Principle</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Older pumps used <strong>infrared optical sensors</strong> to count drops in the drip chamber.
            </p>

            <div className="bg-white/50 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-100 flex-1 mb-4">
              <div className="text-xs font-mono font-bold text-gray-500 mb-2">Optical Drop Counting</div>
              <div className="flex flex-col items-center space-y-1">
                <div className="px-3 py-1 bg-gray-800 text-white rounded text-[10px] font-bold">IR LED</div>
                <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                <div className="text-amber-500"><Droplets size={24} /></div>
                <div className="h-4 border-l-2 border-dashed border-gray-400"></div>
                <div className="px-3 py-1 bg-gray-800 text-white rounded text-[10px] font-bold">Photo Detector</div>
              </div>
            </div>

            <p className="text-sm text-gray-600 font-medium">
              <strong className="text-amber-600">The Flaw:</strong> Dark or opaque fluids may absorb or scatter infrared light, preventing the detector from "seeing" the drop.
            </p>
          </motion.div>

          {/* Section 2 - Affected Fluids */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col border-t-4 border-t-red-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Problem Fluids</h3>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-600 shadow-sm"></span>
                <span className="text-sm font-semibold text-gray-700">Whole Blood</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
                <span className="text-sm font-semibold text-gray-700">Packed RBC</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-yellow-300 shadow-sm"></span>
                <span className="text-sm font-semibold text-gray-700">Lipid Emulsions (TPN)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm"></span>
                <span className="text-sm font-semibold text-gray-700">Some Chemotherapy Drugs</span>
              </li>
            </ul>

            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">Possible Consequences</h4>
              <ul className="list-disc pl-4 text-sm text-red-600 font-medium space-y-1">
                <li>Incorrect drop counting</li>
                <li>False "Empty Bag" alarm</li>
                <li>Flow monitoring errors</li>
              </ul>
            </div>
          </motion.div>

          {/* Section 3 - The Solution */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col border-t-4 border-t-green-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle size={20} />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Engineering Solution</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-5 font-medium">
              To eliminate these risks, modern biomedical engineering incorporates advanced technologies:
            </p>

            <ul className="space-y-4 mb-6 flex-1">
              <li className="flex items-start gap-3 bg-white/50 p-3 rounded-lg border border-green-50">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-gray-700">Ultrasonic Air-in-Line Sensors</span>
              </li>
              <li className="flex items-start gap-3 bg-white/50 p-3 rounded-lg border border-green-50">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-gray-700">Stepper Motor Control</span>
              </li>
              <li className="flex items-start gap-3 bg-white/50 p-3 rounded-lg border border-green-50">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-gray-700">Pressure Sensors</span>
              </li>
            </ul>

            <div className="bg-green-500 rounded-xl p-4 text-white text-center shadow-md">
              <p className="text-sm font-bold">
                Modern volumetric pumps no longer rely on optical drop counting, ensuring safe delivery of any fluid.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default FluidColorSection;
