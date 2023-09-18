import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "timeZoneSetting";
/* initial data */
export type initialStatesTypes = {
    id: number;
    loading: boolean;
    allTimeZones: string[];
    currentTimeZone: string;
    error: string;
};
const initialStates: initialStatesTypes = {
    id: 1,
    loading: true,
    allTimeZones: [],
    currentTimeZone: "Asia/Kolkata",
    error: "",
};

/**
 * The function `storeInitialTimeZoneDataInDB` stores initial time zone data in a database.
 * @returns The function `storeInitialTimeZoneDataInDB` returns a promise.
 */
export const storeInitialTimeZoneDataInDB = async () => {
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
 * The function `setCurrentTimeZoneInDB` updates the current time zone in a database using IndexedDB.
 * @param {string} newCurrentTimeZone - The newCurrentTimeZone parameter is a string that represents
 * the new time zone value that you want to set in the database.
 * @returns a Promise.
 */
export const setCurrentTimeZoneInDB = async (newCurrentTimeZone: string) => {
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
        existingObject.currentTimeZone = newCurrentTimeZone;
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
