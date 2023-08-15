import {
    DELETE_TIMER,
    GET_ALL_TIMERS,
    SET_TIMER,
    SET_TIMER_SOUND,
    UPDATE_TIMER_LABEL,
    UPDATE_TIMER_SCHEDULE_FLAG,
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
