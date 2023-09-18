import {
    setAlarmInDB,
    storeInitialAlarmDataInDB,
} from "@/database/indexedDB/home/alarm";
import {
    deleteAlarm,
    setAlarm,
    setAlarmSound,
    setInitialStatesForAlarm,
    setRepeatAlarm,
    toggleTempFlag,
    updateAlarmLabel,
    updateAlarmScheduleFlag,
    updateAlarmTime,
} from "@/redux";

/* The `dayHashTable` is an array that maps the index of each day of the week to its corresponding
string representation. It is used in the `setRepeatAlarmMiddleware` function to access the correct
day of the week when updating the repeat flag for an alarm. */
const dayHashTable = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

/**
 * The function initializes alarm states by storing initial alarm data in a database and dispatching an
 * action to set the initial states for alarms.
 * @returns a middleware function.
 */
export const initializeAlarmStatesMiddleware = async () => {
    const result = await storeInitialAlarmDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForAlarm(result));
    };
};

/**
 * The setAlarmMiddleware function is a middleware that sets an alarm value in the Redux store and
 * updates the alarm value in the database.
 * @param {Date} value - The `value` parameter is the new alarm date that needs to be set. It is of
 * type `Date`.
 * @param getStateData - getStateData is a function that returns the current state data. It is used to
 * retrieve the updated state details before calling the setAlarmInDB function.
 * @returns The setAlarmMiddleware function returns an async function that takes in a dispatch function
 * as an argument.
 */
export const setAlarmMiddleware = (value: Date, getStateData: () => any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAlarm(value));
            const statesDetails = getStateData();
            const lastAlarmId =
                statesDetails.alarms.length === 0
                    ? 0
                    : statesDetails.alarms[0].id;
            statesDetails.alarms = [
                {
                    id: lastAlarmId + 1,
                    alarmTime: value,
                    repeat: {
                        sunday: {
                            flag: false,
                            time: null,
                        },
                        monday: {
                            flag: false,
                            time: null,
                        },
                        tuesday: {
                            flag: false,
                            time: null,
                        },
                        wednesday: {
                            flag: false,
                            time: null,
                        },
                        thursday: {
                            flag: false,
                            time: null,
                        },
                        friday: {
                            flag: false,
                            time: null,
                        },
                        saturday: {
                            flag: false,
                            time: null,
                        },
                    },
                    currentScheduleFlag: true,
                    repeatFlag: false,
                    sound: "bell",
                    label: null,
                },
                ...statesDetails.alarms,
            ];
            await setAlarmInDB(statesDetails);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

/**
 * The `updateAlarmTimeMiddleware` function is a middleware that updates the alarm time in the Redux
 * store and then saves the updated alarm details in the database.
 * @param {number} alarmId - The ID of the alarm that needs to be updated.
 * @param {Date} customDate - The customDate parameter is the new date and time for the alarm that
 * needs to be updated.
 * @param getStateData - getStateData is a function that returns the current state data. It is used to
 * retrieve the updated state details after dispatching the updateAlarmTime action.
 * @returns The updateAlarmTimeMiddleware function returns a function that takes in a dispatch function
 * as an argument.
 */
export const updateAlarmTimeMiddleware = (
    alarmId: number,
    customDate: Date,
    getStateData: () => any
) => {
    return async (dispatch: any) => {
        try {
            dispatch(updateAlarmTime(alarmId, customDate));
            const statesDetails = getStateData();
            const updatedAlarmForUpdatedTime = statesDetails.alarms.map(
                (alarm: any) => {
                    return alarm.id === alarmId
                        ? {
                              ...alarm,
                              alarmTime: customDate,
                          }
                        : alarm;
                }
            );
            statesDetails.alarms = updatedAlarmForUpdatedTime;
            await setAlarmInDB(statesDetails);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

/**
 * The `updateAlarmScheduleFlagMiddleware` function is a middleware that updates the schedule flag of
 * an alarm and saves the updated alarm details in the database.
 * @param {number} alarmId - The ID of the alarm that needs to be updated.
 * @param {boolean} currentScheduleFlag - The current value of the schedule flag for the alarm.
 * @param getStateData - A function that returns the current state data.
 * @returns The middleware function is returning a function that takes in a dispatch function as an
 * argument.
 */
export const updateAlarmScheduleFlagMiddleware = (
    alarmId: number,
    currentScheduleFlag: boolean,
    getStateData: any
) => {
    return async (dispatch: any) => {
        try {
            await dispatch(
                updateAlarmScheduleFlag(alarmId, currentScheduleFlag)
            );
            const statesDetails = getStateData();
            const updatedAlarmsForScheduleFlag = statesDetails.alarms.map(
                (alarm: any) => {
                    return alarm.id === alarmId
                        ? {
                              ...alarm,
                              currentScheduleFlag: currentScheduleFlag,
                          }
                        : alarm;
                }
            );
            statesDetails.alarms = updatedAlarmsForScheduleFlag;
            await setAlarmInDB(statesDetails);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

/**
 * The `updateAlarmLabelMiddleware` function is a middleware that updates the label of an alarm and
 * saves the updated alarm details in a database.
 * @param {number} alarmId - The ID of the alarm that needs to be updated.
 * @param {string} label - The `label` parameter is a string that represents the new label for the
 * alarm.
 * @param getStateData - getStateData is a function that returns the current state data. It is used to
 * retrieve the updated state details after dispatching the updateAlarmLabel action.
 * @returns The `updateAlarmLabelMiddleware` function returns an asynchronous function that takes in a
 * `dispatch` function as an argument.
 */
export const updateAlarmLabelMiddleware = (
    alarmId: number,
    label: string,
    getStateData: () => any
) => {
    return async (dispatch: any) => {
        try {
            dispatch(updateAlarmLabel(alarmId, label));
            const statesDetails = getStateData();
            const updatedAlarmsForLabel = statesDetails.alarms.map(
                (alarm: any) => {
                    return alarm.id === alarmId
                        ? { ...alarm, label: label }
                        : alarm;
                }
            );
            statesDetails.alarms = updatedAlarmsForLabel;
            await setAlarmInDB(statesDetails);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

/**
 * The `setAlarmSoundMiddleware` function is a middleware that dispatches an action to set the alarm
 * sound and updates the alarm state in the database.
 * @param {number} alarmId - The ID of the alarm that needs to be updated with a new sound.
 * @param {string} alarmSound - The `alarmSound` parameter is a string that represents the sound file
 * or URL for the alarm sound.
 * @param getStateData - getStateData is a function that returns the current state data. It is used to
 * retrieve the updated state details before saving them to the database.
 * @returns The setAlarmSoundMiddleware function returns an async function that takes in a dispatch
 * function as an argument.
 */
export const setAlarmSoundMiddleware = (
    alarmId: number,
    alarmSound: string,
    getStateData: () => any
) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAlarmSound(alarmId, alarmSound));
            const statesDetails = getStateData();
            const updatedAlarmForSound = statesDetails.alarms.map(
                (alarm: any) => {
                    return alarm.id === alarmId
                        ? { ...alarm, sound: alarmSound }
                        : alarm;
                }
            );
            statesDetails.alarms = updatedAlarmForSound;
            await setAlarmInDB(statesDetails);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

/**
 * The deleteAlarmMiddleware function is a middleware that deletes an alarm, updates the state, and
 * saves the updated state in the database.
 * @param {number} alarmId - The `alarmId` parameter is a number that represents the unique identifier
 * of the alarm that needs to be deleted.
 * @param getStateData - getStateData is a function that returns the current state data. It is used to
 * retrieve the updated state details after deleting an alarm.
 * @returns The deleteAlarmMiddleware function returns an async function that takes in a dispatch
 * function as an argument.
 */
export const deleteAlarmMiddleware = (
    alarmId: number,
    getStateData: () => any
) => {
    return async (dispatch: any) => {
        try {
            dispatch(deleteAlarm(alarmId));
            const statesDetails = getStateData();
            const indexOfDeleteAlarm = statesDetails.alarms.findIndex(
                (alarm: any) => alarm.id === alarmId
            );
            if (indexOfDeleteAlarm !== -1)
                statesDetails.alarms.splice(indexOfDeleteAlarm, 1);
            await setAlarmInDB(statesDetails);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

/**
 * The setRepeatAlarmMiddleware function is a middleware that dispatches an action to set a repeat
 * alarm and updates the alarm in the database.
 * @param {number} alarmId - The ID of the alarm that needs to be updated.
 * @param {Date} newAlarmTime - The new time for the alarm to be set. It should be a Date object
 * representing the desired time for the alarm.
 * @param {number} dayOfWeek - The `dayOfWeek` parameter represents the day of the week for which the
 * alarm should repeat. It is a number that corresponds to the day of the week, where 0 represents
 * Sunday, 1 represents Monday, and so on.
 * @param getStateData - getStateData is a function that returns the current state data. It is used to
 * retrieve the updated state details before saving them in the database.
 * @returns a new function that is an async thunk.
 */
export const setRepeatAlarmMiddleware = (
    alarmId: number,
    newAlarmTime: Date,
    dayOfWeek: number,
    getStateData: () => any
) => {
    return async (dispatch: any) => {
        try {
            dispatch(setRepeatAlarm(alarmId, newAlarmTime, dayOfWeek));
            const statesDetails = getStateData();
            const updatedAlarmForRepeat = statesDetails.alarms.map(
                (alarm: any) => {
                    const flagStatus: boolean =
                        alarm.repeat[dayHashTable[dayOfWeek]].flag;
                    return alarm.id === alarmId
                        ? {
                              ...alarm,
                              repeat: {
                                  ...alarm.repeat,
                                  [dayHashTable[dayOfWeek]]: {
                                      flag: !alarm.repeat[
                                          dayHashTable[dayOfWeek]
                                      ].flag,
                                      time: !flagStatus ? newAlarmTime : null,
                                  },
                              },
                          }
                        : alarm;
                }
            );
            statesDetails.alarms = updatedAlarmForRepeat;
            await setAlarmInDB(statesDetails);
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
