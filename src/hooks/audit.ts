import { useReducer } from "react";
import { PageIssue, IssueMeta, PageLoadTimeMeta } from "../types";

export type Report = {
  url?: string;
  domain?: string;
  issues?: PageIssue[];
  cdnConnected?: boolean;
  issuesInfo?: IssueMeta;
  lastScanDate?: string;
  online?: boolean;
  pageLoadTime?: PageLoadTimeMeta;
  userId?: number;
};

type AuditState = {
  report: Report | null;
  loading: boolean;
};

enum AuditActionKind {
  SET_REPORT,
  TOGGLE_LOADER,
}

const initialState = { report: null, loading: false };

function reducer(
  state: AuditState,
  action: { type: AuditActionKind; payload?: Report | null }
) {
  switch (action.type) {
    case AuditActionKind.TOGGLE_LOADER: {
      return { loading: !state?.loading, report: state?.report };
    }
    case AuditActionKind.SET_REPORT: {
      return { report: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
}

// basic account details
export const useAudit = (jwt: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const performAudit = async (url: string) => {
    try {
      dispatch({ type: AuditActionKind.TOGGLE_LOADER });

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_A11YWATCH_API || "https://api.a11ywatch.com"
        }/api/scan`,
        {
          method: "POST",
          body: JSON.stringify({
            url,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`, // set the auth token from login
          },
        }
      );
      const json = await res.json();
      const value = json?.data;

      if (value) {
        dispatch({ type: AuditActionKind.SET_REPORT, payload: value });
      } else {
        alert(json?.message ?? "Error with API.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    report: state.report,
    loading: state.loading,
    performAudit,
  };
};
