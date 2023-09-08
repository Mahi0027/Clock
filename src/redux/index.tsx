export {
    setInitialStatesForClockStyle,
    fetchAllStyles,
    setStyle,
} from "./features/setting/clock/style/styleActions";
export {
    setInitialStatesForThemes,
    fetchAllThemes,
    setTheme,
} from "./features/setting/personalize/theme/themeActions";
export {
    setInitialStatesForAnalogClockThemes,
    setAnalogClockTheme,
} from "./features/setting/clock/clockTheme/analog/actions";
export {
    setInitialStatesForDigitalClockThemes,
    setDigitalClockTheme,
} from "./features/setting/clock/clockTheme/digital/actions";
export {
    setInitialStatesForSecondFlag,
    getSecondFlag,
    setSecondFlag,
} from "./features/setting/clock/second/secondAction";
export {
    getAllTimeZones,
    setTimeZone,
    fetchTimeZoneRequest,
    fetchTimeZonesSuccess,
    fetchTimeZoneFailure,
    fetchTimeZone,
} from "./features/setting/clock/timeZone/timeZoneActions";
export {
    getAllSilentIntervals,
    setSilentInterval,
} from "./features/setting/alarm/silent/silentActions";
export {
    getAllSnoozeIntervals,
    setSnoozeInterval,
} from "./features/setting/alarm/snooze/snoozeActions";
export { setVolume } from "./features/setting/alarm/volume/volumeActions";
export {
    getAllWeekOnValues,
    setWeekOnValue,
} from "./features/setting/alarm/weekOn/weekOnActions";
export { setCurrentHomePage } from "./features/bottomNavbar/actions";

export {
    getAllAlarm,
    setAlarm,
    updateAlarmTime,
    updateAlarmScheduleFlag,
    updateAlarmLabel,
    deleteAlarm,
    setRepeatAlarm,
} from "./features/home/alarm/actions";

export {
    getAllTimerSounds,
    setTimerSound,
    setTimerVolume,
    setTimerSilentInterval,
} from "./features/setting/timer/actions";

export {
    getAllTimers,
    setTimer,
    updateTimerTime,
    updateRemainingTimerTime,
    updateTimerScheduleFlag,
    updateTimerLabel,
    // setTimerSound,
    deleteTimer,
    updateTimerIntervalRef,
    updatePauseFlag,
    addOrReduceTimeInTimer,
    setTimerRingDOM,
    setTimerCompletedFlag,
} from "./features/home/timer/actions";

export {
    setHour,
    setMinute,
    setSecond,
    setMillisecond,
    setShowHour,
    setShowMinute,
    setShowSecond,
    setShowMillisecond,
    setStopwatchTimer,
    setSnapshot,
    setCurrentPlayFlag,
    setLeavePageTime,
    getStopwatchStates,
    stopStopwatch,
} from "./features/home/stopwatch/actions";
