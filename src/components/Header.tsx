import React from "react";
import { ETabs } from "../types";

interface IHeaderProps {
  tabs: ETabs;
  setTabs: React.Dispatch<React.SetStateAction<ETabs>>;
}

export const Header = ({ tabs, setTabs }: IHeaderProps) => {
  return (
    <header className="flex justify-between">
      <div>
        <p>L.I.N.K.</p>
      </div>
      <nav className="flex w-96 justify-around">
        <button
          className={`trapezoid w-1/3 p-3 ${tabs === ETabs.Home ? "bg-blue-500" : "bg-gray-300"}`}
          onClick={() => setTabs(ETabs.Home)}
        >
          Home
        </button>
        <button
          className={`trapezoid w-1/3 p-3 ${tabs === ETabs.Timesheet ? "bg-blue-500" : "bg-gray-300"}`}
          onClick={() => setTabs(ETabs.Timesheet)}
        >
          Timesheet
        </button>
        <button
          className={`trapezoid w-1/3 p-3 ${tabs === ETabs.Settings ? "bg-blue-500" : "bg-gray-300"}`}
          onClick={() => setTabs(ETabs.Settings)}
        >
          Settings
        </button>
      </nav>
    </header>
  );
};
