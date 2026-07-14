import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Wrench, CheckCircle2, Ban, Wind, BatteryWarning, DoorOpen } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';

const PumpAlarmVisualizer = ({ type }: { type: string }) => {
  const getOverlay = () => {
    switch (type) {
      case 'occlusion':
        return (
          <div className="absolute inset-0 bg-red-900/40 flex flex-col items-center justify-center p-2">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              <Ban size={48} className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] mb-1" />
            </motion.div>
            <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider animate-pulse">
              Blockage
            </div>
          </div>
        );
      case 'air':
        return (
          <div className="absolute inset-0 bg-cyan-900/40 flex flex-col items-center justify-center p-2">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8 }}>
              <Wind size={48} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] mb-1" />
            </motion.div>
            <div className="bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider animate-pulse">
              Air In Line
            </div>
          </div>
        );
      case 'battery':
        return (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-2 backdrop-blur-[1px]">
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <BatteryWarning size={56} className="text-red-600 drop-shadow-[0_0_12px_rgba(220,38,38,1)] mb-1" />
            </motion.div>
            <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Critically Low
            </div>
          </div>
        );
      case 'door':
        return (
          <div className="absolute inset-0 bg-yellow-900/30 flex flex-col items-center justify-center p-2">
            {/* Striped border effect */}
            <div className="absolute inset-0 border-[6px] border-dashed border-yellow-500/60 opacity-80 rounded-xl pointer-events-none"></div>
            <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 0.5 }}>
              <DoorOpen size={48} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] mb-1" />
            </motion.div>
            <div className="bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-wider animate-pulse">
              Door Open
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full bg-navy-900 rounded-xl overflow-hidden shadow-inner">
      {/* Base Pump Image */}
      <img src={assetUrl('/img/iv-pump-5442523.jpg')} alt="Infusion Pump" className="w-full h-full object-cover opacity-80" />
      {/* Alarm Overlay */}
      {getOverlay()}
    </div>
  );
};

const SafetySection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    'Occlusion Alarm',
    'Air Bubble Alarm',
    'Low Battery Alarm',
    'Door Open Alarm'
  ];

  const content = [
    {
      type: 'occlusion',
      description: 'Detects blockage in the tubing or high pressure and stops the infusion to ensure patient safety.',
      causes: ['Kinked IV tubing', 'Closed clamp', 'Blocked catheter', 'Faulty pressure sensor'],
      action: ['Inspect tubing', 'Remove obstruction', 'Test pressure sensor']
    },
    {
      type: 'air',
      description: 'Detects air bubbles in IV line to prevent air embolism.',
      causes: ['Air in tubing', 'Improper priming', 'Dirty optical sensor'],
      action: ['Re-prime tubing', 'Clean sensor', 'Replace IV set']
    },
    {
      type: 'battery',
      description: 'Alerts when battery is low to prevent unexpected shutdown during transport or power failure.',
      causes: ['Prolonged use on battery', 'Aged battery cells', 'Charging circuit fault'],
      action: ['Inspect battery health', 'Check charging circuit', 'Replace aged batteries']
    },
    {
      type: 'door',
      description: 'Ensures pump door is securely closed before operation.',
      causes: ['Improper tubing loading', 'Damaged latch mechanism', 'User error'],
      action: ['Close door securely', 'Check for tubing pinch', 'Inspect latch assembly']
    }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="safety">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-5xl mx-auto overflow-hidden">
        <div className="text-center mb-4 sm:mb-6">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">
            08
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900">
            Safety Features
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 tab-button ${activeTab === index ? 'active' : ''}`}
            >
              {activeTab === index && <div className="pulse-dot mr-1"></div>}
              {tab}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="glass-card rounded-2xl overflow-hidden shadow-xl min-h-[300px] relative border border-white/50 bg-white/70">
          {/* Top colored accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-accent-red via-orange-400 to-accent-red"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-4 md:p-5"
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-4 pb-4 border-b border-gray-100 items-center sm:items-start">
                
                <div className="flex-1 flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 text-accent-red flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-navy-900 mb-1 sm:mb-2">{tabs[activeTab]}</h3>
                    <p className="text-sm sm:text-lg text-gray-600">{content[activeTab].description}</p>
                  </div>
                </div>

                <div className="hidden sm:block w-full sm:w-1/3 lg:w-1/4 h-28 sm:h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-gray-100 border border-gray-200">
                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <PumpAlarmVisualizer type={content[activeTab].type} />
                  </motion.div>
                </div>
                
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Causes */}
                <div className="bg-orange-50/50 p-3 sm:p-4 rounded-xl border border-orange-100">
                  <h4 className="flex items-center gap-2 font-bold text-orange-800 mb-2 sm:mb-3 text-sm sm:text-base">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5" /> Potential Causes
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {content[activeTab].causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium text-xs sm:text-sm">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corrective Action */}
                <div className="bg-blue-50/50 p-3 sm:p-4 rounded-xl border border-blue-100">
                  <h4 className="flex items-center gap-2 font-bold text-medical-blue mb-2 sm:mb-3 text-sm sm:text-base">
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5" /> Corrective Action
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {content[activeTab].action.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded border border-medical-blue/30 flex items-center justify-center flex-shrink-0 text-medical-blue mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <span className="text-gray-700 font-medium text-xs sm:text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
};

export default SafetySection;
