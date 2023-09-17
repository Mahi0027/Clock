import {
    setCurrentAlarmVolumeInDB,
    storeInitialAlarmVolumeDataInDB,
} from "@/database/indexedDB/setting/alarm/volume";
import { setInitialStatesForAlarmVolume, setVolume } from "@/redux";

export const initializeAlarmVolumeStatesMiddleware = async () => {
    try {
        const result = await storeInitialAlarmVolumeDataInDB();
        return (dispatch:any) => {
            dispatch(setInitialStatesForAlarmVolume(result));
        }
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

export const setCurrentAlarmVolumeMiddleware = (value: number) => {
    return async (dispatch) => {
        try {
            await setCurrentAlarmVolumeInDB(value);
            dispatch(setVolume(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
