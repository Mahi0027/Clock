import {
    DELETE_ALARM,
    GET_ALL_ALARMS,
    SET_ALARM,
    SET_ALARM_SOUND,
    SET_INITIAL_STATES_FOR_ALARM,
    SET_REPEAT_ALARM,
    UPDATE_ALARM_LABEL,
    UPDATE_ALARM_SCHEDULE_FLAG,
    UPDATE_ALARM_TIME,
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
export type initialStatesTypes = {
    id: number;
    alarms: {
        id: number;
        alarmTime: Date;
        repeat: {
            sunday: {
                flag: boolean;
                time: Date | null;
            };
            monday: {
                flag: boolean;
                time: Date | null;
            };
            tuesday: {
                flag: boolean;
                time: Date | null;
            };
            wednesday: {
                flag: boolean;
                time: Date | null;
            };
            thursday: {
                flag: boolean;
                time: Date | null;
            };
            friday: {
                flag: boolean;
                time: Date | null;
            };
            saturday: {
                flag: boolean;
                time: Date | null;
            };
        };
        currentScheduleFlag: boolean;
        repeatFlag: boolean;
        sound: string;
        label: string | null;
    }[];
    alarmSounds: string[];
};

const initialStates: initialStatesTypes = {
    id: 1,
    alarms: [],
    alarmSounds: alarmSounds,
};

const alarmReducer = (state = initialStates, action: actionTypes) => {
    switch (action.type) {
        case SET_INITIAL_STATES_FOR_ALARM:
            return action.payload;
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
                            sunday: {
                                flag: false,
                                time: null,
                            },
                            monday: {
                                flag: false,
                                time: null,
                            },
                            tuesday: {
                                flag: false,
                                time: null,
                            },
                            wednesday: {
                                flag: false,
                                time: null,
                            },
                            thursday: {
                                flag: false,
                                time: null,
                            },
                            friday: {
                                flag: false,
                                time: null,
                            },
                            saturday: {
                                flag: false,
                                time: null,
                            },
                        },
                        currentScheduleFlag: true,
                        repeatFlag: false,
                        sound: state.alarmSounds[1],
                        label: null,
                    },
                    ...state.alarms,
                ],
            };
        case UPDATE_ALARM_TIME:
            const updatedAlarmForUpdatedTime = state.alarms.map((alarm) => {
                return alarm.id === action.payload.id
                    ? { ...alarm, alarmTime: action.payload.updatedAlarmTime }
                    : alarm;
            });
            return {
                ...state,
                alarms: updatedAlarmForUpdatedTime,
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
                const flagStatus: boolean =
                    alarm.repeat[dayHashTable[action.payload.dayOfWeek]].flag;
                return alarm.id === action.payload.id
                    ? {
                          ...alarm,
                          repeat: {
                              ...alarm.repeat,
                              [dayHashTable[action.payload.dayOfWeek]]: {
                                  flag: !alarm.repeat[
                                      dayHashTable[action.payload.dayOfWeek]
                                  ].flag,
                                  time: !flagStatus
                                      ? action.payload.newAlarmTime
                                      : null,
                              },
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
