import { GET_SECOND_FLAG, SET_INITIAL_STATES_FOR_SECOND_FLAG, SET_SECOND_FLAG } from "./secondTypes";

export const setInitialStatesForSecondFlag = (value: any) => {
    return {
        type: SET_INITIAL_STATES_FOR_SECOND_FLAG,
        payload: value,
    };
};

export const getSecondFlag = () => {
    return {
        type: GET_SECOND_FLAG,
    };
};

export const setSecondFlag = (value: boolean) => {
    return {
        type: SET_SECOND_FLAG,
        payload: value,
    };
};
