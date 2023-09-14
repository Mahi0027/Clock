import {
    setCurrentAlarmVolumeInDB,
    storeInitialAlarmVolumeDataInDB,
} from "@/database/indexedDB/setting/alarm/volume";
import { setInitialStatesForAlarmVolume, setVolume } from "@/redux";

export const initializeAlarmVolumeStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialAlarmVolumeDataInDB();
            dispatch(setInitialStatesForAlarmVolume(result));
            return Promise.resolve(true);
        } catch (error) {
            console.log("Error:", error);
            return Promise.reject(error);
        }
    };
};

export const setCurrentAlarmVolumeMiddleware = (value: number) => {
    return async (dispatch: any) => {
        try {
            await setCurrentAlarmVolumeInDB(value);
            dispatch(setVolume(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
