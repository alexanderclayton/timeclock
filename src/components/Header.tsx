import React from "react";
import { ETabs } from "../types";

interface IHeaderProps {
  setTabs: React.Dispatch<React.SetStateAction<ETabs>>;
}

export const Header = ({ setTabs }: IHeaderProps) => {
  return (
    <header>
      <nav>
        <button onClick={() => setTabs(ETabs.Home)}>Home</button>
        <button onClick={() => setTabs(ETabs.Timesheet)}>Timesheet</button>
        <button onClick={() => setTabs(ETabs.Settings)}>Settings</button>
      </nav>
    </header>
  );
};
