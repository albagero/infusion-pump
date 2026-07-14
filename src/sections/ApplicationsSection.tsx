import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Baby, Microscope, Stethoscope } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const ApplicationsSection = () => {
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

  const applications = [
    {
      dept: 'ICU',
      desc: 'Vasopressors & continuous medication delivery',
      icon: <HeartPulse size={28} />,
      color: 'bg-red-50 text-red-500 border-red-500'
    },
    {
      dept: 'NICU',
      desc: 'Extremely precise & accurate delivery',
      icon: <Baby size={28} />,
      color: 'bg-pink-50 text-pink-500 border-pink-500'
    },
    {
      dept: 'Oncology',
      desc: 'Chemotherapy drug administration',
      icon: <Microscope size={28} />,
      color: 'bg-purple-50 text-purple-500 border-purple-500'
    },
    {
      dept: 'Operating Room',
      desc: 'Anesthesia & surgery support',
      icon: <Stethoscope size={28} />,
      color: 'bg-blue-50 text-blue-500 border-blue-500'
    }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="applications">
      <div className="w-full h-full flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-20 max-w-7xl mx-auto overflow-hidden">
        
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-6 sm:mb-12">
              <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">
                13
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2 sm:mb-4">
                Applications
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                Used in various hospital departments for different patient needs
              </p>
            </div>

            <motion.div 
              className="space-y-3 sm:space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              {applications.map((app, index) => (
                <motion.div key={index} variants={itemVariants} className="glass-card flex items-center p-3 sm:p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-default">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 ${app.color.split(' ')[2]}`}></div>
                  
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mr-3 sm:mr-6 ${app.color.split(' ')[0]} ${app.color.split(' ')[1]}`}>
                    {React.cloneElement(app.icon as React.ReactElement, { className: 'w-5 h-5 sm:w-7 sm:h-7' })}
                  </div>
                  
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-navy-900 mb-0.5 sm:mb-1">{app.dept}</h3>
                    <p className="text-gray-600 font-medium text-xs sm:text-base">{app.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content */}
          <motion.div 
            className="hidden lg:block relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <div className="absolute inset-0 bg-medical-blue/10 mix-blend-multiply z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent z-20"></div>
            <img 
              src="/img/in_the_hospital_iv_pole_infusion_and_fluids_bags_cardiovascular.jpg" 
              alt="Hospital Applications" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

      </div>
    </SlideWrapper>
  );
};

export default ApplicationsSection;
