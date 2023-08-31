import {
    SET_SNAPSHOT,
    SET_CURRENT_PLAY_FLAG,
    SET_HOUR,
    SET_MILLISECOND,
    SET_MINUTE,
    SET_SECOND,
    SET_SHOW_HOUR,
    SET_SHOW_MILLISECOND,
    SET_SHOW_MINUTE,
    SET_SHOW_SECOND,
    SET_STOPWATCH_TIMER,
    GET_STOPWATCH_STATES,
    STOP_STOPWATCH,
    SET_LEAVE_PAGE_TIME,
} from "./types";

export const setHour = (value: number) => {
    return {
        type: SET_HOUR,
        payload: value,
    };
};

export const setMinute = (value: number) => {
    return {
        type: SET_MINUTE,
        payload: value,
    };
};

export const setSecond = (value: number) => {
    return {
        type: SET_SECOND,
        payload: value,
    };
};

export const setMillisecond = (value: number) => {
    return {
        type: SET_MILLISECOND,
        payload: value,
    };
};

export const setShowHour = (value: string) => {
    return {
        type: SET_SHOW_HOUR,
        payload: value,
    };
};

export const setShowMinute = (value: string) => {
    return {
        type: SET_SHOW_MINUTE,
        payload: value,
    };
};

export const setShowSecond = (value: string) => {
    return {
        type: SET_SHOW_SECOND,
        payload: value,
    };
};

export const setShowMillisecond = (value: string) => {
    return {
        type: SET_SHOW_MILLISECOND,
        payload: value,
    };
};

export const setStopwatchTimer = (value: any) => {
    return {
        type: SET_STOPWATCH_TIMER,
        payload: value,
    };
};

export const setSnapshot = (value: string[]) => {
    return {
        type: SET_SNAPSHOT,
        payload: value,
    };
};

export const setCurrentPlayFlag = (value: boolean) => {
    return {
        type: SET_CURRENT_PLAY_FLAG,
        payload: value,
    };
};

export const setLeavePageTime = (value: Date) => {
    return {
        type: SET_LEAVE_PAGE_TIME,
        payload: value,
    };
};

export const getStopwatchStates = () => {
    return {
        type: GET_STOPWATCH_STATES,
    };
};

export const stopStopwatch = () => {
    return {
        type: STOP_STOPWATCH,
    };
};
