import { SET_DIGITAL_CLOCK_THEME } from "./types";

export const setDigitalClockTheme = (value: string) => {
    return {
        type: SET_DIGITAL_CLOCK_THEME,
        payload: value,
    };
};
