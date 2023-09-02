import {
    ADD_OR_REDUCE_TIME_IN_TIMER,
    DELETE_TIMER,
    GET_ALL_TIMERS,
    SET_TIMER,
    SET_TIMER_COMPLETED_FLAG,
    SET_TIMER_RING_DOM,
    SET_TIMER_SOUND,
    UPDATE_REMAINING_TIME,
    UPDATE_TIMER_INTERVAL_REF,
    UPDATE_TIMER_LABEL,
    UPDATE_TIMER_PAUSE_FLAG,
    UPDATE_TIMER_SCHEDULE_FLAG,
    UPDATE_TIMER_TIME,
} from "./types";

export const getAllTimers = () => {
    return {
        type: GET_ALL_TIMERS,
    };
};

export const setTimer = (newPeriod: number) => {
    return {
        type: SET_TIMER,
        payload: newPeriod,
    };
};

export const updateTimerTime = (id: number, newPeriod: number) => {
    return {
        type: UPDATE_TIMER_TIME,
        payload: { id, newPeriod },
    };
};

export const updateRemainingTimerTime = (id: number) => {
    return {
        type: UPDATE_REMAINING_TIME,
        payload: { id },
    };
};

export const updateTimerScheduleFlag = (
    id: number,
    currentScheduleFlag: boolean
) => {
    return {
        type: UPDATE_TIMER_SCHEDULE_FLAG,
        payload: { id, currentScheduleFlag },
    };
};

export const updateTimerLabel = (id: number, label: string) => {
    return {
        type: UPDATE_TIMER_LABEL,
        payload: { id, label },
    };
};

export const setTimerSound = (id: number, timerSound: string) => {
    return {
        type: SET_TIMER_SOUND,
        payload: { id, timerSound },
    };
};

export const deleteTimer = (id: number) => {
    return {
        type: DELETE_TIMER,
        payload: { id },
    };
};

export const updateTimerIntervalRef = (id: number, timerIntervalRef: any) => {
    return {
        type: UPDATE_TIMER_INTERVAL_REF,
        payload: { id, timerIntervalRef },
    };
};

export const updatePauseFlag = (id: number, flag: boolean) => {
    return {
        type: UPDATE_TIMER_PAUSE_FLAG,
        payload: { id, flag },
    };
};

export const addOrReduceTimeInTimer = (id: number, newPeriod: number) => {
    return {
        type: ADD_OR_REDUCE_TIME_IN_TIMER,
        payload: { id, newPeriod },
    };
};

export const setTimerRingDOM = (id: number, value: any) => {
    return {
        type: SET_TIMER_RING_DOM,
        payload: { id, value },
    };
};

export const setTimerCompletedFlag = (id: number, flag: boolean) => {
    return {
        type: SET_TIMER_COMPLETED_FLAG,
        payload: { id, flag },
    };
};
