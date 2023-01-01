## @a11ywatch/react-a11ywatch-js

Unstyled react components and hooks to integrate with [A11yWatch](https://a11ywatch.com) using [tailwindcss](https://tailwindcss.com/).

## Getting Started

1. `npm install @a11ywatch/react-a11ywatch-js`

### Required Dependencies

If you plan on upgrading user accounts externally `@stripe/stripe-js` and `@stripe/react-stripe-js` is required.

1. `react`. ^16
1. `@stripe/stripe-js`
1. `@stripe/react-stripe-js`.

This package handles the above as peers and require installation manually.

## Usage

First wrap the section of the app that needs to use A11yWatch with the [A11yWatchProvider](./src/providers/app.tsx).

```tsx
import { A11yWatchProvider } from "@a11ywatch/react-a11ywatch-js";

export default function Home() {
  return (
    <A11yWatchProvider>
      <App />
    </A11yWatchProvider>
  );
}
```

Now inside the `App` component you can use the hooks.

```tsx
import { useA11yWatchContext } from "@a11ywatch/react-a11ywatch-js";

export default function App() {
  const { account } = useA11yWatchContext();
  return <div>Email {account.email}</div>;
}
```

Use auth form to authenticate

```tsx
import { useA11yWatchContext, SignOnForm } from '@a11ywatch/react-a11ywatch-js'

export default function App() {
    const { account } = useA11yWatchContext()

    return (
        <div>
           {account.email ? Email {account.email} : null}
            <SignOnForm />
        </div>
    )
}
```

Select a payment plan to prep account upgrade first add the [PaymentsProvider](./src/providers/payments.tsx).

```tsx
import {
  A11yWatchProvider,
  PaymentsProvider,
} from "@a11ywatch/react-a11ywatch-js";

export default function Payments() {
  return (
    <A11yWatchProvider>
      <PaymentsProvider>
        <App />
      </PaymentsProvider>
    </A11yWatchProvider>
  );
}
```

```tsx
import {
  usePaymentsContext,
  PaymentPlans,
} from "@a11ywatch/react-a11ywatch-js";

export default function PaymentsView() {
  const { payments } = usePaymentsContext();

  console.log(payments);
  return <PaymentPlans />;
}
```

Use the selected payment plan to change account plan.

```tsx
import {
  usePaymentsContext,
  CheckoutForm,
  StripeProvider,
} from "@a11ywatch/react-a11ywatch-js";

export default function PaymentsView() {
  const { payments } = usePaymentsContext();

  console.log(payments);
  return (
    <StripeProvider>
      <CheckoutForm />
    </StripeProvider>
  );
}
```

Full example managing account subscriptions and auth

```tsx
import React, { useEffect } from "react";
import {
  PaymentsProvider,
  A11yWatchProvider,
  SignOnForm,
  PaymentsPlans,
  StripeProvider,
  CheckoutForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";

const PaymentsView = () => {
  const { account } = useA11yWatchContext();

  useEffect(() => {
    // do something with account on change
    console.log(account);
  }, [account]);

  return (
    <div className="space-y-2">
      <div className="text-xl">Welcome {account.email}</div>
      <PaymentsPlans />
      <StripeProvider>
        <CheckoutForm />
      </StripeProvider>
    </div>
  );
};

const MainApp = () => {
  const { account } = useA11yWatchContext();

  return account.authed ? (
    <PaymentsProvider>
      <Payments />
    </PaymentsProvider>
  ) : (
    <SignOnForm />
  );
};

// wrap in auth provider
export function App() {
  return (
    <A11yWatchProvider>
      <MainApp />
    </A11yWatchProvider>
  );
}
```

Use pre-compilled tailwind styles

```tsx
import "@a11ywatch/react-a11ywatch-js/css/tailwind.css";
```

## ENV

You can use the `NEXT_PUBLIC_A11YWATCH_API` env var to set the base url of the API.

## Development

To get started developing run `yarn storybook` to start the instance locally.

## LICENSE

check the license file in the root of the project.
