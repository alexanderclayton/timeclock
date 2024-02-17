import { useState, useEffect } from "react";
import { TPunch } from "../types";
import { getDocument, queryDocuments } from "../firebase";
import { ShiftCard } from "./ShiftCard";

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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {shifts?.map((shift, idx) => <ShiftCard key={idx} shift={shift} />)}
    </div>
  );
};
