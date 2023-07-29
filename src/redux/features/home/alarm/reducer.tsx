import { GET_ALL_ALARMS, SET_ALARM, UPDATE_ALARM_SCHEDULE_FLAG } from "./types";

type actionTypes = {
    type: string;
    id?: number;
    payload?: any;
};
type initialStatesTypes = {
    alarms: {
        id: number;
        alarmTime: Date;
        currentScheduleFlag: boolean;
        repeatFlag: boolean;
        sound: string;
        caption: string | null;
    }[];
};

const initialStates: initialStatesTypes = {
    alarms: [],
};

const alarmReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_ALL_ALARMS:
            return state;
        case SET_ALARM:
            return {
                ...state,
                alarms: [
                    ...state.alarms,
                    {
                        id: state.alarms.length + 1,
                        alarmTime: action.payload,
                        currentScheduleFlag: true,
                        repeatFlag: false,
                        sound: "default",
                        caption: null,
                    },
                ],
            };
        case UPDATE_ALARM_SCHEDULE_FLAG:
            const { id, currentScheduleFlag } = action.payload;
            const updatedAlarms = state.alarms.map((alarm) => {
                return alarm.id === id
                    ? { ...alarm, currentScheduleFlag }
                    : alarm;
            });
            return {
                ...state,
                alarms: updatedAlarms,
            };
        default:
            return state;
    }
};

export default alarmReducer;
