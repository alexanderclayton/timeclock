import { useEffect, useState } from "react";
import { TVolunteer } from "../types";
import { getDocument } from "../firebase";
import { VolunteerForm } from ".";

interface IUpdateVolunteerProps {
  updateVolunteerId: string;
}

export const UpdateVolunteer = ({
  updateVolunteerId,
}: IUpdateVolunteerProps) => {
  const [volunteer, setVolunteer] = useState<TVolunteer | undefined>(undefined);

  const fetchVolunteer = async () => {
    const fetchedVolunteer = await getDocument<TVolunteer>(
      "volunteers",
      updateVolunteerId,
    );
    if (fetchedVolunteer) {
      setVolunteer({
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
    if (updateVolunteerId !== undefined) {
      fetchVolunteer();
    }
  }, [updateVolunteerId]);
  return (
    <>
      {volunteer && (
        <div className="bg-green-100">
          {volunteer.punchId} {volunteer.clockedIn} {volunteer.volunteerEmail}{" "}
          {volunteer.volunteerFirstName} {volunteer.volunteerId}{" "}
          {volunteer.volunteerLastName} {volunteer.volunteerPhone}
        </div>
      )}
    </>
  );
};
