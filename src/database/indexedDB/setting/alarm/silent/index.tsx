import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "alarmSilentSetting";

/* The `allSilentIntervalStaticValues` constant is an array of strings that represents all the possible
silent intervals for an alarm. Each string in the array represents a specific time interval, such as
"1 minute", "5 minutes", "10 minutes", etc. This array is used as the initial data for the
`allSilentIntervals` property in the `initialStates` object. */
const allSilentIntervalStaticValues: string[] = [
    "1 minute",
    "5 minutes",
    "10 minutes",
    "15 minutes",
    "20 minutes",
    "25 minutes",
];
/**
 * The above type represents the initial states of a TypeScript React component, including an id, an
 * array of all silent intervals, and the current silent interval.
 * @property {number} id - A unique identifier for the initial state.
 * @property {string[]} allSilentIntervals - An array of strings representing all the silent intervals.
 * @property {string} currentSilentInterval - The `currentSilentInterval` property is a string that
 * represents the current silent interval. It is used to keep track of the currently selected silent
 * interval.
 */
export type initialStatesTypes = {
    id: number;
    allSilentIntervals: string[];
    currentSilentInterval: string;
};
/* The `initialStates` constant is an object that represents the initial state of the alarm silent
settings. It has three properties: */
const initialStates: initialStatesTypes = {
    id: 1,
    allSilentIntervals: allSilentIntervalStaticValues,
    currentSilentInterval: allSilentIntervalStaticValues[0],
};

/**
 * The function `storeInitialAlarmSilentDataInDB` stores initial alarm silent data in a database.
 * @returns a Promise.
 */
export const storeInitialAlarmSilentDataInDB = async () => {
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
 * The function `setCurrentAlarmSilentInDB` updates the current silent interval for an alarm in a
 * database.
 * @param {string} newCurrentAlarmSilent - The new value for the current alarm silent interval.
 * @returns a Promise.
 */
export const setCurrentAlarmSilentInDB = async (
    newCurrentAlarmSilent: string
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
        existingObject.currentSilentInterval = newCurrentAlarmSilent;
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
