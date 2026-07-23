import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Wind, CheckCircle, AlertTriangle, Mountain } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';
import { useLanguage } from '../i18n';

const AltitudeSection = () => {
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

  return (
    <SlideWrapper className="bg-section-gradient" id="altitude">
      <div className="w-full h-full flex flex-col justify-start px-3 py-4 sm:px-6 sm:py-6 lg:px-10 max-w-[1400px] mx-auto overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 block">
            15
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2">
            {t('alt.title')}
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
                <Mountain className="text-purple-500" size={24} /> {t('alt.s1.title')}
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 flex flex-col items-center justify-center flex-1">
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider mb-1">{t('alt.s1.sub')}</span>
                  <div className="text-xl sm:text-2xl font-serif italic font-bold text-purple-700 bg-white px-4 py-1.5 rounded-lg shadow-sm">
                    P₁V₁ = P₂V₂
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-gray-700">{t('alt.s1.t1')}</p>
                  <p className="text-lg font-bold text-purple-600">{t('alt.s1.t2')}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col gap-1.5 relative z-10 text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Plane size={16} className="text-blue-400" /> {t('alt.s1.d1')}
                  </div>
                  <div className="pl-6 border-l-2 border-dashed border-gray-300 ml-2 py-0.5 text-gray-400">&darr;</div>
                  <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-2 py-1 rounded">
                    <Wind size={16} /> {t('alt.s1.d2')}
                  </div>
                  <div className="pl-6 border-l-2 border-dashed border-gray-300 ml-2 py-0.5 text-gray-400">&darr;</div>
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    <span className="w-4 h-4 rounded-full border-2 border-amber-400 border-dotted flex items-center justify-center text-[8px]">O</span> {t('alt.s1.d3')}
                  </div>
                  <div className="pl-6 border-l-2 border-dashed border-gray-300 ml-2 py-0.5 text-gray-400">&darr;</div>
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 px-2 py-1 rounded">
                    <AlertTriangle size={16} /> {t('alt.s1.d4')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Solutions & Clinical Importance */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            
            <div className="glass-card rounded-2xl p-4 sm:p-5 border-l-4 border-l-green-500 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-3 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} /> {t('alt.s2.title')}
              </h3>
              <ul className="space-y-2 text-sm font-medium text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> {t('alt.s2.l1')}</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> {t('alt.s2.l2')}</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> {t('alt.s2.l3')}</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> {t('alt.s2.l4')}</li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <h4 className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest mb-2">{t('alt.s3.title')}</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Plane size={14} /> {t('alt.s3.l1')}</span>
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Plane size={14} /> {t('alt.s3.l2')}</span>
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Plane size={14} /> {t('alt.s3.l3')}</span>
                <span className="px-3 py-1.5 bg-white text-blue-700 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 flex items-center gap-1"><Mountain size={14} /> {t('alt.s3.l4')}</span>
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
            <h3 className="text-lg font-bold text-white text-center">{t('alt.tbl.title')}</h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('alt.tbl.h1')}</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('alt.tbl.h2')}</th>
                  <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('alt.tbl.h3')}</th>
                  <th className="px-6 py-3 text-xs font-bold text-medical-blue uppercase tracking-wider bg-blue-50/50">{t('alt.tbl.h4')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-amber-600 font-bold">{t('alt.tbl.r1.c1')}</td>
                  <td className="px-6 py-4 text-gray-700">{t('alt.tbl.r1.c2')}</td>
                  <td className="px-6 py-4 text-red-500">{t('alt.tbl.r1.c3')}</td>
                  <td className="px-6 py-4 text-green-700 bg-green-50/30">{t('alt.tbl.r1.c4')}</td>
                </tr>
                <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-bold">{t('alt.tbl.r2.c1')}</td>
                  <td className="px-6 py-4 text-gray-700">{t('alt.tbl.r2.c2')}</td>
                  <td className="px-6 py-4 text-red-500">{t('alt.tbl.r2.c3')}</td>
                  <td className="px-6 py-4 text-green-700 bg-green-50/30">{t('alt.tbl.r2.c4')}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-purple-600 font-bold">{t('alt.tbl.r3.c1')}</td>
                  <td className="px-6 py-4 text-gray-700">{t('alt.tbl.r3.c2')}</td>
                  <td className="px-6 py-4 text-red-500">{t('alt.tbl.r3.c3')}</td>
                  <td className="px-6 py-4 text-green-700 bg-green-50/30">{t('alt.tbl.r3.c4')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout for Table */}
          <div className="sm:hidden flex flex-col p-2 gap-2 bg-gray-50">
            {/* Factor 1 */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-amber-600">{t('alt.tbl.r1.c1')}</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{t('alt.tbl.r1.c2')}</span>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-gray-500">{t('alt.mob.effect')}</span> <span className="text-red-500 font-medium">{t('alt.tbl.r1.c3')}</span></p>
                <p><span className="font-semibold text-gray-500">{t('alt.mob.sol')}</span> <span className="text-green-600 font-medium">{t('alt.tbl.r1.c4')}</span></p>
              </div>
            </div>
            
            {/* Factor 2 */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-blue-600">{t('alt.tbl.r2.c1')}</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{t('alt.tbl.r2.c2')}</span>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-gray-500">{t('alt.mob.effect')}</span> <span className="text-red-500 font-medium">{t('alt.tbl.r2.c3')}</span></p>
                <p><span className="font-semibold text-gray-500">{t('alt.mob.sol')}</span> <span className="text-green-600 font-medium">{t('alt.tbl.r2.c4')}</span></p>
              </div>
            </div>

            {/* Factor 3 */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-purple-600">{t('alt.tbl.r3.c1')}</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{t('alt.tbl.r3.c2')}</span>
              </div>
              <div className="text-xs space-y-1">
                <p><span className="font-semibold text-gray-500">{t('alt.mob.effect')}</span> <span className="text-red-500 font-medium">{t('alt.tbl.r3.c3')}</span></p>
                <p><span className="font-semibold text-gray-500">{t('alt.mob.sol')}</span> <span className="text-green-600 font-medium">{t('alt.tbl.r3.c4')}</span></p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </SlideWrapper>
  );
};

export default AltitudeSection;
