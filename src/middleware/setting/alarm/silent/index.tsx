import {
    setCurrentAlarmSilentInDB,
    storeInitialAlarmSilentDataInDB,
} from "@/database/indexedDB/setting/alarm/silent";
import { setInitialStatesForAlarmSilent, setSilentInterval } from "@/redux";

/**
 * The function initializes the alarm silent states middleware by storing initial alarm silent data in
 * the database and dispatching an action to set the initial states for alarm silent.
 * @returns a middleware function.
 */
export const initializeAlarmSilentStatesMiddleware = async () => {
    const result = await storeInitialAlarmSilentDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForAlarmSilent(result));
    };
};

/**
 * The function sets the current alarm to silent in the database and dispatches an action to update the
 * silent interval.
 * @param {string} value - The `value` parameter is a string that represents the new value for the
 * current alarm's silent status.
 * @returns a dispatch function.
 */
export const setCurrentAlarmSilentMiddleware = async (value: string) => {
    await setCurrentAlarmSilentInDB(value);
    return (dispatch: any) => {
        dispatch(setSilentInterval(value));
    };
};
