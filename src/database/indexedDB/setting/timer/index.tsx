import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "timerSetting";

/* The `timerSounds` constant is an array of strings that represents different timer sounds. Each
string in the array represents a specific sound that can be played when the timer is active. These
sound options can be used to populate a dropdown or select input in a user interface, allowing the
user to choose a sound for the timer. */
const timerSounds = [
    "bedside",
    "bell",
    "digital",
    "joy",
    "naturesounds",
    "oldmechanic",
    "oldphone",
    "oversimplified",
    "ringtone",
    "short",
];

/* The `allSilentIntervalStaticValues` constant is an array of strings that represents different silent
intervals for a timer. Each string in the array represents a specific time interval, such as "1
minute", "5 minutes", "10 minutes", etc. These values can be used to populate a dropdown or select
input in a user interface, allowing the user to choose a silent interval for the timer. */
const allSilentIntervalStaticValues: string[] = [
    "1 minute",
    "5 minutes",
    "10 minutes",
    "15 minutes",
    "20 minutes",
    "25 minutes",
];

/**
 * The above type represents the initial states for a TypeScript React application related to a timer.
 * @property {number} id - A unique identifier for the initial state.
 * @property {string[]} allTimerSounds - An array of strings representing all the available timer
 * sounds.
 * @property {string[]} allTimerSilentIntervals - An array of strings representing different silent
 * intervals for a timer.
 * @property {string} currentTimerSound - The currentTimerSound property represents the currently
 * selected sound for the timer. It is a string that specifies the sound file or name to be played when
 * the timer is active.
 * @property {string} currentSilentInterval - The `currentSilentInterval` property represents the
 * currently selected silent interval for a timer. It is a string value that can be one of the
 * available silent intervals from the `allTimerSilentIntervals` array.
 * @property {number} timerMinVolume - The minimum volume level for the timer sound.
 * @property {number} timerMaxVolume - The maximum volume level for the timer sound.
 * @property {number} timerCurrentVolume - The `timerCurrentVolume` property represents the current
 * volume level of the timer.
 */
export type initialStatesTypes = {
    id: number;
    allTimerSounds: string[];
    allTimerSilentIntervals: string[];
    currentTimerSound: string;
    currentSilentInterval: string;
    timerMinVolume: number;
    timerMaxVolume: number;
    timerCurrentVolume: number;
};
/* The `initialStates` constant is an object that represents the initial state of the timer settings.
It contains the following properties: */
const initialStates: initialStatesTypes = {
    id: 1,
    allTimerSounds: timerSounds,
    allTimerSilentIntervals: allSilentIntervalStaticValues,
    currentTimerSound: timerSounds[1],
    currentSilentInterval: allSilentIntervalStaticValues[0],
    timerMinVolume: 0,
    timerMaxVolume: 100,
    timerCurrentVolume: 25,
};

/**
 * The function `storeInitialTimerSettingDataInDB` stores initial timer setting data in a database.
 * @returns a Promise.
 */
export const storeInitialTimerSettingDataInDB = async () => {
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
 * The function `setTimerSoundInDB` updates the current timer sound in a database.
 * @param {string} newTimerSound - The `newTimerSound` parameter is a string that represents the new
 * timer sound that you want to set in the database.
 * @returns a Promise.
 */
export const setTimerSoundInDB = async (newTimerSound: string) => {
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
        existingObject.currentTimerSound = newTimerSound;
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

/**
 * The function `setTimerSilentInDB` updates the `currentSilentInterval` property of an existing object
 * in a database.
 * @param {string} newTimerSilent - The `newTimerSilent` parameter is a string that represents the new
 * value for the timer silent interval.
 * @returns a Promise.
 */
export const setTimerSilentInDB = async (newTimerSilent: string) => {
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
        existingObject.currentSilentInterval = newTimerSilent;
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

/**
 * The function `setTimerVolumeInDB` updates the timer volume in a database using IndexedDB.
 * @param {number} newTimerVolume - The newTimerVolume parameter is a number that represents the new
 * volume value for a timer.
 * @returns a Promise.
 */
export const setTimerVolumeInDB = async (newTimerVolume: number) => {
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
        existingObject.timerCurrentVolume = newTimerVolume;
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
