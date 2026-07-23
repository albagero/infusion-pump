import React from 'react';
import { motion } from 'framer-motion';
import { Settings, CheckCircle2, Shield, Battery, ClipboardCheck, Eye, ArrowDown, CalendarDays } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { useLanguage } from '../i18n';

const MaintenanceChecklistSection = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const checklistGroups = [
    {
      title: t('mc.c1.title') as string,
      icon: <Eye size={16} className="text-blue-500" />,
      color: 'border-blue-200 bg-blue-50/30',
      items: [t('mc.c1.l1') as string, t('mc.c1.l2') as string, t('mc.c1.l3') as string]
    },
    {
      title: t('mc.c2.title') as string,
      icon: <Settings size={16} className="text-purple-500" />,
      color: 'border-purple-200 bg-purple-50/30',
      items: [t('mc.c2.l1') as string, t('mc.c2.l2') as string, t('mc.c2.l3') as string]
    },
    {
      title: t('mc.c3.title') as string,
      icon: <Battery size={16} className="text-amber-500" />,
      color: 'border-amber-200 bg-amber-50/30',
      items: [t('mc.c3.l1') as string, t('mc.c3.l2') as string, t('mc.c3.l3') as string]
    },
    {
      title: t('mc.c4.title') as string,
      icon: <ClipboardCheck size={16} className="text-green-500" />,
      color: 'border-green-200 bg-green-50/30',
      items: [t('mc.c4.l1') as string, t('mc.c4.l2') as string, t('mc.c4.l3') as string]
    }
  ];

  const workflowSteps = [
    t('mc.wf1'), t('mc.wf2'), t('mc.wf3'),
    t('mc.wf4'), t('mc.wf5'), t('mc.wf6'),
    t('mc.wf7'), t('mc.wf8')
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="maintenance-checklist">
      <div className="w-full h-full flex flex-col justify-start px-3 py-3 sm:px-6 sm:py-5 lg:px-10 max-w-[1400px] mx-auto overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        <div className="text-center mb-3 sm:mb-5 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-0.5 block">16</span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-navy-900">{t('mc.title')}</h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Left: Checklist (2/3 width on desktop) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-3 sm:p-5 h-full">
              <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
                <Shield size={18} className="text-medical-blue" /> {t('mc.chk')}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {checklistGroups.map((group, index) => (
                  <div key={index} className={`rounded-xl p-2.5 sm:p-3 border ${group.color}`}>
                    <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-gray-200/50">
                      {group.icon}
                      <h4 className="font-bold text-navy-900 text-xs sm:text-sm">{group.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-700 font-medium">
                          <CheckCircle2 size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Workflow + Schedule (1/3 width on desktop) */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            
            {/* Workflow */}
            <div className="glass-card rounded-2xl p-3 sm:p-4 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-3 flex items-center gap-2">
                <ClipboardCheck size={18} className="text-purple-500" /> {t('mc.wf')}
              </h3>
              <div className="flex flex-col items-center gap-0">
                {workflowSteps.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className={`w-full text-center px-3 py-1.5 rounded-lg border font-semibold text-[10px] sm:text-xs shadow-sm ${
                      index === workflowSteps.length - 1 
                        ? 'bg-medical-blue text-white border-blue-700' 
                        : index === 0 
                          ? 'bg-gray-100 text-gray-800 border-gray-200'
                          : 'bg-white text-gray-700 border-gray-200'
                    }`}>
                      {step}
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <ArrowDown size={10} className="text-gray-300 my-0.5" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="glass-card rounded-2xl p-3 sm:p-4 border-l-4 border-l-amber-400">
              <h4 className="text-xs sm:text-sm font-bold text-navy-900 mb-2 flex items-center gap-1.5">
                <CalendarDays size={14} className="text-amber-500" /> {t('mc.sch')}
              </h4>
              <div className="space-y-1.5 text-[10px] sm:text-xs">
                <div className="flex gap-2">
                  <span className="font-bold text-gray-800 w-24 flex-shrink-0">{t('mc.s1.t')}</span>
                  <span className="text-gray-600">{t('mc.s1.d')}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-gray-800 w-24 flex-shrink-0">{t('mc.s2.t')}</span>
                  <span className="text-gray-600">{t('mc.s2.d')}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-gray-800 w-24 flex-shrink-0">{t('mc.s3.t')}</span>
                  <span className="text-gray-600">{t('mc.s3.d')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default MaintenanceChecklistSection;
