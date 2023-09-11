import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "alarms";
/* initial data */
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
const dayHashTable = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

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

const initialStates: initialStatesTypes = {
    id: 1,
    alarms: [],
    alarmSounds: alarmSounds,
};
/* initial data */

export const storeInitialAlarmDataInDB = async () => {
    if (!db) await openDB();
    const transaction = db.transaction(COLLECTION_NAME, "readwrite");
    const objectStore = transaction.objectStore(COLLECTION_NAME);
    const checkExistingRecord = objectStore.get(1);
    let existingObject: any = await new Promise((resolve, reject) => {
        checkExistingRecord.onsuccess = () => {
            resolve(checkExistingRecord.result);
        };
        checkExistingRecord.onerror = () => reject(checkExistingRecord.error);
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
};

export const setAlarmInDB = async (data: any) => {
    if (!db) await openDB();
    const transaction = db.transaction(COLLECTION_NAME, "readwrite");
    const objectStore = transaction.objectStore(COLLECTION_NAME);

    /* fetch existing theme object. */
    const request = objectStore.put(data);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// export const setAlarmInDB = async (newTimerSound: string) => {
//     if (!db) await openDB();
//     const transaction = db.transaction(COLLECTION_NAME, "readwrite");
//     const objectStore = transaction.objectStore(COLLECTION_NAME);

//     /* fetch existing theme object. */
//     const existingResult = await objectStore.get(1);
//     let existingObject: any = await new Promise((resolve, reject) => {
//         existingResult.onsuccess = () => {
//             resolve(existingResult.result);
//         };
//         existingResult.onerror = () => reject(existingResult.error);
//     });
//     existingObject.currentTimerSound = newTimerSound;
//     const request = objectStore.put(existingObject);
//     return new Promise((resolve, reject) => {
//         request.onsuccess = () => resolve(request.result);
//         request.onerror = () => reject(request.error);
//     });
// };
