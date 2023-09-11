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
        } catch (error) {
            console.log("Error:", error);
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
