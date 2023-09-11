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

export const initializeTimerSettingStatesMiddleware = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialTimerSettingDataInDB();
            dispatch(setInitialStatesForTimerSetting(result));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setTimerSoundMiddleware = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setTimerSoundInDB(value);
            dispatch(setTimerSound(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setTimerSilentMiddleware = (value: string) => {
    return async (dispatch: any) => {
        try {
            await setTimerSilentInDB(value);
            dispatch(setTimerSilentInterval(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setTimerVolumeMiddleware = (value: number) => {
    return async (dispatch: any) => {
        try {
            await setTimerVolumeInDB(value);
            dispatch(setTimerVolume(value));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};
