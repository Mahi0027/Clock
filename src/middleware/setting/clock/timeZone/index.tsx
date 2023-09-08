import {
    setCurrentTimeZoneInDB,
    storeInitialTimeZoneDataInDB,
} from "@/database/indexedDB/setting/clock/timeZone";
import { setInitialStatesForTimeZone, setTimeZone } from "@/redux";

export const initializeTimeZoneStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialTimeZoneDataInDB();
            dispatch(setInitialStatesForTimeZone(result));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setCurrentTimeZoneMiddleware = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setCurrentTimeZoneInDB(value);
            dispatch(setTimeZone(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
