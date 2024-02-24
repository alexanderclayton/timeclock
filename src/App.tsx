//import//
import { useState } from "react";
import { Header } from "./components";
import { ETabs } from "./types";
import { Home, Timesheets } from "./pages";
import { Settings } from "./pages/Settings";

function App() {
  const [tab, setTab] = useState<ETabs>(ETabs.Home);
  return (
    <div className="flex h-screen flex-col">
      <Header tabs={tab} setTabs={setTab} />
      <main className="mx-4 mb-4 flex-1">
        {tab === "Home" && <Home />}
        {tab === "Timesheet" && <Timesheets />}
        {tab === "Settings" && <Settings />}
      </main>
    </div>
  );
}

export default App;
