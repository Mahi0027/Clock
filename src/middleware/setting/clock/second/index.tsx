import {
    setCurrentSecondFlagInDB,
    storeInitialSecondFlagDataInDB,
} from "@/database/indexedDB/setting/clock/second";
import { setInitialStatesForSecondFlag, setSecondFlag } from "@/redux";

export const initializeSecondFlagStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialSecondFlagDataInDB();
            dispatch(setInitialStatesForSecondFlag(result));
            return Promise.resolve(true);
        } catch (error) {
            console.log("Error:", error);
            return Promise.reject(error);
        }
    };
};

export const setCurrentSecondFlagMiddleware = (value: boolean) => {
    return async (dispatch: any) => {
        try {
            await setCurrentSecondFlagInDB(value);
            dispatch(setSecondFlag(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
