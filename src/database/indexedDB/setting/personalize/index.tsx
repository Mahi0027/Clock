import { db, openDB } from "@/database/indexedDB/index";

const COLLECTION_NAME: string = "personalizeSetting";
/* theme initial data. */
type initialStatesTypes = {
    id: number;
    allThemes: string[];
    currentTheme: string;
    style: {
        backgroundColor: string;
        color: string;
    };
};
const allThemes = ["light", "dark"];
const initialStates: initialStatesTypes = {
    id: 1,
    allThemes: allThemes,
    currentTheme: allThemes[0],
    style: {
        backgroundColor: "#ffffff",
        color: "#000000",
    },
};
/* theme initial data. */
export const storeInitialData = async () => {
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

/**
 * The function `setCurrentThemeInDB` updates the current theme in a database and also updates the
 * style object based on the new theme.
 * @param {string} newCurrentTheme - The newCurrentTheme parameter is a string that represents the new
 * theme that needs to be set in the database. It can have two possible values: "light" or "dark".
 * @returns a Promise that resolves to the result of the `put` operation on the object store.
 */
export const setCurrentThemeInDB = async (newCurrentTheme: string) => {
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
    existingObject.currentTheme = newCurrentTheme;
    existingObject.style = {
        backgroundColor: newCurrentTheme === "light" ? "#ffffff" : "#000000",
        color: newCurrentTheme === "light" ? "#000000" : "#ffffff",
    };
    const request = objectStore.put(existingObject);
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

/**
 * The function retrieves the current theme object from a database.
 * @returns The function `getCurrentThemeInDB` returns a promise that resolves to the existing theme
 * object fetched from the object store in the database.
 */
export const getCurrentThemeInDB = async () => {
    if (!db) await openDB();
    const transaction = db.transaction(COLLECTION_NAME, "readwrite");
    const objectStore = transaction.objectStore(COLLECTION_NAME);

    /* fetch existing theme object. */
    const existingResult = await objectStore.get(1);
    return new Promise((resolve, reject) => {
        existingResult.onsuccess = () => {
            resolve(existingResult.result);
        };
        existingResult.onerror = () => reject(existingResult.error);
    });
};
