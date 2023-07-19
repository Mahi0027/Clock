import { SET_VOLUME } from "./volumeTypes";

export const setVolume = (value: number) => {
    return {
        type: SET_VOLUME,
        payload: value,
    };
};
