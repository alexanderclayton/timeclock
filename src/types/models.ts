import { Timestamp } from "firebase/firestore"

export type TVolunteer = {
    volunteerId: string
    volunteerFirstName: string
    volunteerLastName: string
    volunteerEmail: string
    volunteerPhone: string
    admin: boolean
    clockedIn: boolean
    punchId: string
}

export type TPunch = {
    volunteerId: string
    clockIn?: Date | Timestamp
    clockOut?: Date | Timestamp
}