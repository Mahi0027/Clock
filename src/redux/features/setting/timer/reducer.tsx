import {
    GET_ALL_TIMER_SOUNDS,
    SET_INITIAL_STATES_FOR_TIMER_SETTING,
    SET_TIMER_SILENT_INTERVAL,
    SET_TIMER_SOUND,
    SET_TIMER_VOLUME,
} from "./types";

const timerSounds = [
    "bedside",
    "bell",
    "digital",
    "joy",
    "naturesounds",
    "oldmechanic",
    "oldphone",
    "oversimplified",
    "ringtone",
    "short",
];

const allSilentIntervalStaticValues: string[] = [
    "1 minute",
    "5 minutes",
    "10 minutes",
    "15 minutes",
    "20 minutes",
    "25 minutes",
];

type actionTypes = {
    type: string;
    payload?: string;
};

export type initialStatesTypes = {
    allTimerSounds: string[];
    allTimerSilentIntervals: string[];
    currentTimerSound: string;
    currentSilentInterval: string;
    timerMinVolume: number;
    timerMaxVolume: number;
    timerCurrentVolume: number;
};
const initialStates: initialStatesTypes = {
    allTimerSounds: timerSounds,
    allTimerSilentIntervals: allSilentIntervalStaticValues,
    currentTimerSound: timerSounds[1],
    currentSilentInterval: allSilentIntervalStaticValues[0],
    timerMinVolume: 0,
    timerMaxVolume: 100,
    timerCurrentVolume: 25,
};

const timerSettingReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case SET_INITIAL_STATES_FOR_TIMER_SETTING:
            return action.payload;
        case SET_TIMER_SOUND:
            return {
                ...state,
                currentTimerSound: action.payload,
            };
        case SET_TIMER_VOLUME:
            return {
                ...state,
                timerCurrentVolume: action.payload,
            };
        case SET_TIMER_SILENT_INTERVAL:
            return {
                ...state,
                currentSilentInterval: action.payload,
            };
        default:
            return state;
    }
};

export default timerSettingReducer;
