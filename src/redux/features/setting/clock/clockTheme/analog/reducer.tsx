import { SET_ANALOG_CLOCK_THEME } from "./types";

const themes = [
    "clock1",
    "clock2",
    "clock3",
    "clock4",
    "clock5",
    "clock6",
    "clock7",
    "clock8",
    "clock9",
    "clock10",
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

const AnalogClockThemeReducer = (
    state = initialStates,
    action: actionTypes
) => {
    switch (action.type) {
        case SET_ANALOG_CLOCK_THEME:
            return {
                ...state,
                currentTheme: action.payload,
            };
        default:
            return state;
    }
};

export default AnalogClockThemeReducer;