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
    const fetchedVolunteer = await getDocument("volunteers", volunteerId);
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
        <div>
          <input
            type="text"
            placeholder="Search Volunteer"
            onChange={handleSearchFilter}
          />
          <table className="mt-4 w-full border-collapse border border-gray-200">
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
                    className="border-b border-gray-200 hover:bg-blue-100"
                  >
                    <td className="px-6 py-3 text-center">
                      {volunteer.volunteerLastName}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {volunteer.volunteerFirstName}
                    </td>
                    {volunteer.clockedIn ? (
                      <td className="px-6 py-3 text-center">On shift</td>
                    ) : (
                      <td className="px-6 py-3 text-center">Off Shift</td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
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
