import { useState } from "react";
import { addDocument, getDocument, updateDocument } from "../firebase";
import { TPunch, TVolunteer } from "../types";

enum EMessageType {
  error = "error",
  message = "message",
}

export const Home = () => {
  const [punch, setPunch] = useState<TPunch>({
    volunteerId: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const volunteerData = await getDocument("volunteers", punch.volunteerId);
      const punchId = new Date().toISOString();
      if (volunteerData) {
        if (volunteerData.clockedIn === false) {
          addDocument("punches", punchId, {
            ...punch,
            clockIn: new Date(),
          });
          updateDocument<TVolunteer>(
            "volunteers",
            punch.volunteerId,
            "clockedIn",
            true,
            punchId,
          );
          setMessage(`Welcome ${volunteerData.volunteerFirstName}!`);
          submitCleanup(EMessageType.message);
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
            "clockedIn",
            false,
          );
          setMessage(
            `Thanks for volunteering with us today, ${volunteerData.volunteerFirstName}!`,
          );
          submitCleanup(EMessageType.message);
        }
      } else {
        setError("Please enter a valid ID");
        submitCleanup(EMessageType.error);
      }
    } catch (error: unknown) {
      console.error("Unknown submit error", error);
    }
  };

  // Clear input after form submit
  // Clear Welcome, Goodbye, or Error message after 15 seconds
  const submitCleanup = (messageType: EMessageType) => {
    setPunch((prevPunch) => ({
      ...prevPunch,
      volunteerId: "",
    }));
    setTimeout(() => {
      if (messageType === "message") {
        setMessage("");
      } else {
        setError("");
      }
    }, 5000);
  };

  return (
    <div className="h-full rounded-3xl bg-green-600 p-4">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gray-100 p-8">
        <form onSubmit={formSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              id="volunteerId"
              placeholder="Volunteer ID"
              onChange={(e) =>
                setPunch((prevPunch) => ({
                  ...prevPunch,
                  volunteerId: e.target.value,
                }))
              }
              value={punch.volunteerId}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 text-center shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <input
              type="submit"
              value="Clock In"
              className="w-full rounded-md bg-indigo-500 p-2 font-semibold text-white hover:cursor-pointer hover:bg-indigo-600"
            />
          </div>
        </form>
        <p
          className={`h-8 text-xl ${error ? "text-red-500" : "text-green-600"}`}
        >
          {error ? error : message}
        </p>
      </div>
    </div>
  );
};
