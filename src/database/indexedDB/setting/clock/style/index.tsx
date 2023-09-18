import { db, openDB, initialDataInIndexedDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "clockStyleSetting";
/* initial data */
export type initialStatesTypes = {
    id: number;
    allStyles: string[];
    currentStyle: string;
};
const AllStyles = ["Analog", "Digital"];
const initialStates: initialStatesTypes = {
    id: 1,
    allStyles: AllStyles,
    currentStyle: AllStyles[0],
};

/**
 * The function `storeInitialClockStyleDataInDB` stores initial clock style data in a database.
 * @returns a Promise.
 */
export const storeInitialClockStyleDataInDB = async () => {
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
 * The above function is a TypeScript React function that updates the current clock style in a
 * database.
 * @param {string} newCurrentClockStyle - The newCurrentClockStyle parameter is a string that
 * represents the new clock style that you want to set in the database.
 * @returns a Promise.
 */
export const setCurrentClockStyleInDB = async (
    newCurrentClockStyle: string
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
        existingObject.currentStyle = newCurrentClockStyle;
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
