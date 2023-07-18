import { GET_SECOND_FLAG, SET_SECOND_FLAG } from "./secondTypes";
type actionTypes = {
    type: string;
    payload?: boolean;
};
export type initialStatesTypes = {
    setSecond: boolean;
};
const initialStates: initialStatesTypes = {
    setSecond: false,
};

const secondReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_SECOND_FLAG:
            return state;
        case SET_SECOND_FLAG:
            return {
                ...state,
                setSecond: action.payload,
            };
        default:
            return state;
    }
};

export default secondReducer;