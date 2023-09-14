import {
    setCurrentAlarmSnoozeInDB,
    storeInitialAlarmSnoozeDataInDB,
} from "@/database/indexedDB/setting/alarm/snooze";
import { setInitialStatesForAlarmSnooze, setSnoozeInterval } from "@/redux";

export const initializeAlarmSnoozeStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialAlarmSnoozeDataInDB();
            dispatch(setInitialStatesForAlarmSnooze(result));
            return Promise.resolve(true);
        } catch (error) {
            console.log("Error:", error);
            return Promise.reject(error);
        }
    };
};

export const setCurrentAlarmSnoozeMiddleware = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setCurrentAlarmSnoozeInDB(value);
            dispatch(setSnoozeInterval(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
