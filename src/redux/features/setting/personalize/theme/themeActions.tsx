import { FETCH_ALL_THEMES, SET_INITIAL_STATES, SET_THEME } from "./themeTypes";

export const setInitialStatesForThemes = (value: any) => {
    return {
        type: SET_INITIAL_STATES,
        payload: value,
    };
};

export const fetchAllThemes = () => {
    return {
        type: FETCH_ALL_THEMES,
    };
};

export const setTheme = (value: string) => {
    return {
        type: SET_THEME,
        payload: value,
    };
};
