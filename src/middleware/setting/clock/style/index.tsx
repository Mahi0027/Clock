import {
    setCurrentClockStyleInDB,
    storeInitialClockStyleDataInDB,
} from "@/database/indexedDB/setting/clock/style";
import { setInitialStatesForClockStyle, setStyle } from "@/redux";

/**
 * The function initializes clock style states by storing initial data in a database and dispatching an
 * action to set the initial states.
 * @returns a middleware function.
 */
export const initializeClockStyleStatesMiddleware = async () => {
    const result = await storeInitialClockStyleDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForClockStyle(result));
    };
};

/**
 * The function sets the current clock style in the database and dispatches an action to update the
 * style in the Redux store.
 * @param {string} value - The `value` parameter is a string that represents the new clock style that
 * needs to be set.
 * @returns a function that takes a dispatch parameter and dispatches an action with the value passed
 * as an argument.
 */
export const setCurrentClockStyleMiddleware = async (value: string) => {
    await setCurrentClockStyleInDB(value);
    return (dispatch: any) => {
        dispatch(setStyle(value));
    };
};
