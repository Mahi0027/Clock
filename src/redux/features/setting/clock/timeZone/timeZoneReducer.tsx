import {
    FETCH_TIME_ZONE_FAILURE,
    FETCH_TIME_ZONE_REQUEST,
    FETCH_TIME_ZONE_SUCCESS,
    GET_ALL_TIME_ZONES,
    SET_INITIAL_STATES_FOR_TIME_ZONE,
    SET_TIME_ZONE,
} from "./timeZoneTypes";

type actionTypes = {
    type: string;
    payload?: string | string[];
};
export type initialStatesTypes = {
    loading: boolean;
    allTimeZones: string[];
    currentTimeZone: string;
    error: string;
};
const initialStates: initialStatesTypes = {
    loading: true,
    allTimeZones: [],
    currentTimeZone: "Asia/Kolkata",
    error: "",
};

const timeZoneReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case SET_INITIAL_STATES_FOR_TIME_ZONE:
            return action.payload;
        case FETCH_TIME_ZONE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TIME_ZONE_SUCCESS:
            return {
                ...state,
                loading: false,
                allTimeZones: action.payload,
                error: "",
            };
        case FETCH_TIME_ZONE_FAILURE:
            return {
                ...state,
                loading: false,
                allTimeZones: [],
                error: action.payload,
            };
        case SET_TIME_ZONE:
            return {
                ...state,
                currentTimeZone: action.payload,
            };
        default:
            return state;
    }
};

export default timeZoneReducer;
