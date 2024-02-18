import { useState } from "react";
import { randomSix } from "../helpers";
import { addDocument } from "../firebase";
import { TVolunteer } from "../types";
import { VolunteerForm } from "../components";
import { AllVolunteers } from "../components/AllVolunteers";
import { UpdateVolunteer } from "../components/UpdateVolunteer";

export const AddVolunteer = () => {
  const [volunteer, setVolunteer] = useState<TVolunteer>({
    volunteerId: randomSix(),
    volunteerFirstName: "",
    volunteerLastName: "",
    volunteerEmail: "",
    volunteerPhone: "",
    volunteerClockedIn: false,
    punchId: "",
  });
  const [updateVolunteer, setUpdateVolunteer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
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
    <div>
      <VolunteerForm
        legend="Add Volunteer"
        formSubmit={addVolunteer}
        formChange={handleChange}
        volunteer={volunteer}
        submit="Add!"
      />
      <AllVolunteers setUpdateVolunteer={setUpdateVolunteer} />
      <UpdateVolunteer updateVolunteer={updateVolunteer} />
    </div>
  );
};
