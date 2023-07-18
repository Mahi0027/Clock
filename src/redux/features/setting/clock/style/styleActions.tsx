import { FETCH_ALL_STYLES, SET_STYLE } from "./styleTypes";

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
