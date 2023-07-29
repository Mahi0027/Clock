import { GET_ALL_ALARMS, SET_ALARM, UPDATE_ALARM_SCHEDULE_FLAG } from "./types";

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

export const updateAlarmScheduleFlag = (id: number, currentScheduleFlag: boolean) => {
    return {
        type: UPDATE_ALARM_SCHEDULE_FLAG,
        payload: { id, currentScheduleFlag },
    };
};
