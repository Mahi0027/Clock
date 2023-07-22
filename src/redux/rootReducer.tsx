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

const rootReducer = combineReducers({
    theme: themeReducer,
    clockStyle: styleReducer,
    second: secondReducer,
    timeZone: timeZoneReducer,
    silent: silentReducer,
    snooze: snoozeReducer,
    volume: volumeReducer,
    weekOn: weekOnReducer,
    homePage: BottomNavbar,
});

export default rootReducer;
