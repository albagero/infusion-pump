import React from 'react';
import { motion } from 'framer-motion';
import { useSimulatorStore } from '../hooks/useSimulatorStore';
import SlideWrapper from '../components/SlideWrapper';
import PumpDevice from '../components/simulator/PumpDevice';
import ScenarioPanel from '../components/simulator/ScenarioPanel';
import AlarmTriggerPanel from '../components/simulator/AlarmTriggerPanel';
import { Activity, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../i18n';

const SimulatorSection: React.FC = () => {
  const { state, actions } = useSimulatorStore();
  const { t } = useLanguage();

  const isRunningOrPaused = state.pumpState === 'RUNNING' || state.pumpState === 'PAUSED';
  const isOff = state.pumpState === 'OFF';
  const canLoadScenario = state.pumpState === 'OFF' || state.pumpState === 'IDLE' || state.pumpState === 'PROGRAMMING';
  const canTriggerAlarm = state.pumpState !== 'OFF' && state.pumpState !== 'ALARM';

  return (
    <SlideWrapper className="bg-dark-gradient" id="simulator">
      <div
        className="w-full h-full flex flex-col items-center px-3 py-3 sm:px-6 sm:py-4 lg:px-12 overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* ─── Title ──────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-2 sm:mb-3 flex-shrink-0 w-full"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-medical-blue/40 text-xs sm:text-sm font-bold tracking-widest uppercase mb-1 block">
            12
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 flex items-center justify-center gap-2">
            <Activity className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400" />
            {t('sim.title')}
          </h2>
          <p className="text-white/40 text-xs sm:text-sm max-w-lg mx-auto">
            {t('sim.desc')}
          </p>
        </motion.div>

        {/* ─── Main Content ───────────────────────────────────────── */}
        <div className="flex-1 w-full max-w-4xl flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 min-h-0">

          {/* Left: Pump Device */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <PumpDevice state={state} actions={actions} />
          </div>

          {/* Right: Panels (scenarios + alarms) — Desktop only sidebar */}
          <div className="hidden lg:flex flex-col gap-2.5 flex-1 min-w-[220px] max-w-[280px]">
            <motion.div
              className="glass-card-dark rounded-2xl p-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <ScenarioPanel
                onLoadScenario={actions.loadScenario}
                isDisabled={!canLoadScenario}
              />
            </motion.div>

            <motion.div
              className="glass-card-dark rounded-2xl p-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
            >
              <AlarmTriggerPanel
                onTriggerAlarm={actions.triggerAlarm}
                isDisabled={!canTriggerAlarm}
              />
            </motion.div>

            {/* Quick Instructions */}
            <motion.div
              className="text-white/20 text-[10px] space-y-1 px-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <div className="font-bold text-white/30 uppercase tracking-wider mb-1">{t('sim.guide')}</div>
              <div>{t('sim.g1')}</div>
              <div>{t('sim.g2')}</div>
              <div>{t('sim.g3')}</div>
              <div>{t('sim.g4')}</div>
              <div>{t('sim.g5')}</div>
            </motion.div>
          </div>
        </div>

        {/* ─── Mobile Panels (below pump) ─────────────────────────── */}
        <div className="lg:hidden w-full max-w-[340px] flex flex-col gap-2.5 mt-2 flex-shrink-0">
          <ScenarioPanel
            onLoadScenario={actions.loadScenario}
            isDisabled={!canLoadScenario}
          />
          <AlarmTriggerPanel
            onTriggerAlarm={actions.triggerAlarm}
            isDisabled={!canTriggerAlarm}
          />
        </div>

        {/* ─── Disclaimer ─────────────────────────────────────────── */}
        <motion.div
          className="flex-shrink-0 mt-2 sm:mt-3 flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
        >
          <ShieldAlert size={12} className="text-amber-400/60 flex-shrink-0" />
          <span className="text-amber-400/60 text-[9px] sm:text-[10px] font-medium">
            {t('sim.warn')}
          </span>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default SimulatorSection;
