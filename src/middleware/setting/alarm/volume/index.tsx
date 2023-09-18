import {
    setCurrentAlarmVolumeInDB,
    storeInitialAlarmVolumeDataInDB,
} from "@/database/indexedDB/setting/alarm/volume";
import { setInitialStatesForAlarmVolume, setVolume } from "@/redux";

/**
 * The function initializes alarm volume states by storing initial data in a database and dispatching
 * an action to set the initial states.
 * @returns a middleware function.
 */
export const initializeAlarmVolumeStatesMiddleware = async () => {
    const result = await storeInitialAlarmVolumeDataInDB();
    return (dispatch: any) => {
        dispatch(setInitialStatesForAlarmVolume(result));
    };
};

/**
 * The function sets the current alarm volume in the database and dispatches an action to update the
 * volume.
 * @param {number | number[]} value - The value parameter can be either a number or an array of
 * numbers.
 * @returns a dispatch function that sets the volume value in the Redux store.
 */
export const setCurrentAlarmVolumeMiddleware = async (
    value: number | number[]
) => {
    await setCurrentAlarmVolumeInDB(value);
    return (dispatch: any) => {
        dispatch(setVolume(value));
    };
};
