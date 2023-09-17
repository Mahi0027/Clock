import {
    setCurrentClockStyleInDB,
    storeInitialClockStyleDataInDB,
} from "@/database/indexedDB/setting/clock/style";
import {
    setInitialStatesForClockStyle,
    setStyle,
} from "@/redux";

export const initializeClockStyleStatesMiddleware = async () => {
    try {
        const result = await storeInitialClockStyleDataInDB();
        return (dispatch:any) => {
            dispatch(setInitialStatesForClockStyle(result));
        }
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

export const setCurrentClockStyleMiddleware = (value: string) => {
    return async (dispatch) => {
        try {
            await setCurrentClockStyleInDB(value);
            dispatch(setStyle(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
