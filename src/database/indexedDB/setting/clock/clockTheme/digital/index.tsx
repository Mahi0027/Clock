import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "digitalClockSetting";
/* initial data */
const themes = [
    "Open Sans, sans-serif",
    "Tektur, cursive",
    "Dai Banna SIL, serif",
    "Dancing Script, cursive",
    "Handjet, cursive",
    "Kablammo, cursive",
    "Kalam, cursive",
    "Lumanosimo, cursive",
    "Playfair Display, serif",
    "Raleway Dots, cursive",
    "Shojumaru, cursive",
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
 * The function `storeInitialDigitalClockSettingDataInDB` stores initial digital clock setting data in
 * a database.
 * @returns a Promise.
 */
export const storeInitialDigitalClockSettingDataInDB = async () => {
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

export const setCurrentDigitalClockThemeInDB = async (
    newCurrentDigitalClockTheme: string
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
        existingObject.currentTheme = newCurrentDigitalClockTheme;
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
