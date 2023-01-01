import { usePaymentsContext } from "../../providers/payments";
import React, { useEffect } from "react";

// fetch the payment plans from the API
export const getPaymentPlans = async () => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_A11YWATCH_API || "https://api.a11ywatch.com"
    }/api/plans`
  );
  let json = null;

  if (res.ok) {
    try {
      json = await res.json();
    } catch (e) {
      console.error(e);
    }
  }

  return json;
};

export const PaymentsPlans = () => {
  const { payments } = usePaymentsContext();
  const {
    paymentPlans,
    setPaymentPlans,
    setHighPlan,
    yearly,
    setYearly,
    setSelected,
    selected,
    plans,
    // highPlan, // use plan determination during checkout
    // selectedPlan, // use the plan in checkout
  } = payments;

  useEffect(() => {
    if (!paymentPlans) {
      (async () => {
        try {
          // fetch the paymentPlans for A11yWatch
          const json = await getPaymentPlans();

          if (json) {
            setPaymentPlans(json.data);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [paymentPlans]);

  const onToggleHighPlan = () => setHighPlan((x: boolean) => !x);
  const onToggleYearly = () => setYearly((x: boolean) => !x);

  return (
    <div>
      {paymentPlans ? (
        <div className="space-y-1">
          <div className="text-lg font-medium">Features</div>

          <ul className="py-2 px-3 list-none border rounded">
            {paymentPlans.feats.map((item, i) => {
              return (
                <li key={i} className={"text-base font-light"}>
                  {item}
                </li>
              );
            })}
          </ul>

          <div>
            <div className="text-base font-medium">Plans</div>

            <ul className="py-2 list-none space-x-2 flex">
              {plans &&
                plans.map((item, i) => {
                  const onSetPlan = () => setSelected(i);

                  const active = selected?.title === item.title;

                  return (
                    <button
                      key={i}
                      onClick={onSetPlan}
                      className={`${
                        active ? "border-blue-600" : ""
                      } border-2 px-3 py-2 flex-1`}
                    >
                      <div className="text-xl font-medium">{item.title}</div>
                      <div className="text-lg font-medium">
                        {yearly ? item.costYearly : item.cost}
                      </div>
                      <div className="text-sm font-light">
                        {item.details[0]}
                      </div>
                    </button>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="space-x-2 py-2">
        <button
          onClick={onToggleHighPlan}
          className={"px-3 py-2 border rounded"}
        >
          View High Plans
        </button>
        <button onClick={onToggleYearly} className={"px-3 py-2 border rounded"}>
          Switch Yearly
        </button>
      </div>
    </div>
  );
};
