import { useState, useEffect } from "react";
import { TPunch } from "../types";
import { getDocument, queryDocuments } from "../firebase";
import { Timestamp } from "firebase/firestore";

interface IShiftsProps {
  volunteerId: string;
}

export const Shifts = ({ volunteerId }: IShiftsProps) => {
  const [shifts, setShifts] = useState<TPunch[] | undefined>(undefined);

  const fetchData = async () => {
    try {
      const fetchedVolunteer = await getDocument("volunteers", volunteerId);
      if (fetchedVolunteer) {
        const fetchedShifts = await queryDocuments(
          "punches",
          "volunteerId",
          fetchedVolunteer.volunteerId,
        );
        setShifts(fetchedShifts);
      } else {
        console.log("no volunteer");
      }
    } catch (error: unknown) {
      console.error("Unknown submit error", error);
    }
  };

  const getShiftDate = (shift: Date | Timestamp | undefined) => {
    if (shift instanceof Date) {
      return shift.toDateString();
    } else if (shift instanceof Timestamp) {
      return shift.toDate().toDateString();
    } else {
      return "No Date Provided";
    }
  };

  const calculateHours = (a: any, b: any) => {
    return ((b - a) / 60).toString();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {shifts?.map((shift, idx) => (
        <div key={idx} className="flex flex-col">
          <p>Date: {getShiftDate(shift.clockIn)}</p>
          <p>Total: {calculateHours(shift.clockIn, shift.clockOut)}</p>
        </div>
      ))}
    </div>
  );
};
