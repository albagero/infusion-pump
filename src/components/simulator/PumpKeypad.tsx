import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PumpKeypadProps {
  value: string;
  onValueChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  label: string;
  unit: string;
  max?: number;
}

const PumpKeypad: React.FC<PumpKeypadProps> = ({ value, onValueChange, onConfirm, onCancel, label, unit, max = 9999 }) => {
  const handleKey = (key: string) => {
    if (key === 'C') {
      onValueChange('');
      return;
    }
    if (key === '⌫') {
      onValueChange(value.slice(0, -1));
      return;
    }
    if (key === '.') {
      if (value.includes('.')) return;
      onValueChange(value + '.');
      return;
    }
    // Digit
    const newVal = value + key;
    const numVal = parseFloat(newVal);
    if (!isNaN(numVal) && numVal <= max) {
      onValueChange(newVal);
    }
  };

  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', '.'];

  return (
    <motion.div
      className="flex flex-col gap-2 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Display */}
      <div className="relative">
        <div className="text-[10px] uppercase tracking-wider text-cyan-400/70 mb-1 font-medium">{label}</div>
        <div className="bg-navy-900/80 rounded-lg border border-cyan-500/20 px-3 py-2 flex items-center justify-between">
          <span className="text-cyan-300 font-mono text-lg sm:text-xl tracking-wide min-h-[28px]">
            {value || '0'}
          </span>
          <span className="text-cyan-500/50 text-xs ml-2">{unit}</span>
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {keys.map((key) => (
          <motion.button
            key={key}
            onClick={() => handleKey(key)}
            className={`
              h-9 sm:h-10 rounded-lg font-mono text-sm sm:text-base font-bold
              flex items-center justify-center
              transition-all duration-150
              ${key === 'C'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-navy-800/60 text-cyan-300 border border-cyan-500/10 hover:bg-navy-700/60 hover:border-cyan-500/30'
              }
              active:scale-95
            `}
            whileTap={{ scale: 0.92 }}
          >
            {key}
          </motion.button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-1.5 mt-1">
        <motion.button
          onClick={() => handleKey('⌫')}
          className="h-9 sm:h-10 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 active:scale-95 flex items-center justify-center"
          whileTap={{ scale: 0.92 }}
        >
          ⌫
        </motion.button>
        <motion.button
          onClick={onCancel}
          className="h-9 sm:h-10 rounded-lg text-xs font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30 active:scale-95 flex items-center justify-center"
          whileTap={{ scale: 0.92 }}
        >
          Cancel
        </motion.button>
        <motion.button
          onClick={onConfirm}
          className="h-9 sm:h-10 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 active:scale-95 flex items-center justify-center"
          whileTap={{ scale: 0.92 }}
        >
          Enter
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PumpKeypad;
