import {
    setCurrentAlarmSilentInDB,
    storeInitialAlarmSilentDataInDB,
} from "@/database/indexedDB/setting/alarm/silent";
import { setInitialStatesForAlarmSilent, setSilentInterval } from "@/redux";

export const initializeAlarmSilentStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialAlarmSilentDataInDB();
            dispatch(setInitialStatesForAlarmSilent(result));
            return Promise.resolve(true);
        } catch (error) {
            console.log("Error:", error);
            return Promise.reject(error);
        }
    };
};

export const setCurrentAlarmSilentMiddleware = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setCurrentAlarmSilentInDB(value);
            dispatch(setSilentInterval(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
