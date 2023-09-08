import { SET_INITIAL_STATES_FOR_ALARM_VOLUME, SET_VOLUME } from "./volumeTypes";

type actionTypes = {
    type: string;
    payload?: string;
};

export type initialStatesTypes = {
    minValue: number;
    maxValue: number;
    currentValue: number;
};
const initialStates: initialStatesTypes = {
    minValue: 0,
    maxValue: 100,
    currentValue: 25, //can set any value
};

const volumeReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case SET_INITIAL_STATES_FOR_ALARM_VOLUME:
            return action.payload;
        case SET_VOLUME:
            return {
                ...state,
                currentValue: action.payload,
            };
        default:
            return state;
    }
};

export default volumeReducer;
