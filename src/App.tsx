//import//
import { useState } from "react";
import { Header } from "./components";
import { ETabs } from "./types";
import { AddVolunteer, Home, Timesheets } from "./pages";

function App() {
  const [tab, setTab] = useState<ETabs>(ETabs.Home);
  return (
    <div className="flex h-screen flex-col">
      <Header tabs={tab} setTabs={setTab} />
      <main className="flex-1">
        {tab === "Home" && <Home />}
        {tab === "Timesheet" && <Timesheets />}
        {tab === "Settings" && <AddVolunteer />}
      </main>
    </div>
  );
}

export default App;
