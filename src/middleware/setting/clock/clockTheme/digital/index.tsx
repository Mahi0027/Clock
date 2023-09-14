import {
    setCurrentDigitalClockThemeInDB,
    storeInitialDigitalClockSettingDataInDB,
} from "@/database/indexedDB/setting/clock/clockTheme/digital";
import {
    setDigitalClockTheme,
    setInitialStatesForDigitalClockThemes,
} from "@/redux";

export const initializeDigitalClockThemeStates = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialDigitalClockSettingDataInDB();
            dispatch(setInitialStatesForDigitalClockThemes(result));
            return Promise.resolve(true);
        } catch (error) {
            console.log("Error:", error);
            return Promise.reject(error);
        }
    };
};

export const setCurrentDigitalClockTheme = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setCurrentDigitalClockThemeInDB(value);
            dispatch(setDigitalClockTheme(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
