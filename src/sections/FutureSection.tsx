import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Wifi, Database, TrendingUp, Smartphone } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const FutureSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const trends = [
    { name: 'AI-Assisted Monitoring', icon: <BrainCircuit size={24} />, desc: 'Predictive analytics for flow optimization' },
    { name: 'IoT Connectivity', icon: <Wifi size={24} />, desc: 'Real-time wireless fleet management' },
    { name: 'Electronic Health Integration', icon: <Database size={24} />, desc: 'Auto-programming from EMR systems' },
    { name: 'Predictive Maintenance', icon: <TrendingUp size={24} />, desc: 'Alerts before components fail' },
    { name: 'Remote Control & Alerts', icon: <Smartphone size={24} />, desc: 'Monitor infusions from mobile devices' }
  ];

  return (
    <SlideWrapper className="bg-future-gradient" id="future">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Subtle grid background */}
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-medical-cyan/30 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-medical-blue/40 rounded-full blur-[80px] z-0"></div>

      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-7xl mx-auto relative z-10 overflow-hidden">
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-medical-cyan/70 text-sm font-bold tracking-widest uppercase mb-2 sm:mb-4 block">
              14
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 lg:mb-10 leading-tight">
              The Future of<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-cyan to-blue-400">Infusion Pumps</span>
            </h2>

            <motion.div 
              className="space-y-2 sm:space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              {trends.map((trend, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="glass-card-dark flex items-center p-3 lg:p-4 rounded-xl border border-white/10 hover:border-medical-cyan/50 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-medical-blue/20 text-medical-cyan flex items-center justify-center mr-3 sm:mr-5 shadow-inner flex-shrink-0">
                    {React.cloneElement(trend.icon as React.ReactElement, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5 sm:mb-1">{trend.name}</h3>
                    <p className="text-xs sm:text-sm text-blue-200/70">{trend.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content */}
          <motion.div 
            className="hidden md:flex justify-center items-center h-full relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
             <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                {/* Orbital rings */}
                <motion.div 
                  className="absolute inset-0 border border-medical-cyan/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-4 border border-blue-400/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-tr from-medical-blue to-medical-cyan rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
                  <Wifi size={64} className="text-white absolute z-10" />
                </div>
             </div>
          </motion.div>
        </div>

      </div>
    </SlideWrapper>
  );
};

export default FutureSection;
