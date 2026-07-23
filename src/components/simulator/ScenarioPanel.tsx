import React from 'react';
import { motion } from 'framer-motion';
import { CLINICAL_SCENARIOS } from '../../hooks/useSimulatorStore';
import { useLanguage } from '../../i18n';

interface ScenarioPanelProps {
  onLoadScenario: (scenario: { drugName: string; rate: number; vtbi: number; dose: number }) => void;
  isDisabled?: boolean;
}

const ScenarioPanel: React.FC<ScenarioPanelProps> = ({ onLoadScenario, isDisabled }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full">
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-cyan-400/50 font-bold mb-2 text-center">
        {t('sim.scen')}
      </div>
      <div className="flex lg:flex-wrap gap-2 overflow-x-auto lg:overflow-visible pb-2 px-1 snap-x snap-mandatory lg:snap-none scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CLINICAL_SCENARIOS.map((scenario, index) => (
          <motion.button
            key={scenario.name}
            onClick={() => !isDisabled && onLoadScenario({
              drugName: scenario.drugName,
              rate: scenario.rate,
              vtbi: scenario.vtbi,
              dose: scenario.dose,
            })}
            className={`
              snap-start flex-shrink-0 w-24 lg:w-[46%] p-1.5 sm:p-2 rounded-lg
              border border-white/5 backdrop-blur-sm
              flex flex-col items-center gap-0.5
              transition-all duration-300
              ${isDisabled
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:border-cyan-500/30 hover:bg-white/5 cursor-pointer active:scale-95'
              }
              bg-white/[0.03]
            `}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileTap={isDisabled ? {} : { scale: 0.95 }}
          >
            {/* Icon */}
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gradient-to-br ${scenario.color} flex items-center justify-center text-sm shadow-sm`}>
              {scenario.icon}
            </div>

            {/* Name */}
            <div className="text-[9px] sm:text-[10px] font-bold text-white/90 text-center leading-tight mt-0.5">
              {scenario.name}
            </div>

            {/* Details */}
            <div className="text-[7px] sm:text-[8px] text-cyan-400/50 text-center leading-tight">
              {scenario.rate} mL/hr
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioPanel;
