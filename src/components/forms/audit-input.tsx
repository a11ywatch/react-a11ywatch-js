import React, { FormEvent } from "react";
import { useAuditContext } from "../../providers/audit";
import { LoadingIndicator } from "../pure/loading-indicator";

type AuditFormProps = {
  clear?: boolean; // display a clear button
  loadingIndicator?: boolean; // display a loading indicator
};

export const AuditForm = ({
  clear,
  loadingIndicator = true,
}: AuditFormProps) => {
  const { audit } = useAuditContext();

  const onSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await audit.performAudit({ url: audit.url });
  };

  return (
    <form
      onSubmit={onSubmitEvent}
      noValidate
      className="flex space-x-2 gap-y-2 place-items-center"
    >
      <label className="space-x-2">
        Url
        <input
          placeholder="Enter url include http(s)..."
          type={"url"}
          value={audit.url}
          onChange={audit.onChangeUrl}
          className={"ml-2 p-2 border rounded bg-inherit"}
          minLength={8}
          required
        ></input>
      </label>
      <button
        type="submit"
        className={"border rounded px-3 py-2"}
        disabled={audit.loading}
      >
        Submit
      </button>
      {clear ? (
        <button
          type="button"
          className={"border rounded px-3 py-2"}
          onClick={audit.reset}
        >
          Clear
        </button>
      ) : null}
      {loadingIndicator ? (
        <LoadingIndicator
          loaderClassName={"border-2 rounded-full h-5 w-5 inline-block"}
          loading={audit.loading}
          aria-live="polite"
          hideText
        />
      ) : null}
    </form>
  );
};
