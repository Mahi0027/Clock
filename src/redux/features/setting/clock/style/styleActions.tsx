import { FETCH_ALL_STYLES, SET_INITIAL_STATES_FOR_CLOCK_STYLE, SET_STYLE } from "./styleTypes";

export const setInitialStatesForClockStyle = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_CLOCK_STYLE,
        payload: value,
    };
};

export const fetchAllStyles = () => {
    return {
        type: FETCH_ALL_STYLES,
    };
};

export const setStyle = (value: string) => {
    return {
        type: SET_STYLE,
        payload: value,
    };
};
