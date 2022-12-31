import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useA11yWatchContext } from "../../providers/app";

interface Props {
  disabled?: boolean;
  submitLabel?: string; // the submit button text
}

const style = {
  base: {
    iconColor: "#0E1116",
    fontWeight: "500",
    fontFamily: "system-ui, -apple-system, Helvetica Neue",
    fontSize: "20px",
    fontSmoothing: "antialiased",
  },
};

export const CheckoutForm = ({ disabled, submitLabel }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { payments } = useA11yWatchContext()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, token } = await stripe.createToken(cardElement);

      if (!error) {
        await payments.onToken(token);
      } else {
        console.error(error);
      }
    }
  };

  // todo: get raw price conversion to currency match
  const price = payments.yearly ? payments.selected?.costYearly : payments.selected?.cost

  return (
    <form
      onSubmit={handleSubmit}
      className={"h-42 space-y-3 border-t border-[#2A2A2A] pt-5 pb-3 w-full"}
      style={{ width: "100%" }}
    >
     {typeof price !== "undefined" ?  <div className="text-xl font-semibold" style={{ padding: 10 }}>
        Total{" "}
        {typeof price === "number"
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price / 100)
          : price}
      </div> : null}
      <div className="space-y-4">
        <div  className={"bg-white px-4 py-2"}>
          <CardElement
            options={{
              disabled,
              style,
              classes: { focus: "border-blue-400 shadow-md shadow-blue-600" },
            }}
            className={"p-4 bg-white border-2"}
          />
        </div>

        <div className="py-4">
          <button
            type="submit"
            disabled={disabled}
            className={`font-bold border text-base px-8 md:px-8 rounded-sm md:px-12 md:rounded-sm min-w-[260px] md:min-w-[275px] ${
              disabled ? "text-black" : "border-blue-800 text-blue-800"
            }`}
          >
            {submitLabel ?? "Start"}
          </button>
        </div>
      </div>
    </form>
  );
};
