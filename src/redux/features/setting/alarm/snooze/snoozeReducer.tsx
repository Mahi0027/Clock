import {
    GET_ALL_SNOOZE_INTERVALS,
    SET_INITIAL_STATES_FOR_ALARM_SNOOZE,
    SET_SNOOZE_INTERVAL,
} from "./snoozeTypes";

const allSnoozeIntervalStaticValues: string[] = [];
for (let i = 1; i <= 30; i++) {
    allSnoozeIntervalStaticValues.push(i + (i == 1 ? " minute" : " minutes"));
}

type actionTypes = {
    type: string;
    payload?: string;
};
export type initialStatesTypes = {
    allSnoozeIntervals: string[];
    currentSnoozeInterval: string;
};
const initialStates: initialStatesTypes = {
    allSnoozeIntervals: [],
    currentSnoozeInterval: allSnoozeIntervalStaticValues[0],
};

const snoozeReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case SET_INITIAL_STATES_FOR_ALARM_SNOOZE:
            return action.payload;
        case SET_SNOOZE_INTERVAL:
            return {
                ...state,
                currentSnoozeInterval: action.payload,
            };
        default:
            return state;
    }
};

export default snoozeReducer;
