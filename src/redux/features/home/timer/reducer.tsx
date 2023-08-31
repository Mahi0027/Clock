import {
    DELETE_TIMER,
    GET_ALL_TIMERS,
    SET_TIMER,
    SET_TIMER_SOUND,
    UPDATE_TIMER_LABEL,
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
        currentScheduleFlag: boolean;
        repeatFlag: boolean;
        sound: string;
        label: string | null;
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
                state.timers.length === 0
                    ? 0
                    : state.timers[0].id;
            return {
                ...state,
                timers: [
                    {
                        id: lastTimerId + 1,
                        timerTime: action.payload,
                        persistTime: action.payload,
                        currentScheduleFlag: true,
                        repeatFlag: false,
                        sound: state.timerSounds[1],
                        label: null,
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
        default:
            return state;
    }
};

export default timerReducer;
