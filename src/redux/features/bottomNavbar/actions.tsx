import {
    SET_CURRENT_HOME_PAGE_NUMBER,
} from "./types";
export const setCurrentHomePage = (value: number) => {
    return {
        type: SET_CURRENT_HOME_PAGE_NUMBER,
        payload: value,
    };
};
