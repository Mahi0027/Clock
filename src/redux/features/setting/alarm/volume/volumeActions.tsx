import { SET_INITIAL_STATES_FOR_ALARM_VOLUME, SET_VOLUME } from "./volumeTypes";

export const setInitialStatesForAlarmVolume = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_ALARM_VOLUME,
        payload: value,
    };
};
export const setVolume = (value: number) => {
    return {
        type: SET_VOLUME,
        payload: value,
    };
};
