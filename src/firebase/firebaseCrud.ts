import { doc, collection, query, where, updateDoc, getDoc, getDocs, WithFieldValue, DocumentData, setDoc } from "firebase/firestore";
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

export const getDocument = async (
    collectionName: string,
    documentName: string,
) => {
    try {
        const docRef = doc(db, collectionName, documentName)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document Data:", docSnap.data())
            return docSnap.data()
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
    let volunteerArray: T[] = []
    const querySnapshot = await getDocs(collection(db, collectionName))
    querySnapshot.forEach((doc) => {
        volunteerArray.push(doc.data() as T)
    })
    setDocuments(volunteerArray)
}

export const queryDocuments = async<T>(
    collectionName: string,
    queryField: keyof T,
    fieldValue: string
) => {
    const queryRef = collection(db, collectionName)
    const q = query(queryRef, where(queryField as string, "==", fieldValue))
    let documentArray: T[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        documentArray.push(doc.data() as T)
    })
    return documentArray
}
