import { useDispatch } from "react-redux";
import {
    SET_SNAPSHOT,
    SET_CURRENT_PLAY_FLAG,
    SET_HOUR,
    SET_MILLISECOND,
    SET_MINUTE,
    SET_SECOND,
    SET_SHOW_HOUR,
    SET_SHOW_MILLISECOND,
    SET_SHOW_MINUTE,
    SET_SHOW_SECOND,
    SET_STOPWATCH_TIMER,
    GET_STOPWATCH_STATES,
    STOP_STOPWATCH,
    SET_LEAVE_PAGE_TIME,
} from "./types";

type actionTypes = {
    type: string;
    payload?: any;
};

export type initialStatesTypes = {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    showHour: string;
    showMinute: string;
    showSecond: string;
    showMillisecond: string;
    timer: any;
    snapshots: string[];
    currentPlayFlag: boolean;
};
const initialStates: initialStatesTypes = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    showHour: "00",
    showMinute: "00",
    showSecond: "00",
    showMillisecond: "00",
    timer: null,
    snapshots: [],
    currentPlayFlag: false,
};

const stopwatchReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case SET_HOUR:
            return {
                ...state,
                hour: action.payload,
            };
        case SET_MINUTE:
            return {
                ...state,
                minute: action.payload,
            };
        case SET_SECOND:
            return {
                ...state,
                second: action.payload,
            };
        case SET_MILLISECOND:
            return {
                ...state,
                millisecond: action.payload,
            };
        case SET_SHOW_HOUR:
            return {
                ...state,
                showHour: action.payload,
            };
        case SET_SHOW_MINUTE:
            return {
                ...state,
                showMinute: action.payload,
            };
        case SET_SHOW_SECOND:
            return {
                ...state,
                showSecond: action.payload,
            };
        case SET_SHOW_MILLISECOND:
            return {
                ...state,
                showMillisecond: action.payload,
            };
        case SET_STOPWATCH_TIMER:
            return {
                ...state,
                timer: action.payload,
            };
        case SET_SNAPSHOT:
            return {
                ...state,
                snapshots: action.payload,
            };
        case SET_CURRENT_PLAY_FLAG:
            return {
                ...state,
                currentPlayFlag: action.payload,
            };
        case SET_LEAVE_PAGE_TIME:
            return {
                ...state,
                leavePageTime: action.payload,
            };
        case GET_STOPWATCH_STATES:
            return state;
        case STOP_STOPWATCH:
            clearInterval(state.timer);
            return {
                ...state,
                timer: null,
                currentPlayFlag: false,
            };
        default:
            return state;
    }
};

export default stopwatchReducer;
