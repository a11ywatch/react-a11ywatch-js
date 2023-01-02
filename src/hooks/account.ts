import { useEffect, useState } from "react";

type AccountProps = {
  activeSubscription: boolean;
  authed: boolean;
  email: string;
  jwt: string;
  role: number;
};

const tkn = "@a11ywatch/data";

// basic account details
export const useAccount = (persist?: boolean) => {
  const [account, setAccountType] = useState<AccountProps>({
    activeSubscription: false,
    authed: false,
    email: "",
    jwt: "",
    role: 0,
  });

  useEffect(() => {
    if (persist) {
      const usr = localStorage.getItem(tkn);

      if (usr) {
        setAccountType(JSON.parse(usr));
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

  return {
    account,
    setAccountType: onAccountEvent,
  };
};
