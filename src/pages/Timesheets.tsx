import { useEffect, useState } from "react";
import { TVolunteer } from "../types";
import { Shifts } from "../components/Shifts";
import { TimesheetCard } from "../components/TimesheetCard";
import { getDocument, getDocuments } from "../firebase";
import { DocumentData } from "firebase/firestore";
import { VolunteerTimesheet } from "../components/VolunteerTimesheet";
import { VolunteerIDForm } from "../components/VolunteerIDForm";

export const Timesheets = () => {
  const [volunteerId, setVolunteerId] = useState("");
  const [error, setError] = useState("");
  const [volunteer, setVolunteer] = useState<TVolunteer | undefined>(undefined);
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );
  const [shiftId, setShiftId] = useState("");

  const mapVolunteer = (data: DocumentData) => {
    setVolunteer({
      volunteerId: data.volunteerId,
      volunteerFirstName: data.volunteerFirstName,
      volunteerLastName: data.volunteerLastName,
      volunteerEmail: data.volunteerEmail,
      volunteerPhone: data.volunteerPhone,
      admin: data.admin,
      clockedIn: data.clockedIn,
      punchId: data.punchId,
    });
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const volunteerData = await getDocument("volunteers", volunteerId);
      if (volunteerData) {
        mapVolunteer(volunteerData);
      } else {
        setError("Please enter a valid ID");
      }
    } catch (error: unknown) {
      console.error("Unknown submit error", error);
    }
  };

  useEffect(() => {
    if (volunteer && volunteer.admin) {
      getDocuments("volunteers", setAllVolunteers);
    }
  }, [volunteer]);

  return (
    <div className="h-full w-full rounded-3xl bg-amber-400 p-4">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100">
        {!volunteer && (
          <div>
            <VolunteerIDForm
              formSubmit={formSubmit}
              id={volunteerId}
              formChange={(e) => setVolunteerId(e.target.value)}
              submit="View Timesheet"
            />
            <p className={`h-8 text-xl ${error && "text-red-500"}`}>{error}</p>
          </div>
        )}
        {volunteer && !volunteer.admin && (
          <VolunteerTimesheet volunteer={volunteer} />
        )}
        {volunteer && volunteer.admin && allVolunteers && (
          <div>
            {allVolunteers.map((volunteer, idx) => (
              <TimesheetCard
                key={idx}
                volunteer={volunteer}
                setShiftId={setShiftId}
              />
            ))}
            {shiftId !== "" && <Shifts volunteerId={shiftId} />}
          </div>
        )}
      </div>
    </div>
  );
};
