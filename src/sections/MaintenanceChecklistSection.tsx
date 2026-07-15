import React from 'react';
import { motion } from 'framer-motion';
import { Settings, CheckCircle2, Shield, Battery, ClipboardCheck, Eye } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const MaintenanceChecklistSection = () => {
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

  const checklistGroups = [
    {
      title: 'Visual Inspection',
      icon: <Eye size={20} className="text-blue-500" />,
      color: 'border-blue-200 bg-blue-50/30',
      items: [
        'Check housing for cracks or damage.',
        'Inspect AC power cord and connectors.',
        'Verify IV tubing holder and pump door.'
      ]
    },
    {
      title: 'Functional Tests',
      icon: <Settings size={20} className="text-purple-500" />,
      color: 'border-purple-200 bg-purple-50/30',
      items: [
        'Verify flow-rate accuracy.',
        'Test occlusion alarm.',
        'Test air-in-line (ultrasonic) sensor.',
        'Test door-open and low-battery alarms.'
      ]
    },
    {
      title: 'Electrical & Battery',
      icon: <Battery size={20} className="text-amber-500" />,
      color: 'border-amber-200 bg-amber-50/30',
      items: [
        'Check battery charging and runtime.',
        'Perform electrical safety testing.',
        'Verify display, keypad, and buzzer.'
      ]
    },
    {
      title: 'Documentation',
      icon: <ClipboardCheck size={20} className="text-green-500" />,
      color: 'border-green-200 bg-green-50/30',
      items: [
        'Record all test results.',
        'Replace worn parts if needed.',
        'Attach PM label and update records.'
      ]
    }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="maintenance-checklist">
      <div className="w-full h-full flex flex-col justify-start px-4 py-4 sm:px-8 sm:py-6 lg:px-12 max-w-[1400px] mx-auto overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        <div className="text-center mb-6 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            16
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2">
            Preventive Maintenance
          </h2>
        </div>

        <motion.div 
          className="flex flex-col lg:flex-row gap-6 mb-6 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Left: Objectives */}
          <motion.div variants={itemVariants} className="lg:w-1/3 flex flex-col gap-4">
            <div className="glass-card rounded-2xl p-5 sm:p-6 border-l-4 border-l-medical-blue flex-1 bg-gradient-to-br from-white to-blue-50/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Shield size={20} />
                </div>
                <h3 className="text-xl font-bold text-navy-900">Objectives</h3>
              </div>
              
              <ul className="space-y-4">
                {[
                  'Ensure accurate drug delivery.',
                  'Improve patient safety.',
                  'Prevent unexpected failures.',
                  'Extend device lifespan.',
                  'Comply with manufacturer and hospital standards.'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-medical-blue flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs sm:text-sm text-blue-800 font-semibold italic text-center">
                  "Preventive maintenance is one of the most important responsibilities of a biomedical engineer."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Checklist Grid */}
          <motion.div variants={itemVariants} className="lg:w-2/3 glass-card rounded-2xl p-5 sm:p-6">
            <h3 className="text-xl font-bold text-navy-900 mb-6 text-center lg:text-left">Preventive Maintenance Checklist</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {checklistGroups.map((group, index) => (
                <div key={index} className={`rounded-xl p-4 border ${group.color} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/50">
                    {group.icon}
                    <h4 className="font-bold text-navy-900">{group.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                        <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default MaintenanceChecklistSection;
