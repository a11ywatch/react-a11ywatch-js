import { useEffect, useReducer } from "react";
import { tkn_report } from "../utils/data";
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
  url: string;
};

type ActionPayloadReport = { report: Report | null; url?: string };
type ActionPayloadUrl = { report?: Report | null; url: string };

enum AuditActionKind {
  SET_REPORT,
  SET_URL,
  TOGGLE_LOADER,
}

const initialState = { report: null, loading: false, url: "" };

function reducer(
  state: AuditState,
  action: {
    type: AuditActionKind;
    payload: ActionPayloadReport | ActionPayloadUrl;
  }
) {
  switch (action.type) {
    case AuditActionKind.TOGGLE_LOADER: {
      return { loading: !state?.loading, report: state.report, url: state.url };
    }
    case AuditActionKind.SET_REPORT: {
      return {
        report: action.payload.report,
        loading: false,
        url: action.payload.url || state.url,
      };
    }
    case AuditActionKind.SET_URL: {
      return { report: state.report, loading: false, url: action.payload.url };
    }
    default: {
      return state;
    }
  }
}

type AuditHookProps = {
  jwt?: string;
  persist?: string | boolean; // persist to disk with custom key
  multi?: boolean;
};

// basic account details
export const useAudit = ({ jwt, persist }: AuditHookProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const persistKey = `${tkn_report}_${persist}`; // custom persist options per url

  useEffect(() => {
    if (persist) {
      const oldState = localStorage.getItem(persistKey);

      if (oldState) {
        const oldStateValue = JSON.parse(oldState);

        dispatch({
          type: AuditActionKind.SET_REPORT,
          payload: oldStateValue,
        });
      }
    }
  }, [persist, dispatch]);

  const performAudit = async (url: string) => {
    try {
      dispatch({
        type: AuditActionKind.TOGGLE_LOADER,
        payload: { report: null },
      });

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
        dispatch({
          type: AuditActionKind.SET_REPORT,
          payload: { report: value },
        });

        if (value && persist && localStorage) {
          localStorage.setItem(
            persistKey,
            JSON.stringify({ report: value, url: state.url })
          );
        }
      } else {
        alert(json?.message ?? "Error with API.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeUrl = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: AuditActionKind.SET_URL,
      payload: { url: event.currentTarget.value },
    });
  };

  return {
    performAudit,
    onChangeUrl,
    report: state.report,
    loading: state.loading,
    url: state.url || "", // prevent returning undefined
  };
};
