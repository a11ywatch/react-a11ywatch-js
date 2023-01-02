import React from "react";
import ReactDOM from "react-dom";
import { AuditForm } from "./audit-input";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AuditForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
