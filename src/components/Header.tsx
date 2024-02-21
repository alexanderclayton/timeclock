import React from "react";
import { ETabs } from "../types";

interface IHeaderProps {
  tabs: ETabs;
  setTabs: React.Dispatch<React.SetStateAction<ETabs>>;
}

export const Header = ({ tabs, setTabs }: IHeaderProps) => {
  return (
    <header className="flex justify-between px-8 pt-4">
      <div>
        <p className="ml-4 pb-4 text-2xl font-bold text-blue-500">L.I.N.K.</p>
      </div>
      <nav className="mr-4 flex w-2/5">
        <button
          className={`ml-2 w-1/3 rounded-t-lg bg-green-600 font-bold text-white ${tabs === ETabs.Home ? "z-10" : "hover:border hover:border-green-400 hover:bg-white hover:text-green-400"}`}
          onClick={() => setTabs(ETabs.Home)}
        >
          Home
        </button>
        <button
          className={`ml-2 w-1/3 rounded-t-lg bg-amber-400 font-bold text-white ${tabs === ETabs.Timesheet ? "z-10" : "hover:border hover:border-amber-400 hover:bg-white hover:text-amber-400"}`}
          onClick={() => setTabs(ETabs.Timesheet)}
        >
          Timesheet
        </button>
        <button
          className={`ml-2 w-1/3 rounded-t-lg bg-purple-900 font-bold text-white ${tabs === ETabs.Settings ? "z-10" : "hover:border hover:border-purple-400 hover:bg-white hover:text-purple-400"}`}
          onClick={() => setTabs(ETabs.Settings)}
        >
          Settings
        </button>
      </nav>
    </header>
  );
};
