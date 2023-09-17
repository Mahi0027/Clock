import {
    setCurrentAlarmSnoozeInDB,
    storeInitialAlarmSnoozeDataInDB,
} from "@/database/indexedDB/setting/alarm/snooze";
import { setInitialStatesForAlarmSnooze, setSnoozeInterval } from "@/redux";

export const initializeAlarmSnoozeStatesMiddleware = async () => {
    try {
        const result = await storeInitialAlarmSnoozeDataInDB();
        return (dispatch:any) => {
            dispatch(setInitialStatesForAlarmSnooze(result));
        }
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

export const setCurrentAlarmSnoozeMiddleware = (value: string) => {
    return async (dispatch) => {
        try {
            await setCurrentAlarmSnoozeInDB(value);
            dispatch(setSnoozeInterval(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
