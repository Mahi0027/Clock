import {
    GET_ALL_SILENT_INTERVALS,
    SET_INITIAL_STATES_FOR_ALARM_SILENT,
    SET_SILENT_INTERVAL,
} from "./silentTypes";

export const setInitialStatesForAlarmSilent = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_ALARM_SILENT,
        payload: value,
    };
};

export const setSilentInterval = (value: string) => {
    return {
        type: SET_SILENT_INTERVAL,
        payload: value,
    };
};
