import { GET_ALL_TIME_ZONES, SET_TIME_ZONE } from "./timeZoneTypes";

const timeZones = [
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
];

type actionTypes = {
    type: string;
    payload?: string;
};
export type initialStatesTypes = {
    allTimeZones: string[];
    currentTimeZone: string;
};
const initialStates: initialStatesTypes = {
    allTimeZones: [],
    currentTimeZone: timeZones[0],
};

const timeZoneReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_ALL_TIME_ZONES:
            return {
                ...state,
                allTimeZones: timeZones,
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
