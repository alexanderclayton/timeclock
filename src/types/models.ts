type TVolunteer = {
    volunteerId: string
    volunteerFirstName: string
    volunteerLastName: string
    volunteerEmail: string
    volunteerPhone: number
    volunteerClockedIn: boolean
}

type TPunch = {
    volunteerId: string
    clockIn: Date
    clockOut?: Date
}