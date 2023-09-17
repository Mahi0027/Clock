import {
    getCurrentThemeInDB,
    setCurrentThemeInDB,
    storeInitialData,
} from "@/database/indexedDB/setting/personalize";
import { setInitialStatesForThemes, setTheme } from "@/redux";

/**
 * The function initializes theme states by dispatching an action with the initial data obtained from
 * the store.
 * @returns a dispatch function that sets the initial states for themes.
 */
export const initializeThemeStates = async () => {
    const result = await storeInitialData();
    return (dispatch: any) => {
        dispatch(setInitialStatesForThemes(result));
    };
};

/**
 * The function `getCurrentTheme` is an asynchronous function that retrieves the current theme from a
 * database and returns a promise that resolves with the result or rejects with an error.
 * @returns The function `getCurrentTheme` returns a promise that resolves to the result of the
 * `getCurrentThemeInDB` function if it is successful. If there is an error, it logs the error and
 * returns a rejected promise with the error.
 */
export const getCurrentTheme = async () => {
    try {
        const result = await getCurrentThemeInDB();
        return Promise.resolve(result);
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

/**
 * The function `setCurrentTheme` sets the current theme in the database and dispatches an action to
 * update the theme in the application state.
 * @param {string} value - The value parameter is a string that represents the theme that needs to be
 * set.
 * @returns a dispatch function.
 */
export const setCurrentTheme = async (value: string) => {
    await setCurrentThemeInDB(value);
    return (dispatch: any) => {
        dispatch(setTheme(value));
    };
};
