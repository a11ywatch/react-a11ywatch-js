import { useState } from "react";

// basic account details
export const useAccount = () => {
    const [account, setAccountType] = useState<{
        activeSubscription: boolean;
        authed: boolean;
        email: string;
        jwt: string;
        role: number;
      }>({
        activeSubscription: false,
        authed: false,
        email: "",
        jwt: "",
        role: 0,
    });

    return {
        account,
        setAccountType
    }
}