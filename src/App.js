import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { GiveConsent } from "./GiveConsent";

import css from "./App.module.css";

function Consents() {
  useEffect(() => {
    document.title = "Consents";
  }, []);

  return <div>Consents</div>;
}

function App() {
  return (
    <div className={css.App}>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Routes>
          <Route path="/" element={<GiveConsent />} />
          <Route path="/give-consent" element={<GiveConsent />} />
          <Route path="/consents" element={<Consents />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
