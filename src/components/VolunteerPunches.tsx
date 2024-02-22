import { Timestamp } from "firebase/firestore";
import { TPunch } from "../types";
import { useEffect } from "react";

interface IVolunteerPunchesProps {
  allPunches: TPunch[];
  setTotalHours: React.Dispatch<React.SetStateAction<string>>;
}

export const VolunteerPunches = ({
  allPunches,
  setTotalHours,
}: IVolunteerPunchesProps) => {
  const punchTime = (time: Timestamp | Date | undefined) => {
    const punchTime = handleTimestamp(time).toLocaleTimeString();
    return punchTime;
  };

  const handleTimestamp = (time: Timestamp | Date | undefined): Date => {
    if (time instanceof Timestamp) {
      const timestamp = time.toDate();
      return timestamp;
    } else {
      console.error("Punch isn't a timestamp");
      return time as Date;
    }
  };

  const shiftHours = (
    timeIn: Timestamp | Date | undefined,
    timeOut: Timestamp | Date | undefined,
  ) => {
    if (timeOut) {
      const totalMilliseconds =
        handleTimestamp(timeOut).getTime() - handleTimestamp(timeIn).getTime();
      const totalHours = Math.floor(
        (totalMilliseconds / (1000 * 60 * 60)) % 24,
      );
      const totalMinutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
      const totalSeconds = Math.floor((totalMilliseconds / 1000) % 60);
      const totalTime = `${totalHours.toString().padStart(2, "0")}:${totalMinutes.toString().padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
      return { string: totalTime, number: totalMilliseconds };
    } else {
      console.log("On shift");
      return { string: "On Shift", number: 0 };
    }
  };

  const totalHours = () => {
    let totalMilliseconds = 0;
    allPunches.forEach((punch) => {
      const { number } = shiftHours(punch.clockIn, punch.clockOut);
      totalMilliseconds += number;
    });
    const totalHours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);
    const totalMinutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    const totalSeconds = Math.floor((totalMilliseconds / 1000) % 60);
    const totalTime = `${totalHours.toString().padStart(2, "0")}:${totalMinutes.toString().padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
    setTotalHours(totalTime);
  };

  useEffect(() => {
    if (allPunches !== undefined) {
      totalHours();
    } else {
      ("no punches yet");
    }
  }, [allPunches]);

  return (
    <>
      {allPunches.map((punch, idx) => (
        <tr key={idx} className="border-b border-gray-200 hover:bg-blue-100">
          <th className="px-6 py-3 text-center">
            {handleTimestamp(punch.clockIn).toDateString()}
          </th>
          <td className="px-6 py-3 text-center">{punchTime(punch.clockIn)}</td>
          {punch.clockOut ? (
            <td className="px-6 py-3 text-center">
              {punchTime(punch.clockOut)}
            </td>
          ) : (
            <td className="px-6 py-3 text-center">On Shift</td>
          )}
          {punch.clockOut ? (
            <td className="px-6 py-3 text-center">
              {shiftHours(punch.clockIn, punch.clockOut).string}
            </td>
          ) : (
            <td className="px-6 py-3 text-center">On Shift</td>
          )}
        </tr>
      ))}
    </>
  );
};
