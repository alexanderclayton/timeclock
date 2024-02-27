import { doc, collection, query, where, updateDoc, getDoc, getDocs, WithFieldValue, DocumentData, setDoc, deleteField, FieldValue, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";

export const addDocument = async<T extends WithFieldValue<DocumentData>>(
    collectionName: string,
    documentName: string,
    data: T
) => {
    try {
        await setDoc(doc(db, collectionName, documentName), data)
        console.log(`Added ${documentName} to the ${collectionName} collection`)
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
    fieldValue: Date | boolean,
    punchIdValue?: string,
) => {
    try {
        const docRef = doc(db, collectionName, documentName)
        if (fieldValue instanceof Date) {
            await updateDoc(docRef, {
                [updateField]: fieldValue
            })
            console.log("Added punch")
        } else {
            if (punchIdValue) {
                await updateDoc(docRef, {
                    [updateField]: fieldValue,
                    punchId: punchIdValue
                })
            } else {
                await updateDoc(docRef, {
                    [updateField]: fieldValue
                })
            }
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

export const updateAllDocument = async <T extends DocumentData>(
    collectionName: string,
    documentName: string,
    documentContent: T
) => {
    try {
        const docRef = doc(db, collectionName, documentName)
        await updateDoc(docRef, documentContent)
        console.log(`Updated ${collectionName}`);
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}

export const getDocument = async <T>(
    collectionName: string,
    documentName: string,
) => {
    try {
        const docRef = doc(db, collectionName, documentName)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document Data:", docSnap.data())
            return docSnap.data() as T
        } else {
            console.log("No document")
            return null
        }
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}

export const getDocuments = async<T>(
    collectionName: string,
    setDocuments: React.Dispatch<React.SetStateAction<T[] | undefined>>
) => {
    try {
        let volunteerArray: T[] = []
        const querySnapshot = await getDocs(collection(db, collectionName))
        querySnapshot.forEach((doc) => {
            volunteerArray.push(doc.data() as T)
        })
        setDocuments(volunteerArray)
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}

export const queryDocuments = async<T>(
    collectionName: string,
    queryField: keyof T,
    fieldValue: string
) => {
    try {
        const queryRef = collection(db, collectionName)
        const q = query(queryRef, where(queryField as string, "==", fieldValue))
        let documentArray: T[] = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            documentArray.push(doc.data() as T)
        })
        return documentArray
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}

export const deleteDocument = async (
    collectionName: string,
    documentName: string,
    deleteFields: (deleteFields: FieldValue) => Record<string, FieldValue>
) => {
    try {
        const docRef = doc(db, collectionName, documentName)
        await updateDoc(docRef, deleteFields(deleteField()))
        await deleteDoc(docRef)
        console.log('document deleted')
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("Firebase Error:", error.message)
        } else {
            console.error("Unknown error:", error)
        }
    }
}
