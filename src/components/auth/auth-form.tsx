import React, { FormEvent, useState } from "react";
import { useA11yWatchContext } from "../../providers/app";

export const SignOnForm = () => {
  const { setAccountType } = useA11yWatchContext();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [registerForm, setRegister] = useState<boolean>();

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_A11YWATCH_API || "https://api.a11ywatch.com"}/api/${
          registerForm ? "register" : "login"
        }`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();

      const user = json?.data;

      if (user) {
        setAccountType({
          authed: true,
          email: user.email,
          jwt: user.jwt,
          role: user.role,
          activeSubscription: user.activeSubscription,
        });
      } else {
        alert(json?.message ?? "Error with API.");
      }
    }
  };

  const onToggleFormType = () => setRegister((x) => !x);

  return (
    <div>
      <h2>{registerForm ? "Register" : "Login"} to A11yWatch</h2>

      <form onSubmit={onSubmitEvent} noValidate className="p-4">
        <label>
          Email
          <input
            placeholder="Enter email.."
            type={"email"}
            onChange={onChangeEmail}
            className={"p-2"}
          ></input>
        </label>
        <label>
          Password
          <input
            placeholder="Enter password..."
            type={"password"}
            onChange={onChangePassword}
            className={"p-2"}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="px-2 py-2">
        <button onClick={onToggleFormType}>
          {registerForm ? "Login" : "Register"} Account
        </button>
      </div>
    </div>
  );
};
