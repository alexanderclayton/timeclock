import { useState } from "react";
import { addDocument, getDocument, updateDocument } from "../firebase";

export const Home = () => {
  const [punch, setPunch] = useState<TPunch>({
    volunteerId: "",
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const volunteerData = await getDocument("volunteers", punch.volunteerId);
      const punchId = new Date().toISOString();
      if (volunteerData) {
        if (volunteerData.volunteerClockedIn === false) {
          addDocument("punches", punchId, {
            ...punch,
            clockIn: new Date(),
          });
          updateDocument<TVolunteer>(
            "volunteers",
            punch.volunteerId,
            "volunteerClockedIn",
            true,
            punchId,
          );
        } else {
          updateDocument<TPunch>(
            "punches",
            volunteerData.punchId,
            "clockOut",
            new Date(),
          );
          updateDocument<TVolunteer>(
            "volunteers",
            punch.volunteerId,
            "volunteerClockedIn",
            false,
          );
        }
      }
    } catch (error: unknown) {
      console.error("Unknown submit error", error);
    }
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor="volunteerId">ID:</label>
        <input
          type="text"
          id="volunteerId"
          onChange={(e) =>
            setPunch((prevPunch) => ({
              ...prevPunch,
              volunteerId: e.target.value,
            }))
          }
          value={punch.volunteerId}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
