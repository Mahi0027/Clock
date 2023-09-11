import {
    SET_DIGITAL_CLOCK_THEME,
    SET_INITIAL_STATES_FOR_DIGITAL_CLOCK,
} from "./types";

export const setInitialStatesForDigitalClockThemes = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_DIGITAL_CLOCK,
        payload: value,
    };
};

export const setDigitalClockTheme = (value: string) => {
    return {
        type: SET_DIGITAL_CLOCK_THEME,
        payload: value,
    };
};
