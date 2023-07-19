import { GET_ALL_WEEK_ON_VALUES, SET_WEEK_ON_VALUE } from "./weekOnTypes";

const allWeekOnStaticValues = ["Sunday", "Friday", "Saturday", "Monday"];

type actionTypes = {
    type: string;
    payload?: string;
};

export type initialStatesTypes = {
    allWeekOnValues: string[];
    currentWeekOnValue: string;
};
const initialStates = {
    allWeekOnValues: [],
    currentWeekOnValue: allWeekOnStaticValues[0],
};

const weekOnReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_ALL_WEEK_ON_VALUES:
            return {
                ...state,
                allWeekOnValues: allWeekOnStaticValues,
            };
        case SET_WEEK_ON_VALUE:
            return {
                ...state,
                currentWeekOnValue: action.payload,
            };

        default:
            return state;
    }
};

export default weekOnReducer;
