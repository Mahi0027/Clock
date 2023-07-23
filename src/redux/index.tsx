export {
    fetchAllStyles,
    setStyle,
} from "./features/setting/clock/style/styleActions";

export {
    fetchAllThemes,
    setTheme,
} from "./features/setting/personalize/theme/themeActions";

export {
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
