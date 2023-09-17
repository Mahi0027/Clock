import {
    setTimerSilentInDB,
    setTimerSoundInDB,
    setTimerVolumeInDB,
    storeInitialTimerSettingDataInDB,
} from "@/database/indexedDB/setting/timer";
import {
    setInitialStatesForTimerSetting,
    setTimerSilentInterval,
    setTimerSound,
    setTimerVolume,
} from "@/redux";

export const initializeTimerSettingStatesMiddleware = async() => {
    try {
        const result = await storeInitialTimerSettingDataInDB();
        return (dispatch:any) => {
            dispatch(setInitialStatesForTimerSetting(result));
        }
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
};

export const setTimerSoundMiddleware = (value: string) => {
    return async (dispatch) => {
        try {
            await setTimerSoundInDB(value);
            dispatch(setTimerSound(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setTimerSilentMiddleware = (value: string) => {
    return async (dispatch) => {
        try {
            await setTimerSilentInDB(value);
            dispatch(setTimerSilentInterval(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setTimerVolumeMiddleware = (value: number) => {
    return async (dispatch) => {
        try {
            await setTimerVolumeInDB(value);
            dispatch(setTimerVolume(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
