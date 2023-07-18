import { GET_ALL_SILENT_INTERVALS, SET_SILENT_INTERVAL } from "./silentTypes";

const allSilentIntervalStaticValues = [
    "Never",
    "1 minute",
    "5 minutes",
    "10 minutes",
    "15 minutes",
    "20 minutes",
    "25 minutes",
];

type actionTypes = {
    type: string;
    payload?: string;
};
export type initialStatesTypes = {
    allSilentIntervals: string[];
    currentSilentInterval: string;
};
const initialStates: initialStatesTypes = {
    allSilentIntervals: [],
    currentSilentInterval: allSilentIntervalStaticValues[0],
};

const silentReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_ALL_SILENT_INTERVALS:
            return {
                ...state,
                allSilentIntervals: allSilentIntervalStaticValues,
            };
        case SET_SILENT_INTERVAL:
            return {
                ...state,
                currentSilentInterval: action.payload,
            };

        default:
            return state;
    }
};

export default silentReducer;
