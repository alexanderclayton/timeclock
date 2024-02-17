import React from "react";
import { TVolunteer } from "../types";

interface ITimesheetCardProps {
  volunteer: TVolunteer;
  setShiftId: React.Dispatch<React.SetStateAction<string>>;
}

export const TimesheetCard = ({
  volunteer,
  setShiftId,
}: ITimesheetCardProps) => {
  return (
    <div onClick={() => setShiftId(volunteer.volunteerId)}>
      <p>{volunteer.volunteerFirstName}</p>
      <p>{volunteer.volunteerLastName}</p>
    </div>
  );
};
