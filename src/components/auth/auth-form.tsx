import React, { FormEvent, useState } from "react";
import { useA11yWatchContext } from "../../providers/app";

// todo: loading spinner
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
        `${
          process.env.NEXT_PUBLIC_A11YWATCH_API || "https://api.a11ywatch.com"
        }/api/${registerForm ? "register" : "login"}`,
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
    <div className="space-y-2">
      <p className="text-xl font-medium">
        A11yWatch {registerForm ? "Register" : "Login"}
      </p>
      <form onSubmit={onSubmitEvent} noValidate className="p-4 space-x-2">
        <label className="space-x-2">
          Email
          <input
            placeholder="Enter email..."
            type={"email"}
            onChange={onChangeEmail}
            required
            className={"ml-2 p-2 border rounded"}
          ></input>
        </label>
        <label className="space-x-2">
          Password
          <input
            placeholder="Enter password..."
            type={"password"}
            minLength={6}
            required
            onChange={onChangePassword}
            className={"ml-2 p-2 border rounded"}
          ></input>
        </label>
        <button type="submit" className={"border rounded px-3 py-2"}>
          Submit
        </button>
      </form>

      <button onClick={onToggleFormType} className={"border rounded px-3 py-2"}>
        {registerForm ? "Login" : "Register"} Account
      </button>
    </div>
  );
};
