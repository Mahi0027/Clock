import {
    setCurrentTimeZoneInDB,
    storeInitialTimeZoneDataInDB,
} from "@/database/indexedDB/setting/clock/timeZone";
import { setInitialStatesForTimeZone, setTimeZone } from "@/redux";

export const initializeTimeZoneStatesMiddleware = async () => {
    try {
        const result = await storeInitialTimeZoneDataInDB();
        return (dispatch:any) => {
            dispatch(setInitialStatesForTimeZone(result));
        }
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

export const setCurrentTimeZoneMiddleware = (value: string) => {
    return async (dispatch) => {
        try {
            await setCurrentTimeZoneInDB(value);
            dispatch(setTimeZone(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
