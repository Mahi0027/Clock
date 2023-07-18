import { GET_ALL_SNOOZE_INTERVALS, SET_SNOOZE_INTERVAL } from "./snoozeTypes";

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
