import { useEffect, useState } from "react";
import { TPunch, TVolunteer } from "../types";
import { Shifts } from "../components/Shifts";
import { TimesheetCard } from "../components/TimesheetCard";
import { getDocument, getDocuments } from "../firebase";
import { DocumentData } from "firebase/firestore";
import { VolunteerPunches } from "../components/VolunteerPunches";

export const Timesheets = () => {
  const [volunteerId, setVolunteerId] = useState("");
  const [error, setError] = useState("");
  const [volunteer, setVolunteer] = useState<TVolunteer | undefined>(undefined);
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );
  const [allPunches, setAllPunches] = useState<TPunch[] | undefined>(undefined);
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

  useEffect(() => {
    if (volunteer) {
      getDocuments("punches", setAllPunches);
    }
  }, [volunteer]);

  return (
    <div className="h-full w-full rounded-3xl bg-amber-400 p-4">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100">
        {!volunteer && (
          <div>
            <form onSubmit={formSubmit} className="w-full max-w-sm">
              <div className="mb-4">
                <input
                  type="text"
                  id="volunteerId"
                  placeholder="Volunteer ID"
                  onChange={(e) => setVolunteerId(e.target.value)}
                  value={volunteerId}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 text-center shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-6">
                <input
                  type="submit"
                  value="View Timesheet"
                  className="w-full rounded-md bg-indigo-500 p-2 font-semibold text-white hover:cursor-pointer hover:bg-indigo-600"
                />
              </div>
            </form>
            <p className={`h-8 text-xl ${error && "text-red-500"}`}>{error}</p>
          </div>
        )}
        {volunteer && !volunteer.admin && (
          <div className="flex flex-col">
            <h2 className="text-3xl">
              {volunteer.volunteerFirstName} {volunteer.volunteerLastName} -{" "}
              {volunteer.volunteerId}
            </h2>
            {allPunches && <VolunteerPunches allPunches={allPunches} />}
          </div>
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
