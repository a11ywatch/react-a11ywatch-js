import React from "react";
import ReactDOM from "react-dom";
import { SignOnForm } from "./auth-form";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SignOnForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
