import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "analogClockSetting";
/* initial data */
const themes = [
    "clock1",
    "clock2",
    "clock3",
    "clock4",
    "clock5",
    "clock6",
    "clock7",
    "clock8",
    "clock9",
    "clock10",
];
type initialStatesTypes = {
    id: number;
    allThemes: string[];
    currentTheme: string;
};
const initialStates: initialStatesTypes = {
    id: 1,
    allThemes: themes,
    currentTheme: themes[0],
};

/**
 * The function `storeInitialAnalogClockSettingDataInDB` stores initial analog clock setting data in a
 * database.
 * @returns a Promise.
 */
export const storeInitialAnalogClockSettingDataInDB = async () => {
    try {
        if (!db) await openDB();
        const transaction = db.transaction(COLLECTION_NAME, "readwrite");
        const objectStore = transaction.objectStore(COLLECTION_NAME);
        const checkExistingRecord = objectStore.get(1);
        let existingObject: any = await new Promise((resolve, reject) => {
            checkExistingRecord.onsuccess = () => {
                resolve(checkExistingRecord.result);
            };
            checkExistingRecord.onerror = () =>
                reject(checkExistingRecord.error);
        });
        if (existingObject) {
            if (existingObject.id !== undefined) {
                return existingObject;
            }
        }
        const request = objectStore.put(initialStates);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
};

/**
 * The function `setCurrentAnalogClockThemeInDB` updates the current analog clock theme in a database.
 * @param {string} newCurrentAnalogClockTheme - The newCurrentAnalogClockTheme parameter is a string
 * that represents the new theme for the analog clock.
 * @returns a Promise.
 */
export const setCurrentAnalogClockThemeInDB = async (
    newCurrentAnalogClockTheme: string
) => {
    try {
        if (!db) await openDB();
        const transaction = db.transaction(COLLECTION_NAME, "readwrite");
        const objectStore = transaction.objectStore(COLLECTION_NAME);

        /* fetch existing theme object. */
        const existingResult = await objectStore.get(1);
        let existingObject: any = await new Promise((resolve, reject) => {
            existingResult.onsuccess = () => {
                resolve(existingResult.result);
            };
            existingResult.onerror = () => reject(existingResult.error);
        });
        existingObject.currentTheme = newCurrentAnalogClockTheme;
        const request = objectStore.put(existingObject);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
};
