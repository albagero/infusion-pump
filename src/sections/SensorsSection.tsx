import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Radio, DoorOpen, BatteryCharging, RotateCcw, AlertTriangle, ChevronDown } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { assetUrl } from '../utils/assetUrl';

const SensorsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sensors = [
    {
      name: 'Pressure Sensor',
      subtitle: 'Occlusion Detection',
      icon: <Gauge size={40} className="text-white" />,
      desc: 'Monitors pressure in the IV line to detect downstream or upstream occlusions and trigger an alarm.',
      failure: 'Risk of undetected blockage or wrong infusion rate',
      color: 'from-blue-500 to-medical-blue',
      accentColor: 'text-blue-600',
      bgAccent: 'bg-blue-50 border-blue-100',
      image: assetUrl('/img/sensor_pressure_1784074263751.png')
    },
    {
      name: 'Ultrasonic Air-in-Line Sensor',
      subtitle: 'Air Embolism Prevention',
      icon: <Radio size={40} className="text-white" />,
      desc: 'Uses ultrasonic waves to detect air bubbles in the IV tubing and stop infusion to prevent air embolism.',
      failure: 'Risk of air embolism — life threatening',
      color: 'from-cyan-400 to-cyan-600',
      accentColor: 'text-cyan-600',
      bgAccent: 'bg-cyan-50 border-cyan-100',
      image: assetUrl('/img/sensor_ultrasonic_1784074271813.png')
    },
    {
      name: 'Door Sensor',
      subtitle: 'Safety Interlock',
      icon: <DoorOpen size={40} className="text-white" />,
      desc: 'Ensures the pump door is securely closed before infusion begins. Prevents operation if the door is open.',
      failure: 'Pump may run without proper tubing alignment',
      color: 'from-amber-400 to-amber-600',
      accentColor: 'text-amber-600',
      bgAccent: 'bg-amber-50 border-amber-100',
      image: assetUrl('/img/sensor_door_1784074280324.png')
    },
    {
      name: 'Battery Sensor',
      subtitle: 'Power Management',
      icon: <BatteryCharging size={40} className="text-white" />,
      desc: 'Monitors battery voltage, charging status, and remaining charge. Triggers a low-battery alarm when needed.',
      failure: 'Unexpected power loss during critical infusion',
      color: 'from-green-400 to-green-600',
      accentColor: 'text-green-600',
      bgAccent: 'bg-green-50 border-green-100',
      image: assetUrl('/img/sensor_battery_1784074296460.png')
    },
    {
      name: 'Motor Encoder',
      subtitle: 'Motor Position Sensor',
      icon: <RotateCcw size={40} className="text-white" />,
      desc: 'Verifies motor rotation and delivery accuracy. Helps detect motor stalls or drive errors during operation.',
      failure: 'Inaccurate medication delivery or motor stall',
      color: 'from-purple-400 to-purple-600',
      accentColor: 'text-purple-600',
      bgAccent: 'bg-purple-50 border-purple-100',
      image: assetUrl('/img/sensor_encoder_1784074288006.png')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="sensors">
      <div className="w-full h-full flex flex-col justify-start px-4 py-4 sm:px-8 sm:py-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-3 sm:mb-5 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            06
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-1 sm:mb-2">
            Sensors in Infusion Pump
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Tap a sensor to see its failure effect</p>
        </div>

        {/* === MOBILE: Compact scrollable list === */}
        <div className="sm:hidden flex-1 overflow-y-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          <motion.div 
            className="flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {sensors.map((sensor, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className={`glass-card rounded-2xl p-3 relative overflow-hidden cursor-pointer transition-all duration-300 ${expandedIndex === index ? 'ring-1 ring-medical-blue/30 shadow-lg' : ''}`}
              >
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${sensor.color}`}></div>
                
                <div className="flex items-center gap-3">
                  {/* Image thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 shadow-sm">
                    <img src={sensor.image} alt={sensor.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Icon + text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${sensor.color} flex items-center justify-center flex-shrink-0`}>
                        {React.cloneElement(sensor.icon as React.ReactElement, { className: 'w-3.5 h-3.5 text-white' })}
                      </div>
                      <h3 className="text-sm font-bold text-navy-900 leading-tight">{sensor.name}</h3>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium leading-snug line-clamp-2">{sensor.desc}</p>
                  </div>
                  
                  <ChevronDown size={16} className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} />
                </div>

                {/* Expandable failure effect */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-3 p-3 rounded-xl ${sensor.bgAccent} border flex items-center gap-3`}>
                        <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
                        <div>
                          <span className="text-[11px] font-bold text-red-600 block">If sensor fails:</span>
                          <span className="text-[11px] font-semibold text-red-700">{sensor.failure}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* === DESKTOP: Grid layout === */}
        <motion.div 
          className="hidden sm:grid grid-cols-3 gap-4 lg:gap-5 mb-3 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* First row: 3 main sensors */}
          {sensors.slice(0, 3).map((sensor, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
              className="glass-card rounded-2xl p-3 lg:p-4 relative overflow-hidden flex flex-col items-center text-center group cursor-default transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${sensor.color} opacity-80`}></div>
              
              {/* Image */}
              <div className="w-full h-24 lg:h-28 mb-2 lg:mb-3 rounded-xl overflow-hidden shadow-inner bg-white border border-gray-100 flex items-center justify-center relative transform group-hover:scale-[1.03] transition-transform duration-500">
                <img src={sensor.image} alt={sensor.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 right-2 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br ${sensor.color} flex items-center justify-center shadow-md`}>
                   {React.cloneElement(sensor.icon as React.ReactElement, { className: 'w-4 h-4 text-white' })}
                </div>
              </div>

              <h3 className="text-sm lg:text-base font-bold text-navy-900 mb-0.5 leading-tight">{sensor.name}</h3>
              <span className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-wider ${sensor.accentColor} mb-1.5`}>{sensor.subtitle}</span>
              <p className="text-gray-600 font-medium text-[10px] lg:text-xs leading-snug">{sensor.desc}</p>

              {/* Hover failure effect */}
              <div className={`w-full rounded-lg overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="bg-red-50 p-2.5 border border-red-100 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-red-600 block">If sensor fails:</span>
                    <span className="text-red-700 text-[10px] font-semibold">{sensor.failure}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second row: 2 optional sensors centered */}
        <motion.div 
          className="hidden sm:grid grid-cols-2 gap-4 lg:gap-5 max-w-2xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {sensors.slice(3).map((sensor, index) => (
            <motion.div
              key={index + 3}
              variants={itemVariants}
              onMouseEnter={() => setExpandedIndex(index + 3)}
              onMouseLeave={() => setExpandedIndex(null)}
              className="glass-card rounded-2xl p-3 lg:p-4 relative overflow-hidden flex flex-col items-center text-center group cursor-default transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${sensor.color} opacity-80`}></div>
              
              {/* Image */}
              <div className="w-full h-20 lg:h-24 mb-2 rounded-xl overflow-hidden shadow-inner bg-white border border-gray-100 flex items-center justify-center relative transform group-hover:scale-[1.03] transition-transform duration-500">
                <img src={sensor.image} alt={sensor.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br ${sensor.color} flex items-center justify-center shadow-md`}>
                   {React.cloneElement(sensor.icon as React.ReactElement, { className: 'w-4 h-4 text-white' })}
                </div>
              </div>

              <h3 className="text-sm lg:text-base font-bold text-navy-900 mb-0.5 leading-tight">{sensor.name}</h3>
              <span className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-wider ${sensor.accentColor} mb-1.5`}>{sensor.subtitle}</span>
              <p className="text-gray-600 font-medium text-[10px] lg:text-xs leading-snug">{sensor.desc}</p>

              {/* Hover failure effect */}
              <div className={`w-full rounded-lg overflow-hidden transition-all duration-300 ${expandedIndex === index + 3 ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="bg-red-50 p-2.5 border border-red-100 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-red-600 block">If sensor fails:</span>
                    <span className="text-red-700 text-[10px] font-semibold">{sensor.failure}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </SlideWrapper>
  );
};

export default SensorsSection;
