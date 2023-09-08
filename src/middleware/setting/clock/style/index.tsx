import {
    setCurrentDigitalClockThemeInDB,
} from "@/database/indexedDB/setting/clock/clockTheme/digital";
import { setCurrentClockStyleInDB, storeInitialClockStyleDataInDB } from "@/database/indexedDB/setting/clock/style";
import {
    setDigitalClockTheme,
    setInitialStatesForClockStyle,
    setStyle,
} from "@/redux";

export const initializeClockStyleStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialClockStyleDataInDB();
            dispatch(setInitialStatesForClockStyle(result));
        } catch (error) {
            console.log("Error adding task:", error);
        }
    };
};

export const setCurrentClockStyleMiddleware = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setCurrentClockStyleInDB(value);
            dispatch(setStyle(value));
        } catch (error) {
            console.log("Error setting current theme:", error);
        }
    };
};
