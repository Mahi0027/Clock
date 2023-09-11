const DB_NAME: string = "clock";
let DB_VERSION: number = 4;
export let db: any;
const allCollectionsName = [
    "personalizeSetting",
    "analogClockSetting",
    "digitalClockSetting",
    "clockStyleSetting",
    "secondFlagSetting",
    "timeZoneSetting",
    "alarmSilentSetting",
    "alarmSnoozeSetting",
    "alarmVolumeSetting",
    "timerSetting",
    "alarms",
];
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = (event) => {
            reject(request.error);
        };
        request.onsuccess = (event) => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            db = request.result;
            allCollectionsName.forEach((collectionName) => {
                if (!db.objectStoreNames.contains(collectionName)) {
                    db.createObjectStore(collectionName, { keyPath: "id" });
                }
            });
        };
    });
};

export const initialDataInIndexedDB = async (
    collectionName: string,
    initialState: any
) => {
    if (!db) await openDB();
    const transaction = db.transaction(collectionName, "readwrite");
    const objectStore = transaction.objectStore(collectionName);
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
    const request = objectStore.put(initialState);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
