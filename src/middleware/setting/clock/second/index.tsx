import {
    setCurrentSecondFlagInDB,
    storeInitialSecondFlagDataInDB,
} from "@/database/indexedDB/setting/clock/second";
import { setInitialStatesForSecondFlag, setSecondFlag } from "@/redux";

/**
 * The function initializes the second flag states by storing initial data in the database and
 * dispatching an action to set the initial states.
 * @returns a middleware function.
 */
export const initializeSecondFlagStatesMiddleware = async () => {
    const result = await storeInitialSecondFlagDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForSecondFlag(result));
    };
};

/**
 * The function sets a flag in the database and dispatches an action to update the flag in the Redux
 * store.
 * @param {boolean} value - A boolean value indicating whether the current second flag should be set or
 * not.
 * @returns The middleware function returns a function that takes a dispatch parameter.
 */
export const setCurrentSecondFlagMiddleware = async (value: boolean) => {
    await setCurrentSecondFlagInDB(value);
    return (dispatch: any) => {
        dispatch(setSecondFlag(value));
    };
};
