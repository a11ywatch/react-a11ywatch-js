import React from "react";
import ReactDOM from "react-dom";
import { IssueCell } from "./issue-cell";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <IssueCell
      code={"wcag.21.42"}
      type={"error"}
      context={"Something happened"}
      selector={"a"}
      message={"Fix the issue please."}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
