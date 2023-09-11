import {
    SET_ANALOG_CLOCK_THEME,
    SET_INITIAL_STATES_FOR_ANALOG_CLOCK,
} from "./types";

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
const initialStates: initialStatesTypes = {
    allThemes: themes,
    currentTheme: themes[0],
};

const AnalogClockThemeReducer = (
    state = initialStates,
    action: actionTypes
) => {
    switch (action.type) {
        case SET_INITIAL_STATES_FOR_ANALOG_CLOCK:
            return action.payload;
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
