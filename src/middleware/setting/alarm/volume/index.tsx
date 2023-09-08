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
        } catch (error) {
            console.log("Error:", error);
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
