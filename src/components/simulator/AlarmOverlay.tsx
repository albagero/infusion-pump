import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALARM_INFO, AlarmType } from '../../hooks/useSimulatorStore';
import { AlertTriangle, Volume2, X } from 'lucide-react';

interface AlarmOverlayProps {
  alarmType: AlarmType;
  onSilence: () => void;
  onClear: () => void;
}

const AlarmOverlay: React.FC<AlarmOverlayProps> = ({ alarmType, onSilence, onClear }) => {
  if (!alarmType) return null;
  const info = ALARM_INFO[alarmType];
  if (!info) return null;

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center p-3 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Flashing red background */}
      <motion.div
        className="absolute inset-0 bg-red-900/80"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3 max-w-xs w-full">
        {/* Alarm Icon */}
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/30 flex items-center justify-center border-2 border-red-400/50"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-300" />
        </motion.div>

        {/* Alarm Title */}
        <div className="text-center">
          <motion.h3
            className="text-base sm:text-lg font-bold text-red-200"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            ⚠ {info.title}
          </motion.h3>
          <p className="text-red-300/80 text-xs sm:text-sm mt-1">{info.description}</p>
        </div>

        {/* Resolution Steps */}
        <div className="w-full bg-black/40 rounded-lg p-2 sm:p-3 border border-red-500/20">
          <div className="text-[10px] uppercase tracking-wider text-red-400/70 font-bold mb-1.5">Resolution Steps</div>
          <ol className="space-y-1">
            {info.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-1.5 text-red-200/90 text-xs">
                <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full mt-1">
          <motion.button
            onClick={onSilence}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-bold hover:bg-amber-500/30 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 size={14} />
            Silence
          </motion.button>
          <motion.button
            onClick={onClear}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 text-xs sm:text-sm font-bold hover:bg-green-500/30 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <X size={14} />
            Clear Alarm
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlarmOverlay;
