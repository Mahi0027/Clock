import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "alarms";

/* The `const alarmSounds` is an array that contains a list of alarm sound options. These options can
be selected by the user when setting an alarm. */
const alarmSounds = [
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
// const dayHashTable = [
//     "sunday",
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
// ];

export type initialStatesTypes = {
    id: number;
    alarms: {
        id: number;
        alarmTime: Date;
        repeat: {
            sunday: {
                flag: boolean;
                time: Date | null;
            };
            monday: {
                flag: boolean;
                time: Date | null;
            };
            tuesday: {
                flag: boolean;
                time: Date | null;
            };
            wednesday: {
                flag: boolean;
                time: Date | null;
            };
            thursday: {
                flag: boolean;
                time: Date | null;
            };
            friday: {
                flag: boolean;
                time: Date | null;
            };
            saturday: {
                flag: boolean;
                time: Date | null;
            };
        };
        currentScheduleFlag: boolean;
        repeatFlag: boolean;
        sound: string;
        label: string | null;
    }[];
    alarmSounds: string[];
};

/* The `const initialStates` is an object that represents the initial state of the alarm data in the
application. It has three properties: */
const initialStates: initialStatesTypes = {
    id: 1,
    alarms: [],
    alarmSounds: alarmSounds,
};

/**
 * The function `storeInitialAlarmDataInDB` stores initial alarm data in a database using IndexedDB.
 * @returns The function `storeInitialAlarmDataInDB` returns a Promise.
 */
export const storeInitialAlarmDataInDB = async () => {
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
 * The function `setAlarmInDB` is used to save data to a database using IndexedDB in a TypeScript React
 * application.
 * @param {any} data - The `data` parameter is an object that contains the information for the alarm
 * that needs to be stored in the database.
 * @returns The function `setAlarmInDB` returns a Promise.
 */
export const setAlarmInDB = async (data: any) => {
    try {
        if (!db) await openDB();
        const transaction = db.transaction(COLLECTION_NAME, "readwrite");
        const objectStore = transaction.objectStore(COLLECTION_NAME);

        /* fetch existing theme object. */
        const request = objectStore.put(data);
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
