import { EEdits, TVolunteer } from "../types";

interface IAdminVolunteerProps {
  volunteer: TVolunteer | undefined;
  setEditVolunteer: React.Dispatch<React.SetStateAction<EEdits>>;
}

export const AdminVolunteer = ({
  volunteer,
  setEditVolunteer,
}: IAdminVolunteerProps) => {
  return (
    <div className="flex h-[80%] w-full items-center justify-center">
      {volunteer && (
        <div className="h-[70%] w-[90%] rounded bg-gray-100 p-4 shadow">
          <h2 className="mb-2 text-2xl font-bold">
            {volunteer.volunteerFirstName} {volunteer.volunteerLastName} -{" "}
            {volunteer.volunteerId}
          </h2>
          <p className="mb-2">
            <strong>Email:</strong> {volunteer.volunteerEmail}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {volunteer.volunteerPhone}
          </p>
          <p className="mb-2">
            <strong>Admin:</strong> {volunteer.admin ? "Yes" : "No"}
          </p>
          <button
            onClick={() => setEditVolunteer(EEdits.Update)}
            className="text-green-500"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
