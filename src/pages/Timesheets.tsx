import { useEffect, useState } from "react";
import { TVolunteer } from "../types";
import { getDocuments } from "../firebase";
import { Shifts } from "../components/Shifts";
import { TimesheetCard } from "../components/TimesheetCard";

export const Timesheets = () => {
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );
  const [shiftId, setShiftId] = useState("");

  useEffect(() => {
    getDocuments("volunteers", setAllVolunteers);
  }, []);

  return (
    <div>
      {allVolunteers?.map((volunteer, idx) => (
        <TimesheetCard
          key={idx}
          volunteer={volunteer}
          setShiftId={setShiftId}
        />
      ))}
      {shiftId !== "" && <Shifts volunteerId={shiftId} />}
    </div>
  );
};
