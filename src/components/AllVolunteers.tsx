import { useState, useEffect } from "react";
import { EEdits, TVolunteer } from "../types";
import { getDocuments } from "../firebase";

interface IAllVolunteersProps {
  setAdminVolunteer: React.Dispatch<React.SetStateAction<string>>;
  editVolunteer: EEdits;
  setEditVolunteer: React.Dispatch<React.SetStateAction<EEdits>>;
}

export const AllVolunteers = ({
  setAdminVolunteer,
  editVolunteer,
  setEditVolunteer,
}: IAllVolunteersProps) => {
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );

  const handleVolunteerSelect = async (volunteer: TVolunteer) => {
    setAdminVolunteer(volunteer.volunteerId);
  };

  useEffect(() => {
    getDocuments("volunteers", setAllVolunteers);
  }, [editVolunteer]);
  return (
    <>
      {allVolunteers && (
        <div className="flex h-[80%] flex-col items-center">
          <h2 className="h-[15%] text-2xl">All Volunteers</h2>
          <div className="h-[70%] w-[90%] overflow-y-auto rounded bg-gray-100 p-4 shadow">
            {allVolunteers.map((volunteer, idx) => (
              <div
                key={idx}
                onClick={() => handleVolunteerSelect(volunteer)}
                className="pl-4 hover:cursor-pointer hover:bg-purple-200"
              >
                {volunteer.volunteerFirstName} {volunteer.volunteerLastName}
                {" - "}
                {volunteer.volunteerId}
              </div>
            ))}
          </div>
          <button
            onClick={() => setEditVolunteer(EEdits.Add)}
            className="h-[15%] text-green-500"
          >
            Add Volunteer
          </button>
        </div>
      )}
    </>
  );
};
