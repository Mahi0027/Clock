import {
    DELETE_ALARM,
    GET_ALL_ALARMS,
    SET_ALARM,
    SET_ALARM_SOUND,
    SET_INITIAL_STATES_FOR_ALARM,
    SET_REPEAT_ALARM,
    UPDATE_ALARM_LABEL,
    UPDATE_ALARM_SCHEDULE_FLAG,
    UPDATE_ALARM_TIME,
} from "./types";

export const setInitialStatesForAlarm = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_ALARM,
        payload: value,
    };
};

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

export const updateAlarmTime = (id: number, updatedAlarmTime: Date) => {
    return {
        type: UPDATE_ALARM_TIME,
        payload: { id, updatedAlarmTime },
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

export const setAlarmSound = (id: number = -1, alarmSound: string) => {
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
