import React from "react";
import ReactDOM from "react-dom";
import { IssueLists } from "./list";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<IssueLists issues={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
