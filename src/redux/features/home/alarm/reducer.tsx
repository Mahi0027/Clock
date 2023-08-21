import {
    DELETE_ALARM,
    GET_ALL_ALARMS,
    SET_ALARM,
    SET_ALARM_SOUND,
    SET_REPEAT_ALARM,
    UPDATE_ALARM_LABEL,
    UPDATE_ALARM_SCHEDULE_FLAG,
} from "./types";

const alarmSounds = [
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
const dayHashTable = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
type actionTypes = {
    type: string;
    id?: number;
    payload?: any;
};
type initialStatesTypes = {
    alarms: {
        id: number;
        alarmTime: Date;
        repeat: {
            sunday: false;
            monday: false;
            tuesday: false;
            wednesday: false;
            thursday: false;
            friday: false;
            saturday: false;
            custom: false;
        };
        currentScheduleFlag: boolean;
        repeatFlag: boolean;
        sound: string;
        label: string | null;
    }[];
    alarmSounds: string[];
};

const initialStates: initialStatesTypes = {
    alarms: [],
    alarmSounds: alarmSounds,
};

const alarmReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case GET_ALL_ALARMS:
            return state;
        case SET_ALARM:
            const lastAlarmId =
                state.alarms.length === 0 ? 0 : state.alarms[0].id;

            return {
                ...state,
                alarms: [
                    {
                        id: lastAlarmId + 1,
                        alarmTime: action.payload,
                        repeat: {
                            sunday: false,
                            monday: false,
                            tuesday: false,
                            wednesday: false,
                            thursday: false,
                            friday: false,
                            saturday: false,
                            custom: false,
                        },
                        currentScheduleFlag: true,
                        repeatFlag: false,
                        sound: state.alarmSounds[1],
                        label: null,
                    },
                    ...state.alarms,
                ],
            };
        case UPDATE_ALARM_SCHEDULE_FLAG:
            const updatedAlarmsForScheduleFlag = state.alarms.map((alarm) => {
                return alarm.id === action.payload.id
                    ? {
                          ...alarm,
                          currentScheduleFlag:
                              action.payload.currentScheduleFlag,
                      }
                    : alarm;
            });
            return {
                ...state,
                alarms: updatedAlarmsForScheduleFlag,
            };
        case UPDATE_ALARM_LABEL:
            const updatedAlarmsForLabel = state.alarms.map((alarm) => {
                return alarm.id === action.payload.id
                    ? { ...alarm, label: action.payload.label }
                    : alarm;
            });
            return {
                ...state,
                alarms: updatedAlarmsForLabel,
            };
        case SET_ALARM_SOUND:
            const updatedAlarmForSound = state.alarms.map((alarm) => {
                return alarm.id === action.payload.id
                    ? { ...alarm, sound: action.payload.alarmSound }
                    : alarm;
            });
            return {
                ...state,
                alarms: updatedAlarmForSound,
            };
        case DELETE_ALARM:
            const indexOfDeleteAlarm = state.alarms.findIndex(
                (alarm) => alarm.id === action.payload.id
            );
            if (indexOfDeleteAlarm !== -1)
                state.alarms.splice(indexOfDeleteAlarm, 1);
            return {
                ...state,
            };
        case SET_REPEAT_ALARM:
            const updatedAlarmForRepeat = state.alarms.map((alarm) => {
                return alarm.id === action.payload.id
                    ? {
                          ...alarm,
                          repeat: {
                              ...alarm.repeat,
                              [dayHashTable[action.payload.index]]: !alarm.repeat[dayHashTable[action.payload.index]]
                          },
                      }
                    : alarm;
            });
            return {
                ...state,
                alarms: updatedAlarmForRepeat,
            };
        default:
            return state;
    }
};

export default alarmReducer;
