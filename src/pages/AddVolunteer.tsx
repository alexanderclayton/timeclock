import { useState } from "react";
import { randomSix } from "../helpers";
import { addDocument } from "../firebase";
import { TVolunteer } from "../types";
import { VolunteerForm } from "../components";

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
    <VolunteerForm
      legend="Add Volunteer"
      formSubmit={addVolunteer}
      formChange={handleChange}
      volunteer={volunteer}
      submit="Add!"
    />
  );
};
