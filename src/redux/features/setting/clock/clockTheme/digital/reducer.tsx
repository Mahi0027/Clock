import { SET_DIGITAL_CLOCK_THEME, SET_INITIAL_STATES_FOR_DIGITAL_CLOCK } from "./types";

const themes = [
    "Open Sans, sans-serif",
    "Tektur, cursive",
    "Dai Banna SIL, serif",
    "Dancing Script, cursive",
    "Handjet, cursive",
    "Kablammo, cursive",
    "Kalam, cursive",
    "Lumanosimo, cursive",
    "Playfair Display, serif",
    "Raleway Dots, cursive",
    "Shojumaru, cursive",
];
type actionTypes = {
    type: string;
    payload: string;
};
export type initialStatesTypes = {
    allThemes: string[];
    currentTheme: string;
};
const initialStates = {
    allThemes: themes,
    currentTheme: themes[0],
};

const DigitalClockThemeReducer = (
    state = initialStates,
    action: actionTypes
) => {
    switch (action.type) {
        case SET_INITIAL_STATES_FOR_DIGITAL_CLOCK:
            return action.payload;
        case SET_DIGITAL_CLOCK_THEME:
            return {
                ...state,
                currentTheme: action.payload,
            };
        default:
            return state;
    }
};

export default DigitalClockThemeReducer;
