import {
    setCurrentAlarmSnoozeInDB,
    storeInitialAlarmSnoozeDataInDB,
} from "@/database/indexedDB/setting/alarm/snooze";
import { setInitialStatesForAlarmSnooze, setSnoozeInterval } from "@/redux";

/**
 * The function initializes alarm snooze states by storing initial data in a database and dispatching
 * an action to set the initial states.
 * @returns a middleware function.
 */
export const initializeAlarmSnoozeStatesMiddleware = async () => {
    const result = await storeInitialAlarmSnoozeDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForAlarmSnooze(result));
    };
};

/**
 * The function sets the current alarm snooze in the database and dispatches an action to update the
 * snooze interval.
 * @param {string} value - The value parameter is a string that represents the snooze interval for the
 * alarm.
 * @returns a dispatch function.
 */
export const setCurrentAlarmSnoozeMiddleware = async (value: string) => {
    await setCurrentAlarmSnoozeInDB(value);
    return (dispatch: any) => {
        dispatch(setSnoozeInterval(value));
    };
};
