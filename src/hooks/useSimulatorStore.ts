import { useReducer, useCallback, useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────
export type PumpState =
  | 'OFF'
  | 'IDLE'
  | 'PROGRAMMING'
  | 'CONFIRMING'
  | 'RUNNING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ALARM';

export type AlarmType =
  | 'occlusion'
  | 'air_in_line'
  | 'door_open'
  | 'low_battery'
  | 'empty_bag'
  | null;

export interface InfusionRecord {
  drugName: string;
  rate: number;
  vtbi: number;
  startedAt: string;
  completedAt: string;
  status: 'completed' | 'stopped' | 'alarm';
}

export interface SimulatorState {
  pumpState: PumpState;
  drugName: string;
  infusionRate: number;
  vtbi: number;
  dose: number;
  elapsedTime: number;       // seconds of simulated time
  remainingVolume: number;
  batteryLevel: number;
  alarmType: AlarmType;
  alarmMessage: string;
  infusionHistory: InfusionRecord[];
  totalInfused: number;
  programmingField: 'drug' | 'rate' | 'vtbi' | 'dose' | null;
  isPriming: boolean;
  preAlarmState: PumpState | null;  // state before alarm triggered
}

// ─── Actions ─────────────────────────────────────────────────────────
type SimulatorAction =
  | { type: 'POWER_ON' }
  | { type: 'POWER_OFF' }
  | { type: 'GO_PROGRAMMING' }
  | { type: 'SET_DRUG'; payload: string }
  | { type: 'SET_RATE'; payload: number }
  | { type: 'SET_VTBI'; payload: number }
  | { type: 'SET_DOSE'; payload: number }
  | { type: 'SET_FIELD'; payload: SimulatorState['programmingField'] }
  | { type: 'CONFIRM' }
  | { type: 'BACK_TO_PROGRAMMING' }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STOP' }
  | { type: 'PRIME' }
  | { type: 'PRIME_COMPLETE' }
  | { type: 'TRIGGER_ALARM'; payload: { alarmType: AlarmType; message: string } }
  | { type: 'CLEAR_ALARM' }
  | { type: 'TICK' }
  | { type: 'LOAD_SCENARIO'; payload: { drugName: string; rate: number; vtbi: number; dose: number } }
  | { type: 'VIEW_HISTORY' }
  | { type: 'BACK_TO_IDLE' };

// ─── Initial State ───────────────────────────────────────────────────
const initialState: SimulatorState = {
  pumpState: 'OFF',
  drugName: '',
  infusionRate: 0,
  vtbi: 0,
  dose: 0,
  elapsedTime: 0,
  remainingVolume: 0,
  batteryLevel: 100,
  alarmType: null,
  alarmMessage: '',
  infusionHistory: [],
  totalInfused: 0,
  programmingField: null,
  isPriming: false,
  preAlarmState: null,
};

// ─── Alarm Info Database ─────────────────────────────────────────────
export const ALARM_INFO: Record<string, { title: string; icon: string; description: string; steps: string[] }> = {
  occlusion: {
    title: 'Occlusion Detected',
    icon: '🔴',
    description: 'The IV line is blocked. Fluid cannot flow to the patient.',
    steps: [
      'Check tubing for kinks or clamps',
      'Inspect catheter insertion site',
      'Flush the line if appropriate',
      'Replace tubing set if needed',
      'Press Clear to resume',
    ],
  },
  air_in_line: {
    title: 'Air In Line',
    icon: '🫧',
    description: 'Air bubbles detected in the IV tubing.',
    steps: [
      'Stop the infusion immediately',
      'Clamp the IV tubing',
      'Remove air from the line',
      'Re-prime the tubing if needed',
      'Press Clear to resume',
    ],
  },
  door_open: {
    title: 'Door Open',
    icon: '🚪',
    description: 'The pump door is not properly closed.',
    steps: [
      'Ensure tubing is seated correctly',
      'Close the pump door firmly',
      'Listen for the click',
      'Press Clear to resume',
    ],
  },
  low_battery: {
    title: 'Low Battery',
    icon: '🪫',
    description: 'Battery level is critically low.',
    steps: [
      'Connect pump to AC power',
      'Check power cable connection',
      'Replace battery if needed',
      'Press Clear to resume',
    ],
  },
  empty_bag: {
    title: 'Empty Bag',
    icon: '💧',
    description: 'The medication bag is empty. Infusion cannot continue.',
    steps: [
      'Replace the IV bag',
      'Verify the new medication',
      'Re-prime the line',
      'Reprogram if necessary',
      'Press Clear to resume',
    ],
  },
};

// ─── Clinical Scenarios ──────────────────────────────────────────────
export const CLINICAL_SCENARIOS = [
  {
    name: 'Normal Saline',
    drugName: '0.9% NaCl',
    rate: 125,
    vtbi: 1000,
    dose: 0,
    description: 'Standard IV fluid replacement',
    color: 'from-blue-400 to-blue-600',
    icon: '💧',
  },
  {
    name: 'Antibiotics',
    drugName: 'Vancomycin',
    rate: 100,
    vtbi: 250,
    dose: 1000,
    description: 'IV antibiotic therapy',
    color: 'from-green-400 to-green-600',
    icon: '💊',
  },
  {
    name: 'Insulin Drip',
    drugName: 'Insulin',
    rate: 5,
    vtbi: 50,
    dose: 50,
    description: 'Continuous insulin infusion',
    color: 'from-amber-400 to-orange-500',
    icon: '🩸',
  },
  {
    name: 'Blood Transfusion',
    drugName: 'PRBCs',
    rate: 150,
    vtbi: 300,
    dose: 0,
    description: 'Packed red blood cell transfusion',
    color: 'from-red-400 to-red-600',
    icon: '🅱️',
  },
  {
    name: 'ICU Sedation',
    drugName: 'Propofol',
    rate: 20,
    vtbi: 200,
    dose: 200,
    description: 'Continuous sedation for ICU',
    color: 'from-purple-400 to-purple-600',
    icon: '😴',
  },
];

// ─── Reducer ─────────────────────────────────────────────────────────
function simulatorReducer(state: SimulatorState, action: SimulatorAction): SimulatorState {
  switch (action.type) {
    case 'POWER_ON':
      if (state.pumpState !== 'OFF') return state;
      return { ...initialState, pumpState: 'IDLE', batteryLevel: state.batteryLevel, infusionHistory: state.infusionHistory };

    case 'POWER_OFF':
      return { ...state, pumpState: 'OFF', alarmType: null, alarmMessage: '', isPriming: false, preAlarmState: null };

    case 'GO_PROGRAMMING':
      if (state.pumpState !== 'IDLE') return state;
      return { ...state, pumpState: 'PROGRAMMING', programmingField: 'drug' };

    case 'SET_DRUG':
      return { ...state, drugName: action.payload };

    case 'SET_RATE':
      return { ...state, infusionRate: action.payload };

    case 'SET_VTBI':
      return { ...state, vtbi: action.payload };

    case 'SET_DOSE':
      return { ...state, dose: action.payload };

    case 'SET_FIELD':
      return { ...state, programmingField: action.payload };

    case 'CONFIRM':
      if (state.pumpState !== 'PROGRAMMING') return state;
      return { ...state, pumpState: 'CONFIRMING' };

    case 'BACK_TO_PROGRAMMING':
      if (state.pumpState !== 'CONFIRMING') return state;
      return { ...state, pumpState: 'PROGRAMMING' };

    case 'START':
      if (state.pumpState !== 'CONFIRMING' && state.pumpState !== 'IDLE') return state;
      return {
        ...state,
        pumpState: 'RUNNING',
        remainingVolume: state.vtbi,
        elapsedTime: 0,
        totalInfused: 0,
      };

    case 'PAUSE':
      if (state.pumpState !== 'RUNNING') return state;
      return { ...state, pumpState: 'PAUSED' };

    case 'RESUME':
      if (state.pumpState !== 'PAUSED') return state;
      return { ...state, pumpState: 'RUNNING' };

    case 'STOP': {
      if (state.pumpState !== 'RUNNING' && state.pumpState !== 'PAUSED' && state.pumpState !== 'COMPLETED') return state;
      const record: InfusionRecord = {
        drugName: state.drugName,
        rate: state.infusionRate,
        vtbi: state.vtbi,
        startedAt: new Date(Date.now() - state.elapsedTime * 1000).toLocaleTimeString(),
        completedAt: new Date().toLocaleTimeString(),
        status: state.pumpState === 'COMPLETED' ? 'completed' : 'stopped',
      };
      return {
        ...state,
        pumpState: 'IDLE',
        elapsedTime: 0,
        remainingVolume: 0,
        totalInfused: 0,
        infusionHistory: [...state.infusionHistory, record],
      };
    }

    case 'PRIME':
      if (state.pumpState !== 'IDLE') return state;
      return { ...state, isPriming: true };

    case 'PRIME_COMPLETE':
      return { ...state, isPriming: false };

    case 'TRIGGER_ALARM': {
      if (state.pumpState === 'OFF') return state;
      return {
        ...state,
        preAlarmState: state.pumpState,
        pumpState: 'ALARM',
        alarmType: action.payload.alarmType,
        alarmMessage: action.payload.message,
      };
    }

    case 'CLEAR_ALARM': {
      if (state.pumpState !== 'ALARM') return state;
      const returnState = state.preAlarmState === 'RUNNING' ? 'PAUSED' : (state.preAlarmState || 'IDLE');
      return {
        ...state,
        pumpState: returnState,
        alarmType: null,
        alarmMessage: '',
        preAlarmState: null,
        batteryLevel: state.alarmType === 'low_battery' ? 30 : state.batteryLevel,
      };
    }

    case 'TICK': {
      if (state.pumpState !== 'RUNNING') return state;
      // 1 real second = 1 simulated minute
      const volumePerTick = state.infusionRate / 60; // mL per simulated minute
      const newRemaining = Math.max(0, state.remainingVolume - volumePerTick);
      const newInfused = state.vtbi - newRemaining;
      const newElapsed = state.elapsedTime + 60; // 60 simulated seconds per tick
      const newBattery = Math.max(0, state.batteryLevel - 0.05);

      if (newRemaining <= 0) {
        const record: InfusionRecord = {
          drugName: state.drugName,
          rate: state.infusionRate,
          vtbi: state.vtbi,
          startedAt: new Date(Date.now() - state.elapsedTime * 1000).toLocaleTimeString(),
          completedAt: new Date().toLocaleTimeString(),
          status: 'completed',
        };
        return {
          ...state,
          pumpState: 'COMPLETED',
          remainingVolume: 0,
          totalInfused: state.vtbi,
          elapsedTime: newElapsed,
          infusionHistory: [...state.infusionHistory, record],
        };
      }

      // Auto-trigger low battery alarm
      if (newBattery <= 10 && state.batteryLevel > 10) {
        return {
          ...state,
          preAlarmState: 'RUNNING',
          pumpState: 'ALARM',
          alarmType: 'low_battery',
          alarmMessage: 'Battery level critical. Connect to AC power.',
          remainingVolume: newRemaining,
          totalInfused: newInfused,
          elapsedTime: newElapsed,
          batteryLevel: newBattery,
        };
      }

      return {
        ...state,
        remainingVolume: newRemaining,
        totalInfused: newInfused,
        elapsedTime: newElapsed,
        batteryLevel: newBattery,
      };
    }

    case 'LOAD_SCENARIO':
      return {
        ...state,
        pumpState: state.pumpState === 'OFF' ? 'PROGRAMMING' : 'PROGRAMMING',
        drugName: action.payload.drugName,
        infusionRate: action.payload.rate,
        vtbi: action.payload.vtbi,
        dose: action.payload.dose,
        programmingField: null,
        remainingVolume: action.payload.vtbi,
        elapsedTime: 0,
        totalInfused: 0,
      };

    case 'VIEW_HISTORY':
      return state; // handled at component level

    case 'BACK_TO_IDLE':
      return { ...state, pumpState: 'IDLE', programmingField: null };

    default:
      return state;
  }
}

// ─── Hook ────────────────────────────────────────────────────────────
export function useSimulatorStore() {
  const [state, dispatch] = useReducer(simulatorReducer, initialState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer management
  useEffect(() => {
    if (state.pumpState === 'RUNNING') {
      timerRef.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000); // 1 real second = 1 simulated minute
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.pumpState]);

  // Priming effect
  useEffect(() => {
    if (state.isPriming) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'PRIME_COMPLETE' });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [state.isPriming]);

  const actions = {
    powerOn: useCallback(() => dispatch({ type: 'POWER_ON' }), []),
    powerOff: useCallback(() => dispatch({ type: 'POWER_OFF' }), []),
    goProgramming: useCallback(() => dispatch({ type: 'GO_PROGRAMMING' }), []),
    setDrug: useCallback((name: string) => dispatch({ type: 'SET_DRUG', payload: name }), []),
    setRate: useCallback((rate: number) => dispatch({ type: 'SET_RATE', payload: rate }), []),
    setVtbi: useCallback((vtbi: number) => dispatch({ type: 'SET_VTBI', payload: vtbi }), []),
    setDose: useCallback((dose: number) => dispatch({ type: 'SET_DOSE', payload: dose }), []),
    setField: useCallback((field: SimulatorState['programmingField']) => dispatch({ type: 'SET_FIELD', payload: field }), []),
    confirm: useCallback(() => dispatch({ type: 'CONFIRM' }), []),
    backToProgramming: useCallback(() => dispatch({ type: 'BACK_TO_PROGRAMMING' }), []),
    start: useCallback(() => dispatch({ type: 'START' }), []),
    pause: useCallback(() => dispatch({ type: 'PAUSE' }), []),
    resume: useCallback(() => dispatch({ type: 'RESUME' }), []),
    stop: useCallback(() => dispatch({ type: 'STOP' }), []),
    prime: useCallback(() => dispatch({ type: 'PRIME' }), []),
    triggerAlarm: useCallback((alarmType: AlarmType, message: string) =>
      dispatch({ type: 'TRIGGER_ALARM', payload: { alarmType, message } }), []),
    clearAlarm: useCallback(() => dispatch({ type: 'CLEAR_ALARM' }), []),
    loadScenario: useCallback((scenario: { drugName: string; rate: number; vtbi: number; dose: number }) =>
      dispatch({ type: 'LOAD_SCENARIO', payload: scenario }), []),
    backToIdle: useCallback(() => dispatch({ type: 'BACK_TO_IDLE' }), []),
  };

  return { state, actions };
}
