import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, CircleDot, Waves, AlertTriangle } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const SensorsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sensors = [
    {
      name: 'Pressure Sensor',
      icon: <Gauge size={40} className="text-white" />,
      desc: 'Detects pressure changes and occlusion',
      failure: 'Risk of wrong infusion or undetected blockage',
      color: 'from-blue-500 to-medical-blue',
      bgColor: 'bg-blue-50',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Digital%20Pressure%20Sensor.jpg'
    },
    {
      name: 'Air Bubble Sensor',
      icon: <CircleDot size={40} className="text-white" />,
      desc: 'Detects air bubbles to prevent air embolism',
      failure: 'Risk of air embolism - life threatening',
      color: 'from-cyan-400 to-cyan-600',
      bgColor: 'bg-cyan-50',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Senix%20ToughSonic%2014%20Ultrasonic%20Sensor.jpg'
    },
    {
      name: 'Flow Sensor',
      icon: <Waves size={40} className="text-white" />,
      desc: 'Monitors flow rate to ensure accurate delivery',
      failure: 'Inaccurate medication delivery',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mass-airflow.jpg'
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <SlideWrapper className="bg-section-gradient" id="sensors">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-4 sm:mb-8">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">
            11
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2 sm:mb-4">
            Sensors in Infusion Pump
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {sensors.map((sensor, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass-card rounded-2xl p-3 sm:p-4 relative overflow-hidden flex flex-col items-center text-center group cursor-default transition-all duration-300 hover:shadow-2xl"
            >
              {/* Background gradient hint */}
              <div className={`absolute top-0 inset-x-0 h-32 opacity-10 bg-gradient-to-b ${sensor.color} transition-opacity duration-300 group-hover:opacity-20`}></div>

              {/* Real Sensor Image */}
              <div className="w-full h-24 sm:h-28 mb-2 sm:mb-3 rounded-xl overflow-hidden shadow-inner bg-white border border-gray-100 flex items-center justify-center relative transform group-hover:scale-105 transition-transform duration-500 z-10">
                <img src={sensor.image} alt={sensor.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${sensor.color} flex items-center justify-center shadow-md`}>
                   {React.cloneElement(sensor.icon as React.ReactElement, { className: 'w-4 h-4 sm:w-5 sm:h-5 text-white' })}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-1 sm:mb-2 z-10">{sensor.name}</h3>
              <p className="text-gray-600 font-medium mb-2 sm:mb-3 text-xs sm:text-sm z-10">{sensor.desc}</p>

              {/* Expandable Failure Effect */}
              <div 
                className={`w-full rounded-xl overflow-hidden transition-all duration-300 ${hoveredIndex === index ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
              >
                <div className="bg-red-50 p-4 border border-red-100 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 text-red-600 font-bold text-sm">
                    <AlertTriangle size={16} /> Failure Effect
                  </div>
                  <span className="text-red-700 text-sm font-semibold">{sensor.failure}</span>
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
