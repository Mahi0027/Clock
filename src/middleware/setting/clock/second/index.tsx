import {
    setCurrentSecondFlagInDB,
    storeInitialSecondFlagDataInDB,
} from "@/database/indexedDB/setting/clock/second";
import { setInitialStatesForSecondFlag, setSecondFlag } from "@/redux";

export const initializeSecondFlagStatesMiddleware = async () => {
    try {
        const result = await storeInitialSecondFlagDataInDB();
        return (dispatch:any) => {
            dispatch(setInitialStatesForSecondFlag(result));
        }
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

export const setCurrentSecondFlagMiddleware = (value: boolean) => {
    return async (dispatch) => {
        try {
            await setCurrentSecondFlagInDB(value);
            dispatch(setSecondFlag(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
