//import//
import { useState } from "react";
import { AddVolunteer, Home } from "./pages";
import { Header } from "./components";
import { ETabs } from "./types";

function App() {
  const [tab, setTab] = useState<ETabs>(ETabs.Home);
  return (
    <>
      <Header setTabs={setTab} />
      <main>
        {tab === "Home" && <Home />}
        {tab === "Settings" && <AddVolunteer />}
      </main>
    </>
  );
}

export default App;
