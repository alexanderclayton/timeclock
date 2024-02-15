import { useState } from "react";
import { randomSix } from "../helpers";
import { addDocument } from "../firebase";
import { TVolunteer } from "../types";

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
    <form onSubmit={addVolunteer} className="flex flex-col">
      <legend>Add Volunteer</legend>
      <label htmlFor="volunteerFirstName">First Name</label>
      <input
        type="text"
        id="volunteerFirstName"
        onChange={handleChange}
        value={volunteer.volunteerFirstName}
      />
      <label htmlFor="volunteerLastName">Last Name</label>
      <input
        type="text"
        id="volunteerLastName"
        onChange={handleChange}
        value={volunteer.volunteerLastName}
      />
      <label htmlFor="volunteerEmail">Email</label>
      <input
        type="text"
        id="volunteerEmail"
        onChange={handleChange}
        value={volunteer.volunteerEmail}
      />
      <label htmlFor="volunteerPhone">Phone</label>
      <input
        type="text"
        id="volunteerPhone"
        onChange={handleChange}
        value={volunteer.volunteerPhone}
      />
      <input type="submit" value="test" />
    </form>
  );
};
