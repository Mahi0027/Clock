import {
    setCurrentClockStyleInDB,
    storeInitialClockStyleDataInDB,
} from "@/database/indexedDB/setting/clock/style";
import {
    setInitialStatesForClockStyle,
    setStyle,
} from "@/redux";

export const initializeClockStyleStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialClockStyleDataInDB();
            dispatch(setInitialStatesForClockStyle(result));
            return Promise.resolve(true);
        } catch (error) {
            console.log("Error:", error);
            return Promise.reject(error);
        }
    };
};

export const setCurrentClockStyleMiddleware = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setCurrentClockStyleInDB(value);
            dispatch(setStyle(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
