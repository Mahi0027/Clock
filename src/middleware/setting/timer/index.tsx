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

/**
 * The function initializes timer setting states by storing initial data in a database and dispatching
 * an action to set the initial states.
 * @returns a middleware function.
 */
export const initializeTimerSettingStatesMiddleware = async () => {
    const result = await storeInitialTimerSettingDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForTimerSetting(result));
    };
};

/**
 * The function sets a timer sound in a database and dispatches an action to update the timer sound
 * value.
 * @param {string} value - The value parameter is a string that represents the sound value to be set.
 * @returns a dispatch function that dispatches an action with the value passed as an argument.
 */
export const setTimerSoundMiddleware = async (value: string) => {
    await setTimerSoundInDB(value);
    return (dispatch: any) => {
        dispatch(setTimerSound(value));
    };
};

/**
 * The function sets a timer silently in the database and dispatches an action to set the timer
 * interval.
 * @param {string} value - The `value` parameter is a string that represents the timer interval value.
 * @returns a dispatch function.
 */
export const setTimerSilentMiddleware = async (value: string) => {
    await setTimerSilentInDB(value);
    return (dispatch: any) => {
        dispatch(setTimerSilentInterval(value));
    };
};

/**
 * The setTimerVolumeMiddleware function sets the timer volume in the database and dispatches an action
 * to update the timer volume.
 * @param {number} value - The value parameter is a number that represents the volume level for a
 * timer.
 * @returns a dispatch function that will dispatch an action with the value of the timer volume.
 */
export const setTimerVolumeMiddleware = async (value: number) => {
    await setTimerVolumeInDB(value);
    return (dispatch: any) => {
        dispatch(setTimerVolume(value));
    };
};
