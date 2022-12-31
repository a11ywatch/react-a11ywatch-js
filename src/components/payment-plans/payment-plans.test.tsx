import React from "react";
import ReactDOM from "react-dom";
import { PaymentsPlans } from "./payment-plans";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PaymentsPlans />, div);
  ReactDOM.unmountComponentAtNode(div);
});
