type TVolunteer = {
    volunteerId: string
    volunteerFirstName: string
    volunteerLastName: string
    volunteerEmail: string
    volunteerPhone: string
    volunteerClockedIn: boolean
}

type TPunch = {
    volunteerId: string
    clockIn: Date
    clockOut?: Date
}