import { GET_ALL_TIME_ZONES, SET_TIME_ZONE } from "./timeZoneTypes";

export const getAllTimeZones = () => {
    return {
        type: GET_ALL_TIME_ZONES,
    };
};

export const setTimeZone = (value: string) => {
    return {
        type: SET_TIME_ZONE,
        payload: value,
    };
};
