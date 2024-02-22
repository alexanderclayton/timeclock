import React from "react";

interface IVolunteerIDFormProps {
  formSubmit: (e: React.FormEvent) => Promise<void>;
  id: string;
  formChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: string;
}

export const VolunteerIDForm = ({
  formSubmit,
  id,
  formChange,
  submit,
}: IVolunteerIDFormProps) => {
  return (
    <form onSubmit={formSubmit} className="w-full max-w-sm">
      <div className="mb-4">
        <input
          type="text"
          id="volunteerId"
          placeholder="Volunteer ID"
          onChange={formChange}
          value={id}
          className="mt-1 block w-full rounded-md border-gray-300 p-2 text-center shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-6">
        <input
          type="submit"
          value={submit}
          className="w-full rounded-md bg-indigo-500 p-2 font-semibold text-white hover:cursor-pointer hover:bg-indigo-600"
        />
      </div>
    </form>
  );
};
