import React from "react";
import ReactDOM from "react-dom";
import { GiveConsent } from "./GiveConsent";

// A simple smoke test should do it for this component at this stage.
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GiveConsent />, div);
});
