import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulatorState } from '../../hooks/useSimulatorStore';
import PumpKeypad from './PumpKeypad';
import AlarmOverlay from './AlarmOverlay';
import {
  Settings, Clock, History, Droplets, Play, ChevronRight,
  CheckCircle2, Edit3, ArrowLeft, Zap
} from 'lucide-react';

interface PumpScreenProps {
  state: SimulatorState;
  actions: {
    goProgramming: () => void;
    setDrug: (name: string) => void;
    setRate: (rate: number) => void;
    setVtbi: (vtbi: number) => void;
    setDose: (dose: number) => void;
    setField: (field: SimulatorState['programmingField']) => void;
    confirm: () => void;
    backToProgramming: () => void;
    start: () => void;
    clearAlarm: () => void;
    backToIdle: () => void;
  };
  showHistory: boolean;
  onToggleHistory: () => void;
}

// ─── Drug list ───────────────────────────────────────────────────────
const DRUG_OPTIONS = [
  '0.9% NaCl', 'Vancomycin', 'Insulin', 'PRBCs', 'Propofol',
  'Heparin', 'Dopamine', 'Morphine', 'Amiodarone', 'Norepinephrine',
];

// ─── Format time ─────────────────────────────────────────────────────
function formatSimTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function calculateETA(remainingVol: number, rate: number): string {
  if (rate <= 0) return '--:--';
  const hoursLeft = remainingVol / rate;
  const now = new Date();
  now.setHours(now.getHours() + hoursLeft);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const PumpScreen: React.FC<PumpScreenProps> = ({ state, actions, showHistory, onToggleHistory }) => {
  const [keypadTarget, setKeypadTarget] = useState<'rate' | 'vtbi' | 'dose' | null>(null);
  const [keypadValue, setKeypadValue] = useState('');

  const openKeypad = (target: 'rate' | 'vtbi' | 'dose') => {
    setKeypadTarget(target);
    const currentVal = target === 'rate' ? state.infusionRate : target === 'vtbi' ? state.vtbi : state.dose;
    setKeypadValue(currentVal > 0 ? String(currentVal) : '');
  };

  const confirmKeypad = () => {
    const val = parseFloat(keypadValue) || 0;
    if (keypadTarget === 'rate') actions.setRate(val);
    else if (keypadTarget === 'vtbi') actions.setVtbi(val);
    else if (keypadTarget === 'dose') actions.setDose(val);
    setKeypadTarget(null);
    setKeypadValue('');
  };

  const cancelKeypad = () => {
    setKeypadTarget(null);
    setKeypadValue('');
  };

  // ─── OFF Screen ──────────────────────────────────────────────────
  if (state.pumpState === 'OFF') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black rounded-lg">
        <motion.div
          className="text-white/10 text-xs font-mono"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          STANDBY
        </motion.div>
      </div>
    );
  }

  // ─── History View ────────────────────────────────────────────────
  if (showHistory) {
    return (
      <div className="w-full h-full flex flex-col p-2 sm:p-3 overflow-y-auto pump-screen-scroll">
        <button
          onClick={onToggleHistory}
          className="flex items-center gap-1 text-cyan-400/70 text-xs mb-2 hover:text-cyan-300 transition-colors self-start"
        >
          <ArrowLeft size={12} /> Back
        </button>
        <div className="text-[10px] uppercase tracking-wider text-cyan-400/50 font-bold mb-2">Infusion History</div>
        {state.infusionHistory.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-cyan-400/30 text-xs">
            No history yet
          </div>
        ) : (
          <div className="space-y-1.5">
            {state.infusionHistory.map((record, i) => (
              <div key={i} className="bg-navy-900/50 rounded-lg p-2 border border-cyan-500/10 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-cyan-300 font-bold">{record.drugName}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    record.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    record.status === 'alarm' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{record.status}</span>
                </div>
                <div className="flex gap-3 text-cyan-400/50 text-[10px]">
                  <span>{record.rate} mL/hr</span>
                  <span>{record.vtbi} mL</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── ALARM Screen ────────────────────────────────────────────────
  if (state.pumpState === 'ALARM') {
    return (
      <div className="w-full h-full relative">
        <AnimatePresence>
          <AlarmOverlay
            alarmType={state.alarmType}
            onSilence={() => {}} // Silence is visual-only in this simulation
            onClear={actions.clearAlarm}
          />
        </AnimatePresence>
      </div>
    );
  }

  // ─── IDLE Screen ─────────────────────────────────────────────────
  if (state.pumpState === 'IDLE') {
    const menuItems = [
      { icon: <Droplets size={18} />, label: 'Program', desc: 'Set infusion', action: actions.goProgramming, color: 'text-cyan-400' },
      { icon: <History size={16} />, label: 'History', desc: 'View logs', action: onToggleHistory, color: 'text-blue-400' },
      { icon: <Zap size={16} />, label: 'Prime', desc: 'Prime line', action: () => {}, color: 'text-green-400' },
      { icon: <Settings size={16} />, label: 'Settings', desc: 'Config', action: () => {}, color: 'text-purple-400' },
    ];

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4 gap-3">
        {/* Priming animation */}
        <AnimatePresence>
          {state.isPriming && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center bg-navy-900/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <span className="text-cyan-400 text-xs font-bold">Priming...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-cyan-300/60 text-[10px] uppercase tracking-widest font-bold">Ready</div>

        <div className="grid grid-cols-2 gap-2 w-full max-w-[240px]">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.06] transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={item.color}>{item.icon}</div>
              <span className="text-white/90 text-xs font-bold">{item.label}</span>
              <span className="text-white/30 text-[9px]">{item.desc}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // ─── PROGRAMMING Screen ──────────────────────────────────────────
  if (state.pumpState === 'PROGRAMMING') {
    return (
      <div className="w-full h-full flex flex-col p-2 sm:p-3 overflow-y-auto pump-screen-scroll">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={actions.backToIdle}
            className="flex items-center gap-1 text-cyan-400/70 text-xs hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft size={12} /> Back
          </button>
          <span className="text-[10px] uppercase tracking-wider text-cyan-400/50 font-bold">Program Infusion</span>
        </div>

        <AnimatePresence mode="wait">
          {keypadTarget ? (
            <PumpKeypad
              key="keypad"
              value={keypadValue}
              onValueChange={setKeypadValue}
              onConfirm={confirmKeypad}
              onCancel={cancelKeypad}
              label={keypadTarget === 'rate' ? 'Infusion Rate' : keypadTarget === 'vtbi' ? 'Volume (VTBI)' : 'Dose'}
              unit={keypadTarget === 'rate' ? 'mL/hr' : keypadTarget === 'dose' ? 'mg' : 'mL'}
              max={keypadTarget === 'rate' ? 2000 : 9999}
            />
          ) : (
            <motion.div
              key="fields"
              className="flex flex-col gap-1.5 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Drug Selection */}
              <div>
                <label className="text-[9px] uppercase tracking-wider text-cyan-400/50 font-bold mb-0.5 block">Drug</label>
                <select
                  value={state.drugName}
                  onChange={(e) => actions.setDrug(e.target.value)}
                  className="w-full bg-navy-900/80 border border-cyan-500/20 rounded-lg px-2 py-1.5 text-cyan-300 text-xs font-medium focus:outline-none focus:border-cyan-400/50 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2322d3ee' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
                >
                  <option value="">Select Drug...</option>
                  {DRUG_OPTIONS.map(d => (
                    <option key={d} value={d} className="bg-navy-900 text-cyan-300">{d}</option>
                  ))}
                </select>
              </div>

              {/* Rate */}
              <button
                onClick={() => openKeypad('rate')}
                className="w-full bg-navy-900/80 border border-cyan-500/20 rounded-lg px-2 py-1.5 flex items-center justify-between hover:border-cyan-400/40 transition-colors group"
              >
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-cyan-400/50 font-bold">Rate</div>
                  <div className="text-cyan-300 text-xs font-mono font-bold">
                    {state.infusionRate > 0 ? `${state.infusionRate} mL/hr` : 'Tap to set'}
                  </div>
                </div>
                <ChevronRight size={12} className="text-cyan-500/30 group-hover:text-cyan-400/60 transition-colors" />
              </button>

              {/* VTBI */}
              <button
                onClick={() => openKeypad('vtbi')}
                className="w-full bg-navy-900/80 border border-cyan-500/20 rounded-lg px-2 py-1.5 flex items-center justify-between hover:border-cyan-400/40 transition-colors group"
              >
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-cyan-400/50 font-bold">VTBI</div>
                  <div className="text-cyan-300 text-xs font-mono font-bold">
                    {state.vtbi > 0 ? `${state.vtbi} mL` : 'Tap to set'}
                  </div>
                </div>
                <ChevronRight size={12} className="text-cyan-500/30 group-hover:text-cyan-400/60 transition-colors" />
              </button>

              {/* Dose (optional) */}
              <button
                onClick={() => openKeypad('dose')}
                className="w-full bg-navy-900/80 border border-cyan-500/20 rounded-lg px-2 py-1.5 flex items-center justify-between hover:border-cyan-400/40 transition-colors group"
              >
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-cyan-400/50 font-bold">Dose (optional)</div>
                  <div className="text-cyan-300 text-xs font-mono font-bold">
                    {state.dose > 0 ? `${state.dose} mg` : 'Tap to set'}
                  </div>
                </div>
                <ChevronRight size={12} className="text-cyan-500/30 group-hover:text-cyan-400/60 transition-colors" />
              </button>

              {/* Calculated Time */}
              {state.infusionRate > 0 && state.vtbi > 0 && (
                <motion.div
                  className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-2 py-1.5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-cyan-400/50 font-bold">Estimated Time</div>
                  <div className="text-cyan-300 text-xs font-mono font-bold flex items-center gap-1">
                    <Clock size={10} />
                    {formatSimTime((state.vtbi / state.infusionRate) * 3600)}
                  </div>
                </motion.div>
              )}

              {/* Confirm Button */}
              <motion.button
                onClick={actions.confirm}
                disabled={!state.drugName || state.infusionRate <= 0 || state.vtbi <= 0}
                className={`
                  mt-auto w-full py-1.5 sm:py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5
                  transition-all duration-200
                  ${state.drugName && state.infusionRate > 0 && state.vtbi > 0
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30'
                    : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                  }
                `}
                whileTap={state.drugName && state.infusionRate > 0 && state.vtbi > 0 ? { scale: 0.97 } : {}}
              >
                <CheckCircle2 size={14} />
                Confirm Settings
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── CONFIRMING Screen ───────────────────────────────────────────
  if (state.pumpState === 'CONFIRMING') {
    const rows = [
      { label: 'Drug', value: state.drugName },
      { label: 'Rate', value: `${state.infusionRate} mL/hr` },
      { label: 'VTBI', value: `${state.vtbi} mL` },
      { label: 'Dose', value: state.dose > 0 ? `${state.dose} mg` : 'N/A' },
      { label: 'Est. Time', value: formatSimTime((state.vtbi / state.infusionRate) * 3600) },
    ];

    return (
      <div className="w-full h-full flex flex-col p-2 sm:p-3">
        <div className="text-[10px] uppercase tracking-wider text-amber-400/70 font-bold mb-2 text-center">
          ⚠ Confirm Settings
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              className="flex justify-between items-center bg-navy-900/50 rounded-lg px-2.5 py-1.5 border border-cyan-500/10"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="text-cyan-400/50 text-xs font-medium">{row.label}</span>
              <span className="text-cyan-300 text-sm font-mono font-bold">{row.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <motion.button
            onClick={actions.backToProgramming}
            className="flex-1 py-2 rounded-lg text-xs font-bold bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
            whileTap={{ scale: 0.95 }}
          >
            <Edit3 size={12} /> Edit
          </motion.button>
          <motion.button
            onClick={actions.start}
            className="flex-1 py-2 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-1"
            whileTap={{ scale: 0.95 }}
          >
            <Play size={12} /> Start
          </motion.button>
        </div>
      </div>
    );
  }

  // ─── RUNNING / PAUSED Screen ─────────────────────────────────────
  if (state.pumpState === 'RUNNING' || state.pumpState === 'PAUSED') {
    const progress = state.vtbi > 0 ? ((state.vtbi - state.remainingVolume) / state.vtbi) * 100 : 0;

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-3 relative">
        {/* Paused Overlay */}
        <AnimatePresence>
          {state.pumpState === 'PAUSED' && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-amber-400 text-lg sm:text-xl font-bold tracking-widest bg-black/50 px-4 py-2 rounded-lg border border-amber-500/30"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                ⏸ PAUSED
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drug Name */}
        <div className="text-cyan-300 text-sm sm:text-base font-bold mb-1">{state.drugName}</div>

        {/* Circular Progress */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 my-2">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-cyan-300 text-xl sm:text-2xl font-mono font-bold">{Math.round(progress)}%</span>
            <span className="text-cyan-500/50 text-[9px]">Infused</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-1.5 w-full max-w-[240px]">
          <div className="bg-navy-900/50 rounded-lg px-2 py-1.5 text-center border border-cyan-500/10">
            <div className="text-[9px] uppercase tracking-wider text-cyan-400/40 font-bold">Rate</div>
            <div className="text-cyan-300 text-xs sm:text-sm font-mono font-bold">{state.infusionRate} mL/hr</div>
          </div>
          <div className="bg-navy-900/50 rounded-lg px-2 py-1.5 text-center border border-cyan-500/10">
            <div className="text-[9px] uppercase tracking-wider text-cyan-400/40 font-bold">Remaining</div>
            <div className="text-cyan-300 text-xs sm:text-sm font-mono font-bold">{state.remainingVolume.toFixed(1)} mL</div>
          </div>
          <div className="bg-navy-900/50 rounded-lg px-2 py-1.5 text-center border border-cyan-500/10">
            <div className="text-[9px] uppercase tracking-wider text-cyan-400/40 font-bold">Elapsed</div>
            <div className="text-cyan-300 text-xs sm:text-sm font-mono font-bold">{formatSimTime(state.elapsedTime)}</div>
          </div>
          <div className="bg-navy-900/50 rounded-lg px-2 py-1.5 text-center border border-cyan-500/10">
            <div className="text-[9px] uppercase tracking-wider text-cyan-400/40 font-bold">ETA</div>
            <div className="text-cyan-300 text-xs sm:text-sm font-mono font-bold">{calculateETA(state.remainingVolume, state.infusionRate)}</div>
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="w-full max-w-[240px] mt-2">
          <div className="h-1.5 bg-navy-900/50 rounded-full overflow-hidden border border-cyan-500/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ─── COMPLETED Screen ────────────────────────────────────────────
  if (state.pumpState === 'COMPLETED') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-3">
        <motion.div
          className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-400/30 mb-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <CheckCircle2 className="w-7 h-7 text-green-400" />
        </motion.div>

        <motion.h3
          className="text-green-300 text-base sm:text-lg font-bold mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Infusion Complete
        </motion.h3>

        <motion.div
          className="text-center space-y-1 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-cyan-300 text-sm font-bold">{state.drugName}</div>
          <div className="text-cyan-400/50 text-xs">
            {state.vtbi} mL at {state.infusionRate} mL/hr
          </div>
          <div className="text-cyan-400/50 text-xs">
            Duration: {formatSimTime(state.elapsedTime)}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default PumpScreen;
