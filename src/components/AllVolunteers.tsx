import { useState, useEffect } from "react";
import { TVolunteer } from "../types";
import { getDocuments } from "../firebase";

interface IAllVolunteersProps {
  setUpdateVolunteerId: React.Dispatch<React.SetStateAction<string>>;
}

export const AllVolunteers = ({
  setUpdateVolunteerId,
}: IAllVolunteersProps) => {
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
        <div>
          <h2 className="text-2xl">All Volunteers</h2>
          {allVolunteers.map((volunteer, idx) => (
            <div
              key={idx}
              onClick={() => setUpdateVolunteerId(volunteer.volunteerId)}
            >
              {volunteer.volunteerFirstName} {volunteer.volunteerLastName}{" "}
              {volunteer.volunteerId}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
