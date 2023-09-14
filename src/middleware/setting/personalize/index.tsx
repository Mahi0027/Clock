import { setCurrentThemeInDB, storeInitialData } from "@/database/indexedDB/setting/personalize";
import { setInitialStatesForThemes, setTheme } from "@/redux";

export const initializeThemeStates = () => {
    return async (dispatch: any) => {
        try {
            const result = await storeInitialData();
            dispatch(setInitialStatesForThemes(result));
            return Promise.resolve(true);
        } catch (error) {
            console.log("Error:", error);
            return Promise.reject(error);
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