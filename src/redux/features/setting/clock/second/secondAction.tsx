import { GET_SECOND_FLAG, SET_SECOND_FLAG } from "./secondTypes";

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
