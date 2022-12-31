import { useA11yWatchContext } from "../../providers/app";
import React, { useEffect } from "react";

// fetch the payment plans from the API
export const getPaymentPlans = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_A11YWATCH_API || "https://api.a11ywatch.com"}/api/plans`);
  let json = null;

  if(res.ok) {
    try {
      json = await res.json();
    } catch(e) {
      console.error(e)
    }
  }
  
  return json
}

export const PaymentsPlans = () => {
  const { payments } = useA11yWatchContext()
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
        <div>
          <div>Features</div>

          <ul style={{ margin: 10 }}>
            {paymentPlans.feats.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>

          <div>Plans</div>

          <ul style={{ margin: 10 }}>
            {plans &&
              plans.map((item, i) => {
                const onSetPlan = () => setSelected(i);

                const active = selected?.title === item.title;
                
                return (
                  <button
                    key={i}
                    onClick={onSetPlan}
                    className={`${active ? "border-blue-600" : ""} border-2 px-3 py-2`}
                  >
                    <div>{item.title}</div>
                    <div>{yearly ? item.costYearly : item.cost}</div>
                    <div>{item.details[0]}</div>
                  </button>
                );
              })}
          </ul>
        </div>
      ) : null}

      <div className="space-x-2">
        <button onClick={onToggleHighPlan}>Toggle High Plans</button>
        <button onClick={onToggleYearly}>Switch Yearly</button>
      </div>

    </div>
  );
};
