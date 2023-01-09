import { useEffect, useState } from "react";
import { tkn } from "../utils/data";

type AccountProps = {
  activeSubscription: boolean;
  authed: boolean;
  email: string;
  jwt: string;
  role: number;
};

const accountDefaults: AccountProps = {
  activeSubscription: false,
  authed: false,
  email: "",
  jwt: "",
  role: 0,
};

// basic account details
export const useAccount = (persist?: boolean) => {
  const [account, setAccountType] = useState<AccountProps>(accountDefaults);

  useEffect(() => {
    if (persist) {
      const usr = localStorage.getItem(tkn);

      if (usr) {
        let udata = null;
        try {
          udata = JSON.parse(usr);
        } catch (e) {
          console.error(e);
        }
        udata && setAccountType(udata);
      }
    }
  }, [persist, setAccountType]);

  const onAccountEvent = (user: AccountProps) => {
    setAccountType(user);
    // persist to disk
    if (user && persist && localStorage) {
      localStorage.setItem(tkn, JSON.stringify(user));
    }
  };

  const onLogout = () => {
    if (account.email && persist && localStorage) {
      setAccountType(accountDefaults);
      localStorage.removeItem(tkn);
    }
    // silent ignore
  };

  return {
    account,
    setAccountType: onAccountEvent,
    onLogout,
  };
};
