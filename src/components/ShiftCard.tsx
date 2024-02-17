import { useState } from "react";
import { TPunch } from "../types";
import { Timestamp } from "firebase/firestore";

interface IShiftCardProps {
  shift: TPunch;
}

export const ShiftCard = ({ shift }: IShiftCardProps) => {
  const [hours, setHours] = useState(false);

  const getShiftDate = (shift: Date | Timestamp | undefined) => {
    if (shift instanceof Date) {
      return shift.toDateString();
    } else if (shift instanceof Timestamp) {
      return shift.toDate().toDateString();
    } else {
      return "No Date Provided";
    }
  };

  const getShiftTime = (shift: Date | Timestamp | undefined) => {
    if (shift instanceof Date) {
      return shift.toLocaleTimeString();
    } else if (shift instanceof Timestamp) {
      return shift.toDate().toLocaleTimeString();
    } else {
      return "No Date Provided";
    }
  };

  const calculateHours = (shiftIn: any, shiftOut: any) => {
    const timeDifference =
      shiftOut.toDate().getTime() - shiftIn.toDate().getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    return `${hours} hours and ${minutes} minutes`;
  };

  return (
    <div>
      <p
        onClick={() => setHours(!hours)}
        className={shift.clockOut ? "bg-green-200" : "bg-red-200"}
      >
        Data: {getShiftDate(shift.clockIn)}
      </p>
      {hours && (
        <>
          <p>Clock In: {getShiftTime(shift.clockIn)}</p>
          {shift.clockOut ? (
            <p>Clock Out: {getShiftTime(shift.clockOut)}</p>
          ) : (
            <p>On Shift</p>
          )}
          <p>Total: {calculateHours(shift.clockIn, shift.clockOut)}</p>
        </>
      )}
    </div>
  );
};
