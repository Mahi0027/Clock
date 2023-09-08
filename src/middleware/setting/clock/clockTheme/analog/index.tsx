import {
    setCurrentAnalogClockThemeInDB,
    storeInitialAnalogClockSettingDataInDB,
} from "@/database/indexedDB/setting/clock/clockTheme/analog";
import {
    setAnalogClockTheme,
    setInitialStatesForAnalogClockThemes,
} from "@/redux";

export const initializeAnalogClockThemeStates = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialAnalogClockSettingDataInDB();
            dispatch(setInitialStatesForAnalogClockThemes(result));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setCurrentAnalogClockTheme = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setCurrentAnalogClockThemeInDB(value);
            dispatch(setAnalogClockTheme(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
