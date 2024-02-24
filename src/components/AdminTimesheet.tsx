import { useEffect, useState } from "react";
import { TVolunteer } from "../types";
import { getDocument, getDocuments } from "../firebase";
import { DocumentData } from "firebase/firestore";
import { VolunteerTimesheet } from "./VolunteerTimesheet";

export const AdminTimesheet = () => {
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );
  const [filteredVolunteers, setFilteredVolunteers] = useState<
    TVolunteer[] | undefined
  >(undefined);
  const [adminVolunteer, setAdminVolunteer] = useState<TVolunteer | undefined>(
    undefined,
  );
  const [viewTimesheet, setViewTimesheet] = useState(false);

  useEffect(() => {
    getDocuments("volunteers", setAllVolunteers);
  }, []);

  const mapVolunteer = (
    data: DocumentData,
    setVolunteer: React.Dispatch<React.SetStateAction<TVolunteer | undefined>>,
  ) => {
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

  const fetchVolunteer = async (volunteerId: string) => {
    const fetchedVolunteer = await getDocument<TVolunteer>("volunteers", volunteerId);
    if (fetchedVolunteer) {
      mapVolunteer(fetchedVolunteer, setAdminVolunteer);
      setViewTimesheet(true);
    } else {
      console.log("couldn't fetch volunteer");
    }
  };

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (allVolunteers) {
      const filtered = allVolunteers.filter((volunteers) => {
        const firstFilter = volunteers.volunteerLastName.toLowerCase();
        const secondFilter = volunteers.volunteerFirstName.toLowerCase();
        return firstFilter.includes(value) || secondFilter.includes(value);
      });
      setFilteredVolunteers(filtered);
    } else {
      console.log("nothing to filter :(");
    }
  };

  useEffect(() => {
    if (allVolunteers) {
      setFilteredVolunteers(allVolunteers);
    }
  }, [allVolunteers]);

  return (
    <>
      {allVolunteers && !viewTimesheet && (
        <div className="flex w-4/5 flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Search Volunteer"
            onChange={handleSearchFilter}
            className="w-2/5 rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-blue-500 focus:outline-none"
          />
          <div className="mt-4 h-64 w-full border-collapse overflow-y-auto border border-gray-200">
            <table className="w-full">
              <caption className="mb-2 text-lg font-bold">Volunteers</caption>
              <thead>
                <tr>
                  <th className="border-b border-gray-200 bg-gray-100 px-4 py-2">
                    Last Name
                  </th>
                  <th className="border-b border-gray-200 bg-gray-100 px-4 py-2">
                    First Name
                  </th>
                  <th className="border-b border-gray-200 bg-gray-100 px-4 py-2">
                    Shift
                  </th>
                </tr>
              </thead>
              {filteredVolunteers && (
                <tbody>
                  {filteredVolunteers.map((volunteer, idx) => (
                    <tr
                      key={idx}
                      onClick={() => fetchVolunteer(volunteer.volunteerId)}
                      className="cursor-pointer border-b border-gray-200 transition-colors hover:bg-blue-100"
                    >
                      <td className="px-6 py-3 text-center">
                        {volunteer.volunteerLastName}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {volunteer.volunteerFirstName}
                      </td>
                      <td
                        className={`px-6 py-3 text-center ${volunteer.clockedIn ? "text-green-500" : "text-red-500"}`}
                      >
                        {volunteer.clockedIn ? "On shift" : "Off Shift"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
      {allVolunteers && adminVolunteer && viewTimesheet && (
        <VolunteerTimesheet
          volunteer={adminVolunteer}
          toggleBack={setViewTimesheet}
        />
      )}
    </>
  );
};
