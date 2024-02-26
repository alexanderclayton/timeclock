import { TVolunteer } from "../types";

interface IVolunteerFormProps {
  legend: string;
  formSubmit: (e: React.FormEvent) => void;
  formChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volunteer: TVolunteer;
  submit: string;
}

export const VolunteerForm = ({
  legend,
  formSubmit,
  formChange,
  volunteer,
  submit,
}: IVolunteerFormProps) => {
  return (
    <form
      onSubmit={formSubmit}
      className="flex h-full flex-col justify-between px-4"
    >
      <legend className="text-lg font-bold">{legend}</legend>
      <label htmlFor="volunteerFirstName" className="text-sm font-medium">
        First Name
      </label>
      <input
        type="text"
        id="volunteerFirstName"
        onChange={formChange}
        value={volunteer.volunteerFirstName}
        className="rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="volunteerLastName" className="text-sm font-medium">
        Last Name
      </label>
      <input
        type="text"
        id="volunteerLastName"
        onChange={formChange}
        value={volunteer.volunteerLastName}
        className="rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="volunteerEmail" className="text-sm font-medium">
        Email
      </label>
      <input
        type="text"
        id="volunteerEmail"
        onChange={formChange}
        value={volunteer.volunteerEmail}
        className="rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <label htmlFor="volunteerPhone" className="text-sm font-medium">
        Phone
      </label>
      <input
        type="text"
        id="volunteerPhone"
        onChange={formChange}
        value={volunteer.volunteerPhone}
        className="rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <input
        type="submit"
        value={submit}
        className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600"
      />
    </form>
  );
};
