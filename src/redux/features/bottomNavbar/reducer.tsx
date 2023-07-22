import { SET_CURRENT_HOME_PAGE_NUMBER } from "./types";

type actionTypes = {
    type: string;
    payload: number;
};
export type initialStatesTypes = {
    currentHomePage: number;
};
const initialStates: initialStatesTypes = {
    currentHomePage: 0,
};

const BottomNavbar = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case SET_CURRENT_HOME_PAGE_NUMBER:
            return {
                currentHomePage: action.payload,
            };
        default:
            return state;
    }
};

export default BottomNavbar;
