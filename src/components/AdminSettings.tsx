import { useState } from "react";
import { AllVolunteers } from "./AllVolunteers";
import { AdminVolunteer } from "./AdminVolunteer";
import { AddVolunteer } from "./AddVolunteer";
import { EEdits, TVolunteer } from "../types";
import { UpdateVolunteer } from "./UpdateVolunteer";
export const AdminSettings = () => {
  const [adminVolunteer, setAdminVolunteer] = useState<TVolunteer | undefined>(
    undefined,
  );
  const [editVolunteer, setEditVolunteer] = useState<EEdits>(EEdits.None);
  return (
    <div className="flex h-full w-full flex-col p-8">
      <h1 className="h-[20%] text-4xl">Volunteers Settings</h1>
      <div className="flex flex-1">
        <div className="w-1/2">
          <AllVolunteers
            setAdminVolunteer={setAdminVolunteer}
            editVolunteer={editVolunteer}
            setEditVolunteer={setEditVolunteer}
          />
        </div>
        <div className="w-1/2">
          {editVolunteer === EEdits.None && (
            <AdminVolunteer
              volunteer={adminVolunteer}
              setEditVolunteer={setEditVolunteer}
            />
          )}
          {editVolunteer === EEdits.Add && (
            <AddVolunteer setEditVolunteer={setEditVolunteer} setAdminVolunteer={setAdminVolunteer} />
          )}
          {adminVolunteer && editVolunteer === EEdits.Update && (
            <UpdateVolunteer
              updateVolunteer={adminVolunteer}
              setEditVolunteer={setEditVolunteer}
            />
          )}
        </div>
      </div>
    </div>
  );
};
