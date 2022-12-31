import React from "react";
import ReactDOM from "react-dom";
import { CheckoutForm } from "./checkout";
import { StripeProvider } from "../../providers/stripe";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <StripeProvider>
      <CheckoutForm />
    </StripeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
