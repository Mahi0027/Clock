import { SET_ANALOG_CLOCK_THEME, SET_INITIAL_STATES_FOR_ANALOG_CLOCK } from "./types";

export const setInitialStatesForAnalogClockThemes = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_ANALOG_CLOCK,
        payload: value,
    };
};

export const setAnalogClockTheme = (value: string) => {
    return {
        type: SET_ANALOG_CLOCK_THEME,
        payload: value,
    };
};