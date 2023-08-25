import { combineReducers } from "redux";
import themeReducer from "./features/setting/personalize/theme/themeReducer";
import styleReducer from "./features/setting/clock/style/styleReducer";
import secondReducer from "./features/setting/clock/second/secondReducer";
import timeZoneReducer from "./features/setting/clock/timeZone/timeZoneReducer";
import silentReducer from "./features/setting/alarm/silent/silentReducer";
import snoozeReducer from "./features/setting/alarm/snooze/snoozeReducer";
import volumeReducer from "./features/setting/alarm/volume/volumeReducer";
import weekOnReducer from "./features/setting/alarm/weekOn/weekOnReducer";
import BottomNavbar from "./features/bottomNavbar/reducer";
import AnalogClockThemeReducer from "./features/setting/clock/clockTheme/analog/reducer";
import DigitalClockThemeReducer from "./features/setting/clock/clockTheme/digital/reducer";
import alarmReducer from "./features/home/alarm/reducer";
import timerReducer from "./features/home/timer/reducer";
import timerSettingReducer from "./features/setting/timer/reducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    clockStyle: styleReducer,
    analogClockTheme: AnalogClockThemeReducer,
    digitalClockTheme: DigitalClockThemeReducer,
    second: secondReducer,
    timeZone: timeZoneReducer,
    alarmSilent: silentReducer,
    alarmSnooze: snoozeReducer,
    alarmVolume: volumeReducer,
    alarmWeekOn: weekOnReducer,
    timerSetting: timerSettingReducer,
    homePage: BottomNavbar,
    alarm: alarmReducer,
    timer: timerReducer,
});

export default rootReducer;
