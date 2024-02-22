import { useEffect, useState } from "react";
import { TPunch, TVolunteer } from "../types";
import { VolunteerPunches } from "./VolunteerPunches";
import { getDocuments } from "../firebase";

interface IVolunteerTimesheetProps {
  volunteer: TVolunteer;
}

export const VolunteerTimesheet = ({ volunteer }: IVolunteerTimesheetProps) => {
  const [allPunches, setAllPunches] = useState<TPunch[] | undefined>(undefined);
  const [totalHours, setTotalHours] = useState("");

  useEffect(() => {
    if (volunteer) {
      getDocuments("punches", setAllPunches);
    }
  }, [volunteer]);

  return (
    <div className="flex w-4/5 flex-col">
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
