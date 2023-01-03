## @a11ywatch/react-a11ywatch-js

Unstyled React components and hooks to integrate with [A11yWatch](https://a11ywatch.com) using [tailwindcss](https://tailwindcss.com/).

Built with performant, native, customizable components, and hooks that can be used for any situation as in re-building custom accessibility solutions, special audit pages, external handling of A11yWatch and much more.

![multi page audit components for jeffmendez.com example](https://user-images.githubusercontent.com/8095978/210292974-d75680c2-7394-420a-b5b5-fe6b6044f21d.png)

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

The `persist` prop stores user data to disk if set to true.

```tsx
import { A11yWatchProvider } from "@a11ywatch/react-a11ywatch-js";

export default function Home() {
  return (
    <A11yWatchProvider persist>
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

Use the SignOnForm component to authenticate.

```tsx
import { useA11yWatchContext, SignOnForm } from "@a11ywatch/react-a11ywatch-js";

export default function App() {
  const { account } = useA11yWatchContext();

  return (
    <div>
      Welcome {account.email ? account.email : null}
      <SignOnForm />
    </div>
  );
}
```

Select a payment plan to prep account upgrade first add the [PaymentsProvider](./src/providers/payments.tsx).

```tsx
import { PaymentsProvider } from "@a11ywatch/react-a11ywatch-js";

export default function Payments() {
  return (
    <PaymentsProvider>
      <App />
    </PaymentsProvider>
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

Full example managing account subscriptions and auth.

```tsx
import React, { useEffect } from "react";
import {
  A11yWatchProvider,
  PaymentsProvider,
  SignOnForm,
  PaymentsPlans,
  StripeProvider,
  CheckoutForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";

// build a payment view based on the components.
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
      <PaymentsView />
    </PaymentsProvider>
  ) : (
    <SignOnForm />
  );
};

// wrap in auth provider
export function App() {
  return (
    <A11yWatchProvider persist>
      <MainApp />
    </A11yWatchProvider>
  );
}
```

Perform a live audit scan on a url, make sure to be authenticated first.

```tsx
import React, { useEffect } from "react";
import {
  A11yWatchProvider,
  AuditProvider,
  AuditForm,
  AuditList,
  useAuditContext,
} from "@a11ywatch/react-a11ywatch-js";

function MyAudit() {
  const { report, loading } = useAuditContext();

  console.log(report, loading);

  return (
    <>
      <AuditForm />
      <AuditList />
    </>
  );
}

export function Auditer() {
  return (
    <A11yWatchProvider persist>
      <AuditProvider persist>
        <MyAudit />
      </AuditProvider>
    </A11yWatchProvider>
  );
}
```

Multiple audits example with persisting to disk:

```tsx
import React from "react";
import {
  A11yWatchProvider,
  AuditProvider,
  AuditForm,
  AuditList,
} from "@a11ywatch/react-a11ywatch-js";

export function Auditer() {
  return (
    <A11yWatchProvider persist>
      <div className="space-y-4">
        <AuditProvider persist={"website-1"}>
          <AuditForm />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
        <AuditProvider persist={"website-2"}>
          <AuditForm />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
      </div>
    </A11yWatchProvider>
  );
}
```

Multi page audits with the `multi` prop:

```tsx
import React from "react";
import {
  A11yWatchProvider,
  AuditProvider,
  AuditForm,
  AuditList,
} from "@a11ywatch/react-a11ywatch-js";

export function Auditer() {
  return (
    <A11yWatchProvider persist>
      <AuditProvider persist multi>
        <AuditForm />
        <AuditList />
      </AuditProvider>
    </A11yWatchProvider>
  );
}
```

Use pre-compilled tailwind styles:

```tsx
import "@a11ywatch/react-a11ywatch-js/css/tailwind.css";
```

### Hooks

You can also use the hooks without the UI to perform all events and actions.

```tsx
import React from "react";
import {
  A11yWatchProvider,
  AuditProvider,
  AuditForm,
  AuditList,
  streamAudit,
  useA11yWatchContext,
  useEffect,
  Report
} from "@a11ywatch/react-a11ywatch-js";

const AutoAudit = () => {
  const { account } = useA11yWatchContext();
  const { dispatchReport } = useAuditContext();

  // auto crawl on mount
  useEffect(() => {
    const cb = (report) => {
      // do something with report prior or after
      dispatchReport(report) // bind state updates manually
    }
    // custom native fetch streaming response
    streamAudit({{ url: "https://a11ywatch.com", cb }, account.jwt}) // second param JWT to use for request
  }, [])

  return null;
}

export function Auditer() {
  return (
    <A11yWatchProvider persist>
      <AuditProvider persist multi>
        <AutoAudit />
        <AuditList />
      </AuditProvider>
    </A11yWatchProvider>
  );
}
```

Todo.. more examples.

## Config

You can add the `persist` prop to providers for storing to disk and retrieval.

## ENV

You can use the `NEXT_PUBLIC_A11YWATCH_API` env var to set the base url of the API ex: `http://localhost:3280`.

## Storybook

The [live example](a11ywatch.github.io/react-a11ywatch-js/?path=/story/paymentsplans--default) website you may need to use the [sign on form](https://a11ywatch.github.io/react-a11ywatch-js/?path=/story/signonform--default) first before using the other components. The sign on and register runs on production with real account information.

Once you login or register you can the other components that require authentication.

## Development

node v14 - v18.

To get started developing run `yarn` to install the modules and `yarn storybook` to start the instance locally.

## LICENSE

check the license file in the root of the project.
