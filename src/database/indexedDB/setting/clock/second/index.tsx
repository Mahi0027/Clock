import { db, openDB, initialDataInIndexedDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "secondFlagSetting";
/* initial data */
export type initialStatesTypes = {
    id: number;
    setSecond: boolean;
};
const initialStates: initialStatesTypes = {
    id: 1,
    setSecond: false,
};

/**
 * The function `storeInitialSecondFlagDataInDB` stores initial data in a database, checking if a
 * record already exists and returning it if it does.
 * @returns a Promise.
 */
export const storeInitialSecondFlagDataInDB = async () => {
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
 * The function `setCurrentSecondFlagInDB` updates a flag in a database with a new value.
 * @param {boolean} newCurrentSecondFlag - The newCurrentSecondFlag parameter is a boolean value that
 * represents the new value for the "setSecond" property in the existing object in the database.
 * @returns a Promise.
 */
export const setCurrentSecondFlagInDB = async (
    newCurrentSecondFlag: boolean
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
        existingObject.setSecond = newCurrentSecondFlag;
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
