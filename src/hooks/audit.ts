import { useEffect, useReducer, useRef } from "react";
import { tkn_report } from "../utils/data";
import { PageReport, Report } from "../types";
import { mutateScan } from "../mutations/scan";
import { streamAudit } from "../mutations/stream-audit";

type AuditState = {
  report: PageReport;
  loading: boolean;
  url: string;
};

type ActionPayloadReport = { report: PageReport; url?: string };
type ActionPayloadUrl = { report?: PageReport; url: string };

enum AuditActionKind {
  SET_REPORT,
  SET_REPORT_STREAM,
  SET_URL,
  TOGGLE_LOADER,
  RESET,
}

function reducer(
  state: AuditState,
  action: {
    type: AuditActionKind;
    payload: ActionPayloadReport | ActionPayloadUrl;
  }
) {
  switch (action.type) {
    case AuditActionKind.TOGGLE_LOADER: {
      return { loading: !state.loading, report: state.report, url: state.url };
    }
    case AuditActionKind.SET_REPORT: {
      return {
        report: action.payload.report,
        loading: false,
        url: action.payload.url || state.url,
      };
    }
    case AuditActionKind.SET_REPORT_STREAM: {
      const nextReport = action.payload.report as Report;
      // validate
      if (
        nextReport &&
        nextReport.url &&
        nextReport instanceof Map === false &&
        state.report &&
        state.report instanceof Map
      ) {
        const item = state.report.has(nextReport.url);
        if (item) {
          const mapedReport = state.report.get(nextReport.url);

          if (mapedReport) {
            mapedReport.cdnConnected = nextReport.cdnConnected;
            mapedReport.issues = nextReport.issues;
            mapedReport.issuesInfo = nextReport.issuesInfo;
            mapedReport.lastScanDate = nextReport.lastScanDate;
            mapedReport.online = nextReport.online;
          }
        } else {
          state.report.set(nextReport.url, nextReport);
        }
      }

      return {
        report: state.report,
        loading: true, // continue loading until stream is finished
        url: action.payload.url || state.url,
      };
    }
    case AuditActionKind.SET_URL: {
      return { report: state.report, loading: false, url: action.payload.url };
    }
    case AuditActionKind.RESET: {
      let report = null;

      if (state.report && state.report instanceof Map) {
        // clear the internal memory before state wipe
        state.report.clear();
        report = new Map();
      }

      return { report: report, loading: false, url: "" };
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

// init props
const init = (multi: boolean) => ({
  report: multi ? new Map() : null,
  loading: false,
  url: "",
});

// basic account details
export const useAudit = ({ jwt, persist, multi }: AuditHookProps) => {
  const [state, dispatch] = useReducer(reducer, multi, init);
  const persistKey = `${tkn_report}_${persist}`; // custom persist options per url
  const initMount = useRef<boolean>(false);

  useEffect(() => {
    if (
      (multi && !state.report) ||
      (!multi && state.report && state.report instanceof Map)
    ) {
      // reset to default
      dispatch({
        type: AuditActionKind.SET_REPORT,
        payload: init(!!multi),
      });
    }
  }, [multi, state, dispatch]);

  // restore state
  useEffect(() => {
    if (persist && !initMount.current) {
      const oldState = localStorage.getItem(persistKey);

      if (oldState) {
        let oldStateValue = {
          url: "",
          report: undefined,
        };

        try {
          oldStateValue = JSON.parse(oldState);
        } catch (e) {
          console.error(e);
        }

        let reportParsed;

        if (oldStateValue.report) {
          try {
            reportParsed = JSON.parse(oldStateValue.report);
          } catch (e) {
            console.error(e);
          }
        }

        dispatch({
          type: AuditActionKind.SET_REPORT,
          payload: multi
            ? {
                url: oldStateValue.url,
                report: new Map(reportParsed),
              }
            : oldStateValue,
        });
      }
      initMount.current = true;
    }
  }, [persist, multi, dispatch]);

  // store state
  useEffect(() => {
    const report = state.report;

    if (report && persist && localStorage) {
      localStorage.setItem(
        persistKey,
        JSON.stringify({
          report:
            multi && report instanceof Map
              ? JSON.stringify(Array.from(report.entries()))
              : report,
          url: state.url,
        })
      );
    }
  }, [state, persist, multi]);

  const dispatchReport = (value: PageReport) => {
    dispatch({
      type: AuditActionKind.SET_REPORT_STREAM,
      payload: { report: value },
    });
  };

  // @param u - url return Promise<{data}>
  const performAudit = async (params: { url: string; [x: string]: any }) => {
    const { url: u, ...extra } = params ?? {};
    const websiteUrl = u.includes("http") ? u : `http://${u}`;

    dispatch({
      type: AuditActionKind.TOGGLE_LOADER,
      payload: { report: null },
    });

    if (multi) {
      await streamAudit(
        { body: { ...extra, url: websiteUrl }, cb: dispatchReport },
        jwt
      );
      dispatch({
        type: AuditActionKind.TOGGLE_LOADER,
        payload: { url: websiteUrl },
      });
    } else {
      const json = await mutateScan(
        { body: { ...extra, url: websiteUrl } },
        jwt
      );
      dispatch({
        type: AuditActionKind.SET_REPORT,
        payload: { report: json?.data },
      });
    }
  };

  const onChangeUrl = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: AuditActionKind.SET_URL,
      payload: { url: event.currentTarget.value },
    });
  };

  const onResetDta = () => {
    dispatch({
      type: AuditActionKind.RESET,
      payload: { url: "" },
    });
    localStorage.removeItem(persistKey);
  };

  return {
    performAudit,
    onChangeUrl,
    dispatchReport,
    report: state.report,
    loading: state.loading,
    url: state.url || "", // prevent returning undefined
    reset: onResetDta,
  };
};
