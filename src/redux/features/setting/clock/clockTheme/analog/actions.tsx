import { SET_ANALOG_CLOCK_THEME } from "./types";

export const setAnalogClockTheme = (value: string) => {
    return {
        type: SET_ANALOG_CLOCK_THEME,
        payload: value,
    };
};