import React from 'react';
import { motion } from 'framer-motion';
import { ALARM_INFO, AlarmType } from '../../hooks/useSimulatorStore';
import { AlertTriangle } from 'lucide-react';

interface AlarmTriggerPanelProps {
  onTriggerAlarm: (alarmType: AlarmType, message: string) => void;
  isDisabled?: boolean;
}

const alarmButtons: { type: AlarmType; label: string; color: string }[] = [
  { type: 'occlusion', label: 'Occlusion', color: 'from-red-500 to-red-700' },
  { type: 'air_in_line', label: 'Air in Line', color: 'from-orange-500 to-amber-600' },
  { type: 'door_open', label: 'Door Open', color: 'from-yellow-500 to-yellow-600' },
  { type: 'low_battery', label: 'Low Battery', color: 'from-purple-500 to-purple-700' },
  { type: 'empty_bag', label: 'Empty Bag', color: 'from-pink-500 to-rose-600' },
];

const AlarmTriggerPanel: React.FC<AlarmTriggerPanelProps> = ({ onTriggerAlarm, isDisabled }) => {
  return (
    <div className="w-full">
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-red-400/50 font-bold mb-2 text-center flex items-center justify-center gap-1">
        <AlertTriangle size={10} />
        Test Alarms
      </div>
      <div className="flex lg:flex-wrap gap-1.5 overflow-x-auto lg:overflow-visible pb-1 px-1 snap-x snap-mandatory lg:snap-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {alarmButtons.map((alarm, index) => {
          const info = alarm.type ? ALARM_INFO[alarm.type] : null;
          return (
            <motion.button
              key={alarm.type}
              onClick={() => !isDisabled && alarm.type && info && onTriggerAlarm(alarm.type, info.description)}
              className={`
              flex-1 min-w-[90px] lg:w-[47%] px-2 py-1.5 rounded-md
              text-[9px] sm:text-[10px] font-bold text-white/90
              border border-white/10
              flex items-center justify-center gap-1.5
              transition-all duration-200
              ${isDisabled
                ? 'opacity-40 cursor-not-allowed bg-white/5'
                : `hover:bg-opacity-80 active:scale-95 cursor-pointer bg-gradient-to-r ${alarm.color}`
              }
            `}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
              whileTap={isDisabled ? {} : { scale: 0.92 }}
            >
              {info?.icon} {alarm.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default AlarmTriggerPanel;
