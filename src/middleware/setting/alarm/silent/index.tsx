import {
    setCurrentAlarmSilentInDB,
    storeInitialAlarmSilentDataInDB,
} from "@/database/indexedDB/setting/alarm/silent";
import { setInitialStatesForAlarmSilent, setSilentInterval } from "@/redux";

export const initializeAlarmSilentStatesMiddleware = async () => {
    try {
        const result = await storeInitialAlarmSilentDataInDB();
        return (dispatch:any) => {
            dispatch(setInitialStatesForAlarmSilent(result));
        }
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

export const setCurrentAlarmSilentMiddleware = (value: string) => {
    return async (dispatch) => {
        try {
            await setCurrentAlarmSilentInDB(value);
            dispatch(setSilentInterval(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
