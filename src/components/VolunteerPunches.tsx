import { Timestamp } from "firebase/firestore";
import { TPunch } from "../types";

interface IVolunteerPunchesProps {
  allPunches: TPunch[];
}

export const VolunteerPunches = ({ allPunches }: IVolunteerPunchesProps) => {
  return (
    <>
      {allPunches.map((punch, idx) => (
        <div key={idx} className="flex">
          {punch.clockIn && (
            <p>{(punch.clockIn as Timestamp).toDate().toISOString()}</p>
          )}
        </div>
      ))}
    </>
  );
};
