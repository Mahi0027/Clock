import {
    setCurrentDigitalClockThemeInDB,
    storeInitialDigitalClockSettingDataInDB,
} from "@/database/indexedDB/setting/clock/clockTheme/digital";
import {
    setDigitalClockTheme,
    setInitialStatesForDigitalClockThemes,
} from "@/redux";

/**
 * The function initializes the digital clock theme states by storing initial data in a database and
 * dispatching an action to set the initial states for digital clock themes.
 * @returns a dispatch function that sets the initial states for digital clock themes.
 */
export const initializeDigitalClockThemeStates = async () => {
    const result = await storeInitialDigitalClockSettingDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForDigitalClockThemes(result));
    };
};

/**
 * The function sets the current digital clock theme in a database and dispatches an action to update
 * the theme.
 * @param {string} value - The value parameter is a string that represents the theme for the digital
 * clock.
 * @returns a dispatch function.
 */
export const setCurrentDigitalClockTheme = async (value: string) => {
    await setCurrentDigitalClockThemeInDB(value);
    return (dispatch: any) => {
        dispatch(setDigitalClockTheme(value));
    };
};
