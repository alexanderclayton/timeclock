import { useState } from "react";
import { addDocument, getDocument, updateDocument } from "../firebase";
import { TPunch, TVolunteer } from "../types";
import { VolunteerIDForm } from "../components/VolunteerIDForm";

export enum EMessageType {
  error = "error",
  message = "message",
}

export const Home = () => {
  const [punch, setPunch] = useState<TPunch>({
    volunteerId: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const volunteerData = await getDocument<TVolunteer>(
        "volunteers",
        punch.volunteerId,
      );
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

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPunch((prevPunch) => ({
      ...prevPunch,
      volunteerId: e.target.value,
    }));
  };

  const updateTime = () => {
    const currentTime = new Date();
    let aM;
    let hours = currentTime.getHours();
    if (hours > 12) {
      hours = hours - 12;
      aM = "PM";
    } else {
      hours = hours;
      aM = "AM";
    }
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const now = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${aM}`;
    setTime(now);
  };

  setInterval(updateTime, 1000);

  return (
    <div className="flex h-full w-full rounded-3xl bg-green-600 p-4">
      <div className="flex h-full w-full flex-col items-center justify-around rounded-2xl bg-gray-100 p-8">
        <h1 className="text-6xl">{time}</h1>
        <VolunteerIDForm
          formSubmit={formSubmit}
          id={punch.volunteerId}
          formChange={formChange}
          submit="Submit Punch"
        />
        <p
          className={`h-8 text-xl ${error ? "text-red-500" : "text-green-600"}`}
        >
          {error ? error : message}
        </p>
      </div>
    </div>
  );
};
