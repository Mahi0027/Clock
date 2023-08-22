import {
    DELETE_ALARM,
    GET_ALL_ALARMS,
    SET_ALARM,
    SET_ALARM_SOUND,
    SET_REPEAT_ALARM,
    UPDATE_ALARM_LABEL,
    UPDATE_ALARM_SCHEDULE_FLAG,
} from "./types";

export const getAllAlarm = () => {
    return {
        type: GET_ALL_ALARMS,
    };
};

export const setAlarm = (newAlarmTime: Date) => {
    return {
        type: SET_ALARM,
        payload: newAlarmTime,
    };
};

export const updateAlarmScheduleFlag = (
    id: number,
    currentScheduleFlag: boolean
) => {
    return {
        type: UPDATE_ALARM_SCHEDULE_FLAG,
        payload: { id, currentScheduleFlag },
    };
};

export const updateAlarmLabel = (id: number, label: string) => {
    return {
        type: UPDATE_ALARM_LABEL,
        payload: { id, label },
    };
};

export const setAlarmSound = (id: number, alarmSound: string) => {
    return {
        type: SET_ALARM_SOUND,
        payload: { id, alarmSound },
    };
};

export const deleteAlarm = (id: number) => {
    return {
        type: DELETE_ALARM,
        payload: { id },
    };
};

export const setRepeatAlarm = (
    id: number,
    newAlarmTime: Date,
    dayOfWeek: number
) => {
    return {
        type: SET_REPEAT_ALARM,
        payload: { id, newAlarmTime, dayOfWeek },
    };
};
