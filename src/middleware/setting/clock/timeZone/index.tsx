import {
    setCurrentTimeZoneInDB,
    storeInitialTimeZoneDataInDB,
} from "@/database/indexedDB/setting/clock/timeZone";
import { setInitialStatesForTimeZone, setTimeZone } from "@/redux";

/**
 * The function initializes time zone states by storing initial data in a database and dispatching an
 * action to set the initial states.
 * @returns a middleware function.
 */
export const initializeTimeZoneStatesMiddleware = async () => {
    const result = await storeInitialTimeZoneDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForTimeZone(result));
    };
};

/**
 * The function sets the current time zone in the database and dispatches an action to update the time
 * zone in the Redux store.
 * @param {string} value - The value parameter is a string that represents the current time zone.
 * @returns The middleware function is returning a function that takes a dispatch parameter.
 */
export const setCurrentTimeZoneMiddleware = async (value: string) => {
    await setCurrentTimeZoneInDB(value);
    return (dispatch: any) => {
        dispatch(setTimeZone(value));
    };
};
