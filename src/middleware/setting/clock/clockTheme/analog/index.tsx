import {
    setCurrentAnalogClockThemeInDB,
    storeInitialAnalogClockSettingDataInDB,
} from "@/database/indexedDB/setting/clock/clockTheme/analog";
import {
    setAnalogClockTheme,
    setInitialStatesForAnalogClockThemes,
} from "@/redux";

/**
 * The function initializes analog clock theme states by storing initial data in a database and
 * dispatching the initial states to the Redux store.
 * @returns a dispatch function that sets the initial states for analog clock themes.
 */
export const initializeAnalogClockThemeStates = async () => {
    const result = await storeInitialAnalogClockSettingDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForAnalogClockThemes(result));
    };
};

/**
 * The function sets the current analog clock theme in the database and dispatches an action to update
 * the analog clock theme.
 * @param {string} value - The value parameter is a string that represents the theme for the analog
 * clock.
 * @returns a dispatch function.
 */
export const setCurrentAnalogClockTheme = async (value: string) => {
    await setCurrentAnalogClockThemeInDB(value);
    return (dispatch: any) => {
        dispatch(setAnalogClockTheme(value));
    };
};
