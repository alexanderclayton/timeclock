import { useState } from "react";
import { randomSix } from "../helpers";
import { addDocument } from "../firebase";
import { TVolunteer } from "../types";
import { VolunteerForm } from "../components";
// import { AllVolunteers } from "../components/AllVolunteers";
// import { UpdateVolunteer } from "../components/UpdateVolunteer";
// import { DeleteDocuments } from "../components/DeleteDocuments";

export const AddVolunteer = () => {
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
  // const [updateVolunteer, setUpdateVolunteer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [id]: value,
    }));
  };

  const addVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument("volunteers", volunteer.volunteerId, volunteer);
  };

  return (
    <div className="h-full w-full rounded-3xl bg-purple-900 p-4">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100">
        <VolunteerForm
          legend="Add Volunteer"
          formSubmit={addVolunteer}
          formChange={handleChange}
          volunteer={volunteer}
          submit="Add!"
        />
        {/* <AllVolunteers setUpdateVolunteer={setUpdateVolunteer} />
        <UpdateVolunteer updateVolunteer={updateVolunteer} /> */}
        {/* <DeleteDocuments /> */}
      </div>
    </div>
  );
};
