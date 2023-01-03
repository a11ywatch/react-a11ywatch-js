import React, { FormEvent } from "react";
import { useAuditContext } from "../../providers/audit";

export const AuditForm = () => {
  const { audit } = useAuditContext();

  const onSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await audit.performAudit(audit.url);
  };

  return (
    <form onSubmit={onSubmitEvent} noValidate className="space-x-2">
      <label className="space-x-2">
        Url
        <input
          placeholder="Enter url include http(s)..."
          type={"url"}
          value={audit.url}
          onChange={audit.onChangeUrl}
          className={"ml-2 p-2 border rounded"}
          required
          minLength={8}
        ></input>
      </label>
      <button
        type="submit"
        className={"border rounded px-3 py-2"}
        disabled={audit.loading}
      >
        Submit
      </button>
    </form>
  );
};
