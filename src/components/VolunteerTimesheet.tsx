import React, { useEffect, useState } from "react";
import { TPunch, TVolunteer } from "../types";
import { VolunteerPunches } from "./VolunteerPunches";
import { queryDocuments } from "../firebase";

interface IVolunteerTimesheetProps {
  volunteer: TVolunteer;
  toggleBack?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VolunteerTimesheet = ({
  volunteer,
  toggleBack,
}: IVolunteerTimesheetProps) => {
  const [allPunches, setAllPunches] = useState<TPunch[] | undefined>(undefined);
  const [totalHours, setTotalHours] = useState("");

  const fetchPunches = async () => {
    const volunteerPunches = await queryDocuments(
      "punches",
      "volunteerId",
      volunteer.volunteerId,
    );
    if (volunteerPunches) {
      setAllPunches(volunteerPunches);
    } else {
      console.log("cannot fetch punches");
    }
  };

  useEffect(() => {
    if (volunteer) {
      fetchPunches();
    }
  }, [volunteer]);

  return (
    <div className="flex w-4/5 flex-col">
      {toggleBack && <button onClick={() => toggleBack(false)}>Back</button>}
      <h2 className="text-3xl font-bold">
        {volunteer.volunteerFirstName} {volunteer.volunteerLastName} -{" "}
        {volunteer.volunteerId}
      </h2>
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="mb-2 table-fixed text-lg font-bold">Volunteer Shifts</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="w-1/4 border-b border-gray-200 bg-gray-100 px-4 py-2">
                Date
              </th>
              <th className="w-1/4 border-b border-gray-200 bg-gray-100 px-4 py-2">
                Clock In
              </th>
              <th className="w-1/4 border-b border-gray-200 bg-gray-100 px-4 py-2">
                Clock Out
              </th>
              <th className="px- w-1/4 border-b border-gray-200 bg-gray-100 py-2">
                Total Hours
              </th>
            </tr>
          </thead>
          <td colSpan={5} className="mt-4 h-64 w-full overflow-y-auto">
            {allPunches && (
              <VolunteerPunches
                allPunches={allPunches}
                setTotalHours={setTotalHours}
              />
            )}
          </td>
          <tfoot>
            <tr>
              <th
                className="border-t border-gray-200 bg-gray-100 px-4 py-2 text-right"
                colSpan={3}
              >
                Total Hours
              </th>
              <td className="border-t border-gray-200 bg-gray-100 px-4 py-2 text-center">
                {totalHours}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
