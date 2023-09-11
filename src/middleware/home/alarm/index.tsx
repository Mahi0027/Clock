import {
    setAlarmInDB,
    storeInitialAlarmDataInDB,
} from "@/database/indexedDB/home/alarm";
import {
    setTimerSilentInDB,
    setTimerSoundInDB,
    setTimerVolumeInDB,
    storeInitialTimerSettingDataInDB,
} from "@/database/indexedDB/setting/timer";
import {
    deleteAlarm,
    setAlarm,
    setAlarmSound,
    setInitialStatesForAlarm,
    setRepeatAlarm,
    updateAlarmLabel,
    updateAlarmScheduleFlag,
    updateAlarmTime,
} from "@/redux";

export const initializeAlarmStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialAlarmDataInDB();
            dispatch(setInitialStatesForAlarm(result));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setAlarmMiddleware = (value: Date) => {
    return async (dispatch: any, getStateData: any) => {
        try {
            await dispatch(setAlarm(value));
            const updatedStatesDetails = getStateData();
            await setAlarmInDB(updatedStatesDetails.alarm);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const updateAlarmTimeMiddleware = (
    alarmId: number,
    customDate: Date
) => {
    return async (dispatch: any, getStateData: any) => {
        try {
            await dispatch(updateAlarmTime(alarmId, customDate));
            const updatedStatesDetails = getStateData();
            await setAlarmInDB(updatedStatesDetails.alarm);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const updateAlarmScheduleFlagMiddleware = (
    alarmId: number,
    currentScheduleFlag: boolean
) => {
    return async (dispatch: any, getStateData: any) => {
        try {
            await dispatch(
                updateAlarmScheduleFlag(alarmId, currentScheduleFlag)
            );
            const updatedStatesDetails = getStateData();
            await setAlarmInDB(updatedStatesDetails.alarm);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const updateAlarmLabelMiddleware = (alarmId: number, label: string) => {
    return async (dispatch: any, getStateData: any) => {
        try {
            await dispatch(updateAlarmLabel(alarmId, label));
            const updatedStatesDetails = getStateData();
            await setAlarmInDB(updatedStatesDetails.alarm);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setAlarmSoundMiddleware = (
    alarmId: number,
    alarmSound: string
) => {
    return async (dispatch: any, getStateData: any) => {
        try {
            await dispatch(setAlarmSound(alarmId, alarmSound));
            const updatedStatesDetails = getStateData();
            await setAlarmInDB(updatedStatesDetails.alarm);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const deleteAlarmMiddleware = (alarmId: number) => {
    return async (dispatch: any, getStateData: any) => {
        try {
            await dispatch(deleteAlarm(alarmId));
            const updatedStatesDetails = getStateData();
            await setAlarmInDB(updatedStatesDetails.alarm);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setRepeatAlarmMiddleware = (
    alarmId: number,
    newAlarmTime: Date,
    dayOfWeek: number
) => {
    return async (dispatch: any, getStateData: any) => {
        try {
            await dispatch(setRepeatAlarm(alarmId, newAlarmTime, dayOfWeek));
            const updatedStatesDetails = getStateData();
            await setAlarmInDB(updatedStatesDetails.alarm);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
