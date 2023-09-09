import {
    GET_ALL_TIMER_SOUNDS,
    SET_INITIAL_STATES_FOR_TIMER_SETTING,
    SET_TIMER_SILENT_INTERVAL,
    SET_TIMER_SOUND,
    SET_TIMER_VOLUME,
} from "./types";

export const setInitialStatesForTimerSetting = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_TIMER_SETTING,
        payload: value,
    };
};

export const setTimerSound = (value: string) => {
    return {
        type: SET_TIMER_SOUND,
        payload: value,
    };
};

export const setTimerVolume = (value: number) => {
    return {
        type: SET_TIMER_VOLUME,
        payload: value,
    };
};

export const setTimerSilentInterval = (value: string) => {
    return {
        type: SET_TIMER_SILENT_INTERVAL,
        payload: value,
    };
};
