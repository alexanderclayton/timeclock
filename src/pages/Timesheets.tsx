import { useEffect, useState } from "react";
import { TVolunteer } from "../types";
import { getDocuments } from "../firebase";
import { Shifts } from "../components/Shifts";

export const Timesheets = () => {
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );

  useEffect(() => {
    getDocuments("volunteers", setAllVolunteers);
  }, []);

  return (
    <div>
      {allVolunteers?.map((volunteer, idx) => (
        <div key={idx}>
          {volunteer.volunteerFirstName}
          {volunteer.volunteerLastName}
          {volunteer.volunteerEmail}
          {volunteer.volunteerPhone}
          {volunteer.volunteerId}
          <Shifts volunteerId={volunteer.volunteerId} />
        </div>
      ))}
    </div>
  );
};
