import { useEffect, useState } from "react";
import { AllVolunteers } from "./AllVolunteers";
import { AdminVolunteer } from "./AdminVolunteer";
import { AddVolunteer } from "./AddVolunteer";
import { EEdits, TVolunteer } from "../types";
import { UpdateVolunteer } from "./UpdateVolunteer";
import { getDocument } from "../firebase";
export const AdminSettings = () => {
  const [adminVolunteerId, setAdminVolunteerId] = useState("");
  const [adminVolunteer, setAdminVolunteer] = useState<TVolunteer | undefined>(
    undefined,
  );
  const [editVolunteer, setEditVolunteer] = useState<EEdits>(EEdits.None);

  const fetchVolunteer = async () => {
    const fetchedVolunteer = await getDocument<TVolunteer>(
      "volunteers",
      adminVolunteerId,
    );
    if (fetchedVolunteer) {
      setAdminVolunteer({
        volunteerId: fetchedVolunteer.volunteerId,
        volunteerFirstName: fetchedVolunteer.volunteerFirstName,
        volunteerLastName: fetchedVolunteer.volunteerLastName,
        volunteerEmail: fetchedVolunteer.volunteerEmail,
        volunteerPhone: fetchedVolunteer.volunteerPhone,
        admin: fetchedVolunteer.admin,
        clockedIn: fetchedVolunteer.clockedIn,
        punchId: fetchedVolunteer.punchId,
      });
    } else {
      console.log("failed to fetch volunteer");
    }
  };

  useEffect(() => {
    if (adminVolunteerId !== "") {
      fetchVolunteer();
    } else {
      console.log("no volunteer to fetch");
    }
  }, [editVolunteer, adminVolunteerId]);

  return (
    <div className="flex h-full w-full flex-col p-8">
      <h1 className="h-[20%] text-4xl">Volunteers Settings</h1>
      <div className="flex flex-1">
        <div className="w-1/2">
          <AllVolunteers
            setAdminVolunteer={setAdminVolunteerId}
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
            <AddVolunteer
              setEditVolunteer={setEditVolunteer}
              setAdminVolunteer={setAdminVolunteer}
            />
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
