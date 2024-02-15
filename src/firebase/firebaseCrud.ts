import { doc, collection, addDoc, updateDoc, getDoc, WithFieldValue, DocumentData } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";

export const addDocument = async<T extends WithFieldValue<DocumentData>>(
    collectionName: string,
    data: T
) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data)
        console.log(`Added ${docRef.id} to the ${collectionName} collection`)
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}

export const updateDocument = async<T>(
    collectionName: string,
    documentName: string,
    updateField: keyof T,
    fieldValue: Date | boolean
) => {
    try {
        const docRef = doc(db, collectionName, documentName)
        if (fieldValue instanceof Date) {
            await updateDoc(docRef, {
                [updateField]: fieldValue
            })
            console.log("Added punch")
        } else {
            await updateDoc(docRef, {
                [updateField]: !fieldValue
            })
            console.log("clocked in/out")
        }
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}

export const getDocument = async (
    collectionName: string,
    documentName: string,
) => {
    try {
        const docRef = doc(db, collectionName, documentName)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document Data:", docSnap.data())
        }
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}

