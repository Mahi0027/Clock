import { combineReducers } from "redux";
import themeReducer from "./features/setting/personalize/theme/themeReducer";
import styleReducer from "./features/setting/clock/style/styleReducer";
import secondReducer from "./features/setting/clock/second/secondReducer";
import timeZoneReducer from "./features/setting/clock/timeZone/timeZoneReducer";
import silentReducer from "./features/setting/alarm/silent/silentReducer";
import snoozeReducer from "./features/setting/alarm/snooze/snoozeReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    clockStyle: styleReducer,
    second: secondReducer,
    timeZone: timeZoneReducer,
    silent: silentReducer,
    snooze: snoozeReducer,
});

export default rootReducer;
