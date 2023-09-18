import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "alarmVolumeSetting";

/**
 * The above type represents the initial states of a component in a TypeScript React application.
 * @property {number} id - A unique identifier for the initial state.
 * @property {number} minValue - The `minValue` property represents the minimum value that the
 * `currentValue` can have.
 * @property {number} maxValue - The `maxValue` property represents the maximum value that the
 * `currentValue` property can have.
 * @property {number} currentValue - The `currentValue` property represents the current value of
 * something. It could be a number, a string, or any other type of value depending on the context in
 * which it is used.
 */
export type initialStatesTypes = {
    id: number;
    minValue: number;
    maxValue: number;
    currentValue: number;
};
/* The `const initialStates` is an object that represents the initial alarm volume data. It has four
properties: `id`, `minValue`, `maxValue`, and `currentValue`. */
const initialStates: initialStatesTypes = {
    id: 1,
    minValue: 0,
    maxValue: 100,
    currentValue: 25, //can set any value
};

/**
 * The function `storeInitialAlarmVolumeDataInDB` stores initial alarm volume data in a database.
 * @returns a Promise.
 */
export const storeInitialAlarmVolumeDataInDB = async () => {
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
 * The function `setCurrentAlarmVolumeInDB` updates the current alarm volume in a database using
 * IndexedDB.
 * @param {number} newCurrentAlarmVolume - The newCurrentAlarmVolume parameter is the new value for the
 * current alarm volume that you want to set in the database.
 * @returns a Promise.
 */
export const setCurrentAlarmVolumeInDB = async (
    newCurrentAlarmVolume: number | number[]
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
        existingObject.currentValue = newCurrentAlarmVolume;
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
