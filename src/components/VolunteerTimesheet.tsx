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
      <table className="mt-4 w-full border-collapse border border-gray-200">
        <caption className="mb-2 text-lg font-bold">Volunteer Shifts</caption>
        <thead>
          <tr>
            <th className="border-b border-gray-200 bg-gray-100 px-4 py-2">
              Date
            </th>
            <th className="border-b border-gray-200 bg-gray-100 px-4 py-2">
              Clock In
            </th>
            <th className="border-b border-gray-200 bg-gray-100 px-4 py-2">
              Clock Out
            </th>
            <th className="border-b border-gray-200 bg-gray-100 px-4 py-2">
              Total Hours
            </th>
          </tr>
        </thead>
        <tbody>
          {allPunches && (
            <VolunteerPunches
              allPunches={allPunches}
              setTotalHours={setTotalHours}
            />
          )}
        </tbody>
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
  );
};
