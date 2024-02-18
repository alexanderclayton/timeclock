import { useEffect, useState } from "react";
import { TVolunteer } from "../types";
import { getDocument } from "../firebase";

interface IUpdateVolunteerProps {
  updateVolunteer: string;
}

export const UpdateVolunteer = ({ updateVolunteer }: IUpdateVolunteerProps) => {
  const [volunteer, setVolunteer] = useState<TVolunteer | undefined>(undefined);

  const fetchVolunteer = async () => {
    const fetchedVolunteer = await getDocument("volunteers", updateVolunteer);
    if (fetchedVolunteer) {
      setVolunteer({
        volunteerId: fetchedVolunteer.volunteerId,
        volunteerFirstName: fetchedVolunteer.volunteerFirstName,
        volunteerLastName: fetchedVolunteer.volunteerLastName,
        volunteerEmail: fetchedVolunteer.volunteerEmail,
        volunteerPhone: fetchedVolunteer.volunteerPhone,
        volunteerClockedIn: fetchedVolunteer.volunteerClockedIn,
        punchId: fetchedVolunteer.punchId,
      });
    } else {
      console.log("unable to fetch volunteer");
    }
  };

  useEffect(() => {
    if (updateVolunteer !== undefined) {
      fetchVolunteer();
    }
  }, [updateVolunteer]);
  return (
    <>
      {volunteer && (
        <div className="bg-green-100">
          {volunteer.punchId} {volunteer.volunteerClockedIn}{" "}
          {volunteer.volunteerEmail} {volunteer.volunteerFirstName}{" "}
          {volunteer.volunteerId} {volunteer.volunteerLastName}{" "}
          {volunteer.volunteerPhone}
        </div>
      )}
    </>
  );
};
