import { useEffect, useState } from "react";
import { deleteDocument, getDocuments } from "../firebase";
import { TPunch, TVolunteer } from "../types";
import { FieldValue, Timestamp } from "firebase/firestore";

export const DeleteDocuments = () => {
  const [allPunches, setAllPunches] = useState<TPunch[] | undefined>(undefined);
  const [allVolunteers, setAllVolunteers] = useState<TVolunteer[] | undefined>(
    undefined,
  );

  const deleteVolunteer = (deleteFields: FieldValue) => ({
    volunteerId: deleteFields,
    volunteerFirstName: deleteFields,
    volunteerLastName: deleteFields,
    volunteerEmail: deleteFields,
    volunteerPhone: deleteFields,
    admin: deleteFields,
    clockedIn: deleteFields,
    punchId: deleteFields,
  });

  const deletePunch = (deleteFields: FieldValue) => ({
    volunteerId: deleteFields,
    clockIn: deleteFields,
    clockOut: deleteFields,
  });

  useEffect(() => {
    getDocuments("punches", setAllPunches);
    getDocuments("volunteers", setAllVolunteers);
  }, []);

  return (
    <div>
      {allVolunteers && (
        <div className="flex flex-col">
          {allVolunteers.map((volunteer, idx) => (
            <div key={idx} className="flex">
              <p>{volunteer.volunteerFirstName} </p>
              <p>{volunteer.volunteerLastName}</p>
              <button
                onClick={() =>
                  deleteDocument(
                    "volunteers",
                    volunteer.volunteerId,
                    deleteVolunteer,
                  )
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {allPunches && (
        <div className="flex flex-col">
          {allPunches.map((punch, idx) => (
            <div key={idx} className="flex">
              <p>{punch.volunteerId}</p>
              {punch.clockIn instanceof Timestamp && (
                <p>{punch.clockIn.toDate().toISOString()}</p>
              )}
              {punch.clockOut instanceof Timestamp && (
                <p>{punch.clockOut.toDate().toISOString()}</p>
              )}
              {punch.clockIn && (
                <button
                  onClick={() => {
                    punch.clockIn instanceof Timestamp &&
                      deleteDocument(
                        "punches",
                        punch.clockIn.toDate().toISOString(),
                        deletePunch,
                      );
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
