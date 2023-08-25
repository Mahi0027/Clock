import {
    GET_ALL_TIMER_SOUNDS,
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

type actionTypes = {
    type: string;
    payload?: string;
};

export type initialStatesTypes = {
    allTimerSounds: string[];
    currentTimerSound: string;
    timerMinVolume: number;
    timerMaxVolume: number;
    timerCurrentVolume: number;
};
const initialStates: initialStatesTypes = {
    allTimerSounds: [],
    currentTimerSound: timerSounds[1],
    timerMinVolume: 0,
    timerMaxVolume: 100,
    timerCurrentVolume: 25,
};

const timerSettingReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_ALL_TIMER_SOUNDS:
            return {
                ...state,
                allTimerSounds: timerSounds,
            };
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
        default:
            return state;
    }
};

export default timerSettingReducer;
