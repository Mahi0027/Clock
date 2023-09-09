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
/* initial data */
export const storeInitialClockStyleDataInDB = async () => {
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

export const setCurrentClockStyleInDB = async (
    newCurrentClockStyle: string
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
    existingObject.currentStyle = newCurrentClockStyle;
    const request = objectStore.put(existingObject);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
