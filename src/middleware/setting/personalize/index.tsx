import { setCurrentThemeInDB, storeInitialData } from "@/database/indexedDB/setting/personalize";
import { setInitialStatesForThemes, setTheme } from "@/redux";

export const initializeThemeStates = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialData();
            dispatch(setInitialStatesForThemes(result));
        } catch (error) {
            console.log("Error:", error);
        }
    };
};

export const setCurrentTheme = (value: string) => {
    return async (dispatch:any) => {
        try {
            await setCurrentThemeInDB(value);
            dispatch(setTheme(value));
        } catch(error) {
            console.log("Error:", error);
        }
    }
}