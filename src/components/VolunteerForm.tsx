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
    <form onSubmit={formSubmit} className="flex flex-col">
      <legend>{legend}</legend>
      <label htmlFor="volunteerFirstName">First Name</label>
      <input
        type="text"
        id="volunteerFirstName"
        onChange={formChange}
        value={volunteer.volunteerFirstName}
      />
      <label htmlFor="volunteerLastName">Last Name</label>
      <input
        type="text"
        id="volunteerLastName"
        onChange={formChange}
        value={volunteer.volunteerLastName}
      />
      <label htmlFor="volunteerEmail">Email</label>
      <input
        type="text"
        id="volunteerEmail"
        onChange={formChange}
        value={volunteer.volunteerEmail}
      />
      <label htmlFor="volunteerPhone">Phone</label>
      <input
        type="text"
        id="volunteerPhone"
        onChange={formChange}
        value={volunteer.volunteerPhone}
      />
      <input type="submit" value={submit} />
    </form>
  );
};
