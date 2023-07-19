import { GET_ALL_WEEK_ON_VALUES, SET_WEEK_ON_VALUE } from "./weekOnTypes";

export const getAllWeekOnValues = () => {
    return {
        type: GET_ALL_WEEK_ON_VALUES,
    };
};

export const setWeekOnValue = (value: string) => {
    return {
        type: SET_WEEK_ON_VALUE,
        payload: value,
    };
};
