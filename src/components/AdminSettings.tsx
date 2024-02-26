import { useState } from "react";
import { UpdateVolunteer } from "./UpdateVolunteer";
import { AllVolunteers } from "./AllVolunteers";

export const AdminSettings = () => {
  const [updateVolunteerId, setUpdateVolunteerId] = useState("");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-4xl">Volunteers Settings</h1>
      <AllVolunteers setUpdateVolunteerId={setUpdateVolunteerId} />
      <UpdateVolunteer updateVolunteerId={updateVolunteerId} />
    </div>
  );
};
