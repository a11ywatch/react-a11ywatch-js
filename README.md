## react-forms

Unstyled react forms and hooks to manage create and manage a A11yWatch account that work nice with tailwind.

## Getting Started

1. `npm install @a11ywatch/react-forms`

## Usage

First wrap the section of the app that needs to use A11yWatch with the Auth provider.

```tsx
import {A11yWatchProvider} from '@a11ywatch/react-forms'

export default function Home() {

    return (
        <A11yWatchProvider>
            <App />
        </A11yWatchProvider>
    )
}
```

Now inside the `App` component you can use the hooks.

```tsx
import {useA11yWatchContext} from '@a11ywatch/react-forms'

export default function App() {
    const {account} = useA11yWatchContext()
    return (
        <div>
           Email {account.email}
        </div>
    )
}
```

Use auth form to authenticate

```tsx
import {useA11yWatchContext, SignOnForm } from '@a11ywatch/react-forms'

export default function App() {
    const {account} = useA11yWatchContext()
    return (
        <div>
           {account.email ? Email {account.email} : null}
            <SignOnForm />
        </div>
    )
}
```

Select a payment plan to prep account upgrade

```tsx
import {useA11yWatchContext, PaymentPlans } from '@a11ywatch/react-forms'

export default function Payments() {
    const {payments} = useA11yWatchContext()

    console.log(payments)
    return (
        <PaymentPlans />
    )
}
```

Use the selected payment plan to change account plan.

```tsx
import {useA11yWatchContext, CheckoutForm } from '@a11ywatch/react-forms'

export default function Payments() {
    const {payments} = useA11yWatchContext()

    console.log(payments)
    return (
        <CheckoutForm />
    )
}
```

### Required Dependencies

1. `react`. ^16
1. `@stripe/stripe-js` if you want to upgrade accounts.
1. `@stripe/react-stripe-js`.

This package handles the above as peers and require installation manually.


## ENV

You can use the `NEXT_PUBLIC_A11YWATCH_API` env var to set the base url of the API.

## LICENSE

check the license file in the root of the project.
