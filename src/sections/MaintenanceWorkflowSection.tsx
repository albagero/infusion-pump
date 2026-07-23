import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, CalendarDays, ClipboardList, PenTool, CheckCircle2 } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { useLanguage } from '../i18n';

const MaintenanceWorkflowSection = () => {
  const { t } = useLanguage();
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

  const workflowSteps = [
    { label: t('mw.w1'), bg: 'bg-gray-100 text-gray-800 border-gray-200' },
    { label: t('mw.w2'), bg: 'bg-blue-50 text-blue-800 border-blue-200' },
    { label: t('mw.w3'), bg: 'bg-blue-50 text-blue-800 border-blue-200' },
    { label: t('mw.w4'), bg: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { label: t('mw.w5'), bg: 'bg-purple-50 text-purple-800 border-purple-200' },
    { label: t('mw.w6'), bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    { label: t('mw.w7'), bg: 'bg-green-50 text-green-800 border-green-200' },
    { label: t('mw.w8'), bg: 'bg-medical-blue text-white border-blue-700 shadow-md' }
  ];

  return (
    <SlideWrapper className="bg-section-gradient" id="maintenance-workflow">
      <div className="w-full h-full flex flex-col justify-start px-4 py-4 sm:px-8 sm:py-6 lg:px-12 max-w-[1400px] mx-auto overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        <div className="text-center mb-6 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            17
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2">
            {t('mw.title')}
          </h2>
        </div>

        <motion.div 
          className="flex flex-col lg:flex-row gap-6 mb-6 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Left: Workflow Flowchart */}
          <motion.div variants={itemVariants} className="lg:w-1/2 glass-card rounded-2xl p-5 sm:p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <ClipboardList className="text-medical-blue" />
              {t('mw.sub1')}
            </h3>
            
            <div className="flex flex-col items-center w-full max-w-sm relative">
              {workflowSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className={`w-full text-center px-4 py-2.5 rounded-xl border font-semibold text-sm shadow-sm whitespace-pre-line z-10 ${step.bg}`}>
                    {step.label}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="h-6 flex flex-col items-center justify-center -my-1 z-0">
                      <div className="h-full border-l-2 border-dashed border-gray-400"></div>
                      <ArrowDown size={14} className="text-gray-400 -mt-2" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Right: Schedule Table & Notes */}
          <motion.div variants={itemVariants} className="lg:w-1/2 flex flex-col gap-6">
            
            <div className="glass-card rounded-2xl p-5 sm:p-6 border-l-4 border-l-purple-500 flex-1">
              <h3 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <CalendarDays className="text-purple-500" />
                {t('mw.sub2')}
              </h3>
              
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-purple-50 border-b border-purple-100">
                      <th className="px-4 py-3 text-xs font-bold text-purple-800 uppercase tracking-wider w-1/3">{t('mw.th1')}</th>
                      <th className="px-4 py-3 text-xs font-bold text-purple-800 uppercase tracking-wider">{t('mw.th2')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-800">{t('mw.r1.c1')}</td>
                      <td className="px-4 py-3 text-gray-600 font-medium">{t('mw.r1.c2')}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-800">{t('mw.r2.c1')}</td>
                      <td className="px-4 py-3 text-gray-600 font-medium">{t('mw.r2.c2')}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-800">{t('mw.r3.c1')}</td>
                      <td className="px-4 py-3 text-gray-600 font-medium">{t('mw.r3.c2')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <h4 className="text-sm font-bold text-green-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <PenTool size={16} /> {t('mw.notes')}
              </h4>
              <p className="text-sm sm:text-base text-green-900 font-medium leading-relaxed italic">
                {t('mw.quote')}
              </p>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default MaintenanceWorkflowSection;
