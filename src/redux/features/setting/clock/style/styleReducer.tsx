import { FETCH_ALL_STYLES, SET_STYLE } from "./styleTypes";

type actionTypes = {
    type: string,
    payload?: string
}
export type initialStatesTypes = {
    allStyles: string[];
    currentStyle: string
};
const AllStyles = ['Analog','Digital'];
const initialStates: initialStatesTypes = {
    allStyles: [],
    currentStyle: AllStyles[0],
};
const styleReducer = (state = initialStates, action:actionTypes) => {
    switch (action.type) {
        case FETCH_ALL_STYLES:
            return {
                ...state,
                allStyles: AllStyles,
            };
        case SET_STYLE:
            return {
                ...state,
                currentStyle: action.payload
            }
        default: return state
    }
};

export default styleReducer;