import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "alarmSnoozeSetting";
/* initial data */
const allSnoozeIntervalStaticValues: string[] = [];
for (let i = 1; i <= 30; i++) {
    allSnoozeIntervalStaticValues.push(i + (i == 1 ? " minute" : " minutes"));
}

export type initialStatesTypes = {
    id: number;
    allSnoozeIntervals: string[];
    currentSnoozeInterval: string;
};
const initialStates: initialStatesTypes = {
    id: 1,
    allSnoozeIntervals: allSnoozeIntervalStaticValues,
    currentSnoozeInterval: allSnoozeIntervalStaticValues[0],
};
/* initial data */
export const storeInitialAlarmSnoozeDataInDB = async () => {
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

export const setCurrentAlarmSnoozeInDB = async (
    newCurrentAlarmSnooze: string
) => {
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
    existingObject.currentSnoozeInterval = newCurrentAlarmSnooze;
    const request = objectStore.put(existingObject);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
