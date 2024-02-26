import { useState } from "react";
import { randomSix } from "../helpers";
import { EEdits, TVolunteer } from "../types";
import { VolunteerForm } from ".";
import { addDocument } from "../firebase";

interface IAddVolunteerProps {
  setEditVolunteer: React.Dispatch<React.SetStateAction<EEdits>>;
  setAdminVolunteer: React.Dispatch<
    React.SetStateAction<TVolunteer | undefined>
  >;
}

export const AddVolunteer = ({
  setEditVolunteer,
  setAdminVolunteer,
}: IAddVolunteerProps) => {
  const [volunteer, setVolunteer] = useState<TVolunteer>({
    volunteerId: randomSix(),
    volunteerFirstName: "",
    volunteerLastName: "",
    volunteerEmail: "",
    volunteerPhone: "",
    admin: false,
    clockedIn: false,
    punchId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [id]: value,
    }));
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDocument("volunteers", volunteer.volunteerId, volunteer);
      setEditVolunteer(EEdits.None);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const cancel = () => {
    setEditVolunteer(EEdits.None);
    setAdminVolunteer(undefined);
  };

  return (
    <div className="h-full w-full">
      <div className="h-[80%] w-full">
        <VolunteerForm
          legend="Add Volunteer"
          formSubmit={formSubmit}
          formChange={handleChange}
          volunteer={volunteer}
          submit="Add!"
        />
      </div>
      <div className="h-full w-full p-4">
        <button
          className="w-full cursor-pointer rounded-md bg-red-500 py-2 font-semibold text-white transition duration-300 hover:bg-red-700"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
