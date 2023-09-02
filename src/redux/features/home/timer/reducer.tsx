import {
    ADD_OR_REDUCE_TIME_IN_TIMER,
    DELETE_TIMER,
    GET_ALL_TIMERS,
    SET_TIMER,
    SET_TIMER_COMPLETED_FLAG,
    SET_TIMER_RING_DOM,
    SET_TIMER_SOUND,
    UPDATE_REMAINING_TIME,
    UPDATE_TIMER_INTERVAL_REF,
    UPDATE_TIMER_LABEL,
    UPDATE_TIMER_PAUSE_FLAG,
    UPDATE_TIMER_SCHEDULE_FLAG,
    UPDATE_TIMER_TIME,
} from "./types";

const timerSounds = [
    "bedside",
    "bell",
    "digital",
    "joy",
    "naturesounds",
    "oldmechanic",
    "oldphone",
    "oversimplified",
    "ringtone",
    "short",
];
type actionTypes = {
    type: string;
    id?: number;
    payload?: any;
};
export type initialStatesTypes = {
    timers: {
        id: number;
        timerTime: number;
        persistTime: number;
        remainingTime: number;
        currentScheduleFlag: boolean;
        repeatFlag: boolean;
        pauseFlag: boolean;
        sound: string;
        label: string | null;
        timerIntervalRef: null;
        timerRingDOM: null;
        timerCompletedFlag: false;
    }[];
    timerSounds: string[];
};

const initialStates: initialStatesTypes = {
    timers: [],
    timerSounds: timerSounds,
};

const timerReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_ALL_TIMERS:
            return state;
        case SET_TIMER:
            const lastTimerId =
                state.timers.length === 0 ? 0 : state.timers[0].id;
            return {
                ...state,
                timers: [
                    {
                        id: lastTimerId + 1,
                        timerTime: action.payload,
                        persistTime: action.payload,
                        remainingTime: action.payload,
                        currentScheduleFlag: true,
                        repeatFlag: false,
                        pauseFlag: false,
                        sound: state.timerSounds[1],
                        label: null,
                        timerIntervalRef: null,
                        timerRingDOM: null,
                        timerCompletedFlag: false,
                    },
                    ...state.timers,
                ],
            };
        case UPDATE_TIMER_TIME:
            const updatedTimerForTime = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? {
                          ...timer,
                          timerTime: action.payload.newPeriod,
                      }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForTime,
            };
        case UPDATE_REMAINING_TIME:
            const updatedTimerForRemainingTime = state.timers.map((timer) => {
                return !timer.pauseFlag && timer.id === action.payload.id
                    ? {
                          ...timer,
                          remainingTime: timer.remainingTime - 1000,
                      }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForRemainingTime,
            };
        case UPDATE_TIMER_SCHEDULE_FLAG:
            const updatedTimerForScheduledFlag = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? {
                          ...timer,
                          currentScheduleFlag:
                              action.payload.currentScheduleFlag,
                      }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForScheduledFlag,
            };
        case UPDATE_TIMER_LABEL:
            const updatedTimerForLabel = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? { ...timer, label: action.payload.label }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForLabel,
            };
        case SET_TIMER_SOUND:
            const updatedTimerForSound = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? { ...timer, sound: action.payload.timerSound }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForSound,
            };
        case DELETE_TIMER:
            const indexOfDeleteTimer = state.timers.findIndex(
                (timer) => timer.id === action.payload.id
            );
            if (indexOfDeleteTimer !== -1)
                state.timers.splice(indexOfDeleteTimer, 1);
            return {
                ...state,
            };
        case UPDATE_TIMER_INTERVAL_REF:
            const updatedTimerForIntervalRef = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? {
                          ...timer,
                          timerIntervalRef: action.payload.timerIntervalRef,
                      }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForIntervalRef,
            };
        case UPDATE_TIMER_PAUSE_FLAG:
            const updatedTimerForPauseFlag = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? {
                          ...timer,
                          pauseFlag: action.payload.flag,
                      }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForPauseFlag,
            };
        case ADD_OR_REDUCE_TIME_IN_TIMER:
            const addOrRemoveTimeForTimer = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? {
                          ...timer,
                          timerTime: action.payload.newPeriod,
                          remainingTime: action.payload.newPeriod,
                      }
                    : timer;
            });
            return {
                ...state,
                timers: addOrRemoveTimeForTimer,
            };
        case SET_TIMER_RING_DOM:
            const updatedTimerForRingDOM = state.timers.map((timer) => {
                return timer.id === action.payload.id
                    ? {
                          ...timer,
                          timerRingDOM: action.payload.value,
                      }
                    : timer;
            });
            return {
                ...state,
                timers: updatedTimerForRingDOM,
            };
        case SET_TIMER_COMPLETED_FLAG:
            const updatedTimerForTimerCompletedFlag = state.timers.map(
                (timer) => {
                    return timer.id === action.payload.id
                        ? {
                              ...timer,
                              timerCompletedFlag: action.payload.flag,
                          }
                        : timer;
                }
            );
            return {
                ...state,
                timers: updatedTimerForTimerCompletedFlag,
            };
        default:
            return state;
    }
};

export default timerReducer;
