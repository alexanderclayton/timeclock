import { useState } from "react";
import { TVolunteer } from "../types";
import { getDocument } from "../firebase";
import { DocumentData } from "firebase/firestore";
import { VolunteerTimesheet } from "../components/VolunteerTimesheet";
import { VolunteerIDForm } from "../components/VolunteerIDForm";
import { AdminTimesheet } from "../components/AdminTimesheet";

export const Timesheets = () => {
  const [volunteerId, setVolunteerId] = useState("");
  const [error, setError] = useState("");
  const [volunteer, setVolunteer] = useState<TVolunteer | undefined>(undefined);

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
      const volunteerData = await getDocument<TVolunteer>(
        "volunteers",
        volunteerId,
      );
      if (volunteerData) {
        mapVolunteer(volunteerData);
      } else {
        setError("Please enter a valid ID");
      }
    } catch (error: unknown) {
      console.error("Unknown submit error", error);
    }
  };

  return (
    <div className="flex h-full w-full rounded-3xl bg-amber-400 p-4">
      <div className="flex h-full w-full flex-col items-center justify-around rounded-2xl bg-gray-100 p-8">
        {!volunteer && (
          <div className="flex h-full w-full flex-col items-center justify-center">
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
        {volunteer && volunteer.admin && <AdminTimesheet />}
      </div>
    </div>
  );
};
