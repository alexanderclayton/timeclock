import { useState } from "react";
import { AllVolunteers } from "./AllVolunteers";
import { AdminVolunteer } from "./AdminVolunteer";

export const AdminSettings = () => {
  const [adminVolunteerId, setAdminVolunteerId] = useState("");
  return (
    <div className="flex h-full w-full flex-col p-8">
      <h1 className="h-[20%] text-4xl">Volunteers Settings</h1>
      <div className="flex flex-1">
        <div className="w-1/2">
          <AllVolunteers setAdminVolunteerId={setAdminVolunteerId} />
        </div>
        <div className="w-1/2">
          <AdminVolunteer volunteerId={adminVolunteerId} />
        </div>
      </div>
    </div>
  );
};
