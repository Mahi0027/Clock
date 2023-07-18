import {
    FETCH_ALL_THEMES,
    SET_THEME,
} from "./themeTypes";

/* type defined start */
export type initialStatesTypes = {
    allThemes: string[];
    currentTheme: string;
};
type actionType = {
    type: string;
    payload?: string;
};
/* type defined end */

/* theme array and state initialization start */
const allThemes = ["light", "dark"];
const initialStates: initialStatesTypes = {
    allThemes: [],
    currentTheme: allThemes[0],
};
/* theme array and state initialization end */

/* theme reducer function start */
const themeReducer = (state = initialStates, action: actionType) => {
    switch (action.type) {
        case FETCH_ALL_THEMES:
            return {
                ...state,
                allThemes: allThemes,
            };
        case SET_THEME:
            return {
                ...state,
                currentTheme: action.payload,
            };
        default:
            return state;
    }
};
/* theme reducer function end */

export default themeReducer;
