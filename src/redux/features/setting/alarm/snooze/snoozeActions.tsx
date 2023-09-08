import {
    GET_ALL_SNOOZE_INTERVALS,
    SET_INITIAL_STATES_FOR_ALARM_SNOOZE,
    SET_SNOOZE_INTERVAL,
} from "./snoozeTypes";

export const setInitialStatesForAlarmSnooze = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_ALARM_SNOOZE,
        payload: value,
    };
};

export const getAllSnoozeIntervals = () => {
    return {
        type: GET_ALL_SNOOZE_INTERVALS,
    };
};

export const setSnoozeInterval = (value: string) => {
    return {
        type: SET_SNOOZE_INTERVAL,
        payload: value,
    };
};
