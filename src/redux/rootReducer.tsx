import { combineReducers } from "redux";
import themeReducer from "./features/setting/personalize/theme/themeReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
});

export default rootReducer;
