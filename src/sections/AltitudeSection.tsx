import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Wind, CheckCircle, AlertTriangle, Mountain } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const AltitudeSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="altitude">
      <div className="w-full h-full flex flex-col justify-start px-3 py-4 sm:px-6 sm:py-6 lg:px-10 max-w-[1400px] mx-auto overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            15
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2">
            Altitude & Atmospheric Pressure
          </h2>
        </div>

        {/* Top Part - Altitude Effect */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Left Column: Scientific Principle */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-4 sm:p-5 border-l-4 border-l-purple-500 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-3 flex items-center gap-2">
                <Mountain className="text-purple-500" size={24} /> Scientific Principle
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 flex flex-col items-center justify-center flex-1">
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider mb-1">Boyle's Law</span>
                  <div className="text-xl sm:text-2xl font-serif italic font-bold text-purple-700 bg-white px-4 py-1.5 rounded-lg shadow-sm">
                    P₁V₁ = P₂V₂
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-gray-700">When pressure decreases,</p>
                  <p className="text-lg font-bold text-purple-600">Gas volume increases.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col gap-1.5 relative z-10 text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Plane size={16} className="text-blue-400" /> Commercial Aircraft / High Altitude
                  </div>
                  <div className="pl-6 border-l-2 border-dashed border-gray-300 ml-2 py-0.5 text-gray-400">&darr;</div>
                  <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-2 py-1 rounded">
                    <Wind size={16} /> Lower atmospheric pressure
                  </div>
                  <div className="pl-6 border-l-2 border-dashed border-gray-300 ml-2 py-0.5 text-gray-400">&darr;</div>
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    <span className="w-4 h-4 rounded-full border-2 border-amber-400 border-dotted flex items-center justify-center text-[8px]">O</span> Tiny air bubbles expand
                  </div>
                  <div className="pl-6 border-l-2 border-dashed border-gray-300 ml-2 py-0.5 text-gray-400">&darr;</div>
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 px-2 py-1 rounded">
                    <AlertTriangle size={16} /> Fluid pushed forward (Unintended Bolus)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Solutions & Clinical Importance */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            
            <div className="glass-card rounded-2xl p-4 sm:p-5 border-l-4 border-l-green-500 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-3 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} /> Biomedical Engineering Solution
              </h3>
              <ul className="space-y-2 text-sm font-medium text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Proper priming and air removal (degassing)</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Ultrasonic Air-in-Line Detection</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Pressure-resistant syringe mechanisms</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Manufacturer air transport protocols</li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <h4 className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest mb-2">Clinical Importance</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Plane size={14} /> Air Ambulances</span>
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Plane size={14} /> Helicopters</span>
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Plane size={14} /> Commercial Flights</span>
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Mountain size={14} /> High-altitude hospitals</span>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* Bottom Part - Summary Table */}
        <motion.div 
          className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/60 w-full mb-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          <div className="bg-navy-900 px-4 py-3">
            <h3 className="text-lg font-bold text-white text-center">Summary of Environmental Factors</h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Factor</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Scientific Principle</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Possible Effect</th>
                  <th className="px-6 py-3 text-xs font-bold text-medical-blue uppercase tracking-wider bg-blue-50/50">Biomedical Engineering Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-amber-600 font-bold">Fluid Color</td>
                  <td className="px-6 py-4 text-gray-700">Optical absorption</td>
                  <td className="px-6 py-4 text-red-500">Optical sensor errors</td>
                  <td className="px-6 py-4 text-green-700 bg-green-50/30">Ultrasonic sensing and motor-controlled delivery</td>
                </tr>
                <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-bold">Pump Height</td>
                  <td className="px-6 py-4 text-gray-700">Hydrostatic pressure</td>
                  <td className="px-6 py-4 text-red-500">Free flow, siphoning</td>
                  <td className="px-6 py-4 text-green-700 bg-green-50/30">Anti-Free-Flow valve (AFF) and correct pump positioning</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-purple-600 font-bold">Altitude</td>
                  <td className="px-6 py-4 text-gray-700">Boyle's Law</td>
                  <td className="px-6 py-4 text-red-500">Bubble expansion and unintended bolus</td>
                  <td className="px-6 py-4 text-green-700 bg-green-50/30">Proper priming, air removal, transport procedures</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout for Table */}
          <div className="sm:hidden flex flex-col p-2 gap-2 bg-gray-50">
            {/* Factor 1 */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-amber-600">Fluid Color</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">Optical absorption</span>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-gray-500">Effect:</span> <span className="text-red-500 font-medium">Optical sensor errors</span></p>
                <p><span className="font-semibold text-gray-500">Solution:</span> <span className="text-green-600 font-medium">Ultrasonic sensing & motor control</span></p>
              </div>
            </div>
            
            {/* Factor 2 */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-blue-600">Pump Height</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">Hydrostatic pressure</span>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-gray-500">Effect:</span> <span className="text-red-500 font-medium">Free flow, siphoning</span></p>
                <p><span className="font-semibold text-gray-500">Solution:</span> <span className="text-green-600 font-medium">Anti-Free-Flow valve (AFF)</span></p>
              </div>
            </div>

            {/* Factor 3 */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-purple-600">Altitude</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">Boyle's Law</span>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-gray-500">Effect:</span> <span className="text-red-500 font-medium">Bubble expansion, bolus</span></p>
                <p><span className="font-semibold text-gray-500">Solution:</span> <span className="text-green-600 font-medium">Proper priming, air removal</span></p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </SlideWrapper>
  );
};

export default AltitudeSection;
