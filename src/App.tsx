//import//
import { useState } from "react";
import { Header } from "./components";
import { ETabs } from "./types";
import { AddVolunteer, Home, Timesheets } from "./pages";

function App() {
  const [tab, setTab] = useState<ETabs>(ETabs.Home);
  return (
    <>
      <Header setTabs={setTab} />
      <main>
        {tab === "Home" && <Home />}
        {tab === "Timesheet" && <Timesheets />}
        {tab === "Settings" && <AddVolunteer />}
      </main>
    </>
  );
}

export default App;
