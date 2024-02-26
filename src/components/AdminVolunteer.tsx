import { useEffect, useState } from "react";
import { TVolunteer } from "../types";
import { getDocument } from "../firebase";

interface IAdminVolunteerProps {
  volunteerId: string;
}

export const AdminVolunteer = ({ volunteerId }: IAdminVolunteerProps) => {
  const [adminVolunteer, setAdminVolunteer] = useState<TVolunteer | undefined>(
    undefined,
  );
  const fetchVolunteer = async () => {
    const fetchedVolunteer = await getDocument<TVolunteer>(
      "volunteers",
      volunteerId,
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
      console.log("unable to fetch volunteer");
    }
  };

  useEffect(() => {
    if (volunteerId !== "") {
      fetchVolunteer();
    }
  }, [volunteerId]);

  return (
    <div className="flex h-[80%] w-full items-center justify-center">
      {adminVolunteer && (
        <div className="h-[70%] w-[90%] rounded bg-gray-100 p-4 shadow">
          <h2 className="mb-2 text-2xl font-bold">
            {adminVolunteer?.volunteerFirstName}{" "}
            {adminVolunteer?.volunteerLastName} - {adminVolunteer?.volunteerId}
          </h2>
          <p className="mb-2">
            <strong>Email:</strong> {adminVolunteer?.volunteerEmail}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {adminVolunteer?.volunteerPhone}
          </p>
          <p className="mb-2">
            <strong>Admin:</strong> {adminVolunteer?.admin ? "Yes" : "No"}
          </p>
          <button className="text-green-500">Edit</button>
        </div>
      )}
    </div>
  );
};
