import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "alarmVolumeSetting";
/* initial data */
export type initialStatesTypes = {
    id: number;
    minValue: number;
    maxValue: number;
    currentValue: number;
};
const initialStates: initialStatesTypes = {
    id: 1,
    minValue: 0,
    maxValue: 100,
    currentValue: 25, //can set any value
};
/* initial data */
export const storeInitialAlarmVolumeDataInDB = async () => {
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

export const setCurrentAlarmVolumeInDB = async (
    newCurrentAlarmVolume: number
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
    existingObject.currentValue = newCurrentAlarmVolume;
    const request = objectStore.put(existingObject);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
