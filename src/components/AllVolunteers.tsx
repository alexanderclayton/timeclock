import { useState, useEffect } from "react";
import { TVolunteer } from "../types";
import { getDocuments } from "../firebase";

interface IAllVolunteersProps {
  setUpdateVolunteer: React.Dispatch<React.SetStateAction<string>>;
}

export const AllVolunteers = ({ setUpdateVolunteer }: IAllVolunteersProps) => {
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!allVolunteers) {
      getDocuments("volunteers", setAllVolunteers);
    }
  }, []);
  return (
    <>
      {allVolunteers && (
        <>
          {allVolunteers.map((volunteer, idx) => (
            <div
              key={idx}
              onClick={() => setUpdateVolunteer(volunteer.volunteerId)}
            >
              {volunteer.volunteerFirstName} {volunteer.volunteerLastName}{" "}
              {volunteer.volunteerId}
            </div>
          ))}
        </>
      )}
    </>
  );
};
