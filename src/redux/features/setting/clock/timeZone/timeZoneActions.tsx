import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
    FETCH_TIME_ZONE_FAILURE,
    FETCH_TIME_ZONE_REQUEST,
    FETCH_TIME_ZONE_SUCCESS,
    GET_ALL_TIME_ZONES,
    SET_INITIAL_STATES_FOR_TIME_ZONE,
    SET_TIME_ZONE,
} from "./timeZoneTypes";

export const setInitialStatesForTimeZone = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_TIME_ZONE,
        payload: value,
    };
};

export const fetchTimeZoneRequest = () => {
    return {
        type: FETCH_TIME_ZONE_REQUEST,
    };
};

export const fetchTimeZonesSuccess = (timeZones: string[]) => {
    return {
        type: FETCH_TIME_ZONE_SUCCESS,
        payload: timeZones,
    };
};

export const fetchTimeZoneFailure = (error: string) => {
    return {
        type: FETCH_TIME_ZONE_FAILURE,
        payload: error,
    };
};

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

export const fetchTimeZone = () => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        try {
            dispatch(fetchTimeZoneRequest());
            const response = await fetch(
                "http://worldtimeapi.org/api/timezone"
            );
            if (!response.ok) {
                const error = await response.json();
                throw new Error("error: ", error);
            }
            const timeZones = await response.json();
            dispatch(fetchTimeZonesSuccess(timeZones));
        } catch (error: any) {
            dispatch(fetchTimeZoneFailure(error));
        }
    };
};
