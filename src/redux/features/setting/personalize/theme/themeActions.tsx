import { FETCH_ALL_THEMES, SET_THEME } from "./themeTypes";

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
