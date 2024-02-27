import { useState } from "react";
import { EEdits, TVolunteer } from "../types";
import { VolunteerForm } from ".";
import { updateAllDocument } from "../firebase";

interface IUpdateVolunteerProps {
  updateVolunteer: TVolunteer;
  setEditVolunteer: React.Dispatch<React.SetStateAction<EEdits>>;
}

export const UpdateVolunteer = ({
  updateVolunteer,
  setEditVolunteer,
}: IUpdateVolunteerProps) => {
  const [updatedVolunteer, setUpdatedVolunteer] = useState<TVolunteer>({
    volunteerId: updateVolunteer.volunteerId,
    volunteerFirstName: updateVolunteer.volunteerFirstName,
    volunteerLastName: updateVolunteer.volunteerLastName,
    volunteerEmail: updateVolunteer.volunteerEmail,
    volunteerPhone: updateVolunteer.volunteerPhone,
    admin: updateVolunteer.admin,
    clockedIn: updateVolunteer.clockedIn,
    punchId: updateVolunteer.punchId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [id]: value,
    }));
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAllDocument<TVolunteer>(
      "volunteers",
      updatedVolunteer.volunteerId,
      updatedVolunteer,
    );
    setEditVolunteer(EEdits.None);
  };

  return (
    <div className="h-full w-full">
      <div className="h-[80%] w-full">
        {updatedVolunteer && (
          <VolunteerForm
            legend="Update Volunteer"
            formSubmit={formSubmit}
            formChange={handleChange}
            volunteer={updatedVolunteer}
            submit="Update Volunteer"
          />
        )}
      </div>
      <div className="h-full w-full p-4">
        <button
          className="w-full cursor-pointer rounded-md bg-red-500 py-2 font-semibold text-white transition duration-300 hover:bg-red-700"
          onClick={() => setEditVolunteer(EEdits.None)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
