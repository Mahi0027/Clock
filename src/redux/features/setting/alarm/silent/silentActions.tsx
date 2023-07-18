import { GET_ALL_SILENT_INTERVALS, SET_SILENT_INTERVAL } from "./silentTypes";

export const getAllSilentIntervals = () => {
    return {
        type: GET_ALL_SILENT_INTERVALS,
    };
};

export const setSilentInterval = (value: string) => {
    return {
        type: SET_SILENT_INTERVAL,
        payload: value,
    };
};
