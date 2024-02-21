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
    <div className="h-full w-full rounded-3xl bg-amber-400 p-4">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100">
        {allVolunteers?.map((volunteer, idx) => (
          <TimesheetCard
            key={idx}
            volunteer={volunteer}
            setShiftId={setShiftId}
          />
        ))}
        {shiftId !== "" && <Shifts volunteerId={shiftId} />}
      </div>
    </div>
  );
};
