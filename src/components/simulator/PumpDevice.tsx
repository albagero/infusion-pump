import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Power, Play, Pause, Square, Droplets, Battery, BatteryLow, BatteryFull, BatteryMedium } from 'lucide-react';
import { SimulatorState, PumpState } from '../../hooks/useSimulatorStore';
import PumpScreen from './PumpScreen';

interface PumpDeviceProps {
  state: SimulatorState;
  actions: {
    powerOn: () => void;
    powerOff: () => void;
    goProgramming: () => void;
    setDrug: (name: string) => void;
    setRate: (rate: number) => void;
    setVtbi: (vtbi: number) => void;
    setDose: (dose: number) => void;
    setField: (field: SimulatorState['programmingField']) => void;
    confirm: () => void;
    backToProgramming: () => void;
    start: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    prime: () => void;
    clearAlarm: () => void;
    backToIdle: () => void;
  };
}

// LED color based on state
function getLedState(pumpState: PumpState): { color: string; animate: boolean } {
  switch (pumpState) {
    case 'OFF': return { color: 'bg-gray-700', animate: false };
    case 'RUNNING': return { color: 'bg-green-500', animate: true };
    case 'PAUSED': return { color: 'bg-amber-400', animate: true };
    case 'ALARM': return { color: 'bg-red-500', animate: true };
    case 'COMPLETED': return { color: 'bg-blue-400', animate: true };
    default: return { color: 'bg-cyan-400', animate: false };
  }
}

function getBatteryIcon(level: number) {
  if (level > 60) return <BatteryFull size={14} className="text-green-400" />;
  if (level > 30) return <BatteryMedium size={14} className="text-amber-400" />;
  if (level > 10) return <BatteryLow size={14} className="text-red-400" />;
  return <Battery size={14} className="text-red-500" />;
}

const PumpDevice: React.FC<PumpDeviceProps> = ({ state, actions }) => {
  const [showHistory, setShowHistory] = useState(false);
  const led = getLedState(state.pumpState);
  const isOn = state.pumpState !== 'OFF';
  const isRunning = state.pumpState === 'RUNNING';
  const isPaused = state.pumpState === 'PAUSED';
  const isAlarm = state.pumpState === 'ALARM';

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      className="relative w-[280px] sm:w-[340px] flex-shrink-0 mx-auto select-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* ─── Pump Body ──────────────────────────────────────────────── */}
      <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden pump-device-body">
        {/* Outer glow */}
        <div className={`absolute inset-0 rounded-[24px] sm:rounded-[28px] ${
          isAlarm ? 'pump-alarm-glow' : isRunning ? 'pump-running-glow' : ''
        }`} />

        {/* Device shell */}
        <div className="relative bg-gradient-to-b from-[#1a2744] via-[#152035] to-[#0d1829] border border-white/[0.08] rounded-[24px] sm:rounded-[28px] p-3 sm:p-4 shadow-2xl">

          {/* ─── Top Bar ──────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-2 px-1">
            {/* LED Indicator */}
            <div className="flex items-center gap-2">
              <motion.div
                className={`w-2.5 h-2.5 rounded-full ${led.color} shadow-sm`}
                animate={led.animate ? { opacity: [1, 0.3, 1] } : {}}
                transition={led.animate ? { repeat: Infinity, duration: led.color.includes('red') ? 0.5 : 1.2 } : {}}
                style={led.animate ? { boxShadow: `0 0 8px ${led.color.includes('green') ? '#22c55e' : led.color.includes('amber') ? '#fbbf24' : led.color.includes('red') ? '#ef4444' : '#22d3ee'}` } : {}}
              />
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                {state.pumpState === 'OFF' ? 'Off' : state.pumpState}
              </span>
            </div>

            {/* Battery & Clock */}
            {isOn && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {getBatteryIcon(state.batteryLevel)}
                  <span className="text-[10px] text-white/40 font-mono">{Math.round(state.batteryLevel)}%</span>
                </div>
                <span className="text-[10px] text-white/30 font-mono">{now}</span>
              </div>
            )}
          </div>

          {/* ─── Screen ───────────────────────────────────────────── */}
          <div
            className={`
              relative flex flex-col rounded-xl sm:rounded-2xl overflow-hidden
              ${isOn ? 'pump-screen-on' : 'pump-screen-off'}
              transition-all duration-500 w-full h-[320px] sm:h-[360px]
            `}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <PumpScreen
              state={state}
              actions={actions}
              showHistory={showHistory}
              onToggleHistory={() => setShowHistory(prev => !prev)}
            />
          </div>

          {/* ─── Physical Buttons ─────────────────────────────────── */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {/* Power */}
            <motion.button
              onClick={isOn ? actions.powerOff : actions.powerOn}
              className={`
                pump-hw-button flex flex-col items-center justify-center gap-1 py-2.5 sm:py-3 rounded-xl
                ${isOn
                  ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400'
                  : 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400'
                }
              `}
              whileTap={{ scale: 0.92, y: 2 }}
            >
              <Power size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">
                {isOn ? 'Off' : 'On'}
              </span>
            </motion.button>

            {/* Start/Pause */}
            <motion.button
              onClick={() => {
                if (isRunning) actions.pause();
                else if (isPaused) actions.resume();
                else if (state.pumpState === 'CONFIRMING') actions.start();
              }}
              disabled={!isOn || state.pumpState === 'OFF' || state.pumpState === 'IDLE' || state.pumpState === 'PROGRAMMING' || state.pumpState === 'ALARM'}
              className={`
                pump-hw-button flex flex-col items-center justify-center gap-1 py-2.5 sm:py-3 rounded-xl
                ${(isRunning || isPaused || state.pumpState === 'CONFIRMING')
                  ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400'
                  : 'bg-white/[0.03] border-white/5 text-white/20 cursor-not-allowed'
                }
              `}
              whileTap={(isRunning || isPaused || state.pumpState === 'CONFIRMING') ? { scale: 0.92, y: 2 } : {}}
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">
                {isRunning ? 'Pause' : isPaused ? 'Resume' : 'Start'}
              </span>
            </motion.button>

            {/* Stop */}
            <motion.button
              onClick={actions.stop}
              disabled={!isRunning && !isPaused && state.pumpState !== 'COMPLETED'}
              className={`
                pump-hw-button flex flex-col items-center justify-center gap-1 py-2.5 sm:py-3 rounded-xl
                ${(isRunning || isPaused || state.pumpState === 'COMPLETED')
                  ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400'
                  : 'bg-white/[0.03] border-white/5 text-white/20 cursor-not-allowed'
                }
              `}
              whileTap={(isRunning || isPaused || state.pumpState === 'COMPLETED') ? { scale: 0.92, y: 2 } : {}}
            >
              <Square size={14} />
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">Stop</span>
            </motion.button>

            {/* Prime */}
            <motion.button
              onClick={actions.prime}
              disabled={state.pumpState !== 'IDLE' || state.isPriming}
              className={`
                pump-hw-button flex flex-col items-center justify-center gap-1 py-2.5 sm:py-3 rounded-xl
                ${state.pumpState === 'IDLE' && !state.isPriming
                  ? 'bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-400'
                  : 'bg-white/[0.03] border-white/5 text-white/20 cursor-not-allowed'
                }
              `}
              whileTap={state.pumpState === 'IDLE' && !state.isPriming ? { scale: 0.92, y: 2 } : {}}
            >
              <Droplets size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">Prime</span>
            </motion.button>
          </div>

          {/* ─── Brand Label ──────────────────────────────────────── */}
          <div className="text-center mt-2.5">
            <span className="text-[9px] text-white/15 font-bold tracking-[0.3em] uppercase">MedSim Pump</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PumpDevice;
