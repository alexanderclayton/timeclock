import { useState } from "react";
import { VolunteerIDForm } from "../components/VolunteerIDForm";
import { getDocument } from "../firebase";
import { TVolunteer } from "../types";
import { EMessageType } from ".";
import { AdminSettings } from "../components/AdminSettings";

export const Settings = () => {
  const [formId, setFormId] = useState("");
  const [volunteer, setVolunteer] = useState<TVolunteer | undefined>(undefined);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminVolunteer = await getDocument<TVolunteer>("volunteers", formId);
    if (adminVolunteer) {
      if (adminVolunteer.admin) {
        setVolunteer({
          volunteerId: adminVolunteer.volunteerId,
          volunteerFirstName: adminVolunteer.volunteerFirstName,
          volunteerLastName: adminVolunteer.volunteerLastName,
          volunteerEmail: adminVolunteer.volunteerEmail,
          volunteerPhone: adminVolunteer.volunteerPhone,
          admin: adminVolunteer.admin,
          clockedIn: adminVolunteer.clockedIn,
          punchId: adminVolunteer.punchId,
        });
      } else {
        setMessage("Must be an authorized user to access app settings");
        submitCleanup(EMessageType.message);
      }
    } else {
      console.log("couldn't fetch volunteer");
      setError("Please enter a valid ID");
      submitCleanup(EMessageType.error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormId(e.target.value);
  };

  const submitCleanup = (messageType: EMessageType) => {
    setFormId("");
    setTimeout(() => {
      if (messageType === "message") {
        setMessage("");
      } else {
        setError("");
      }
    }, 5000);
  };

  return (
    <div className="h-full w-full rounded-3xl bg-purple-900 p-4">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100">
        {!volunteer && (
          <div className="flex flex-col">
            <VolunteerIDForm
              formSubmit={formSubmit}
              id={formId}
              formChange={handleChange}
              submit="Login"
            />
            <p
              className={`h-8 text-xl ${error ? "text-red-500" : "text-green-600"}`}
            >
              {error ? error : message}
            </p>
          </div>
        )}
        {volunteer?.admin && <AdminSettings />}
      </div>
    </div>
  );
};
