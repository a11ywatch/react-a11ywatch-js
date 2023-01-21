"use client";

import React, { useState, useCallback, memo } from "react";
import { useAuditContext } from "../../providers/audit";
import { domainList } from "../../config/dns";
import {
  WCAGSelectInput,
  AccessibilityStandardKeys,
  Standard,
} from "./select-input";
import { FormControl } from "./form-control";
import { TextField } from "../general/text-field";
import { Checkbox } from "../general/checkbox";
import { Button } from "../general/button";
import { RunnerSelect } from "./runner-select";

interface FormDialogProps {
  buttonTitle?: string;
  subTitle?: string; // subtitle of form
  okPress?: (a: any) => void;
  buttonStyles?: string;
  icon?: boolean | "add"; // show btn with icon
  activeSubscription?: boolean;
  submit?(x: any): void;
  lightHouseEnabled?: boolean; // render lighthouse btn
  submitTitle?: string; // submit title
}

const checkBoxContainerStyles =
  "flex place-items-center gap-x-1 min-w-[80px] md:min-w-20 md:gap-x-2";

function FormDialogComponent({
  buttonTitle = "Subscribe",
  subTitle = "To add a website to your watchlist, enter the url below.",
  okPress,
  activeSubscription = true,
  submit,
  lightHouseEnabled,
  submitTitle = "Subscribe"
}: FormDialogProps) {
  const { audit } = useAuditContext();

  // custom state
  const [websitUrl, setUrl] = useState<string>("");
  const [https, setTransportType] = useState<boolean>(true);
  const [pageInsights, setPageInsights] = useState<boolean>(false);
  const [mobileViewport, setMobile] = useState<boolean>(false);
  const [subdomains, setSubdomains] = useState<boolean>(false);
  const [sitemap, setSitemap] = useState<boolean>(!!activeSubscription);
  const [tld, setTld] = useState<boolean>(false);
  const [ua, setUserAgent] = useState<string>("");
  const [proxy, setProxy] = useState<string>("");
  const [standard, setWCAGStandard] = useState<AccessibilityStandardKeys>(
    Standard[Standard.WCAG2AA] as AccessibilityStandardKeys
  );
  const [robots, setRobots] = useState<boolean>(true);
  const [runners, setRunners] = useState<string[]>([]);

  const onChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value);
    },
    [setUrl]
  );

  const onStandardChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setWCAGStandard(event.target.value);
    },
    [setWCAGStandard]
  );

  const onRunnerEvent = useCallback(
    (event: string[]) => {
      setRunners(event);
    },
    [setRunners]
  );

  const submitEvent = useCallback(
    async (event: any) => {
      event?.preventDefault();
      if (!websitUrl) {
        // prevent empty
        return;
      }

      let cleanUrl = String(websitUrl)
        .replace(https ? "https" : "http", https ? "http" : "https")
        .replace(/^(?:https?:\/\/)?/i, "")
        .split("/")[0];

      if (cleanUrl[cleanUrl.length - 1] === "/") {
        cleanUrl = cleanUrl.slice(0, -1);
      }

      let tpt = "https";

      if (websitUrl.includes("http://") || !https) {
        tpt = "http";
      }

      let urlBase = cleanUrl.includes("://") ? "" : `://`;

      let blockExt;

      if (cleanUrl.includes("localhost:")) {
        blockExt = true;
      }

      // determine whether to add an extension or not
      const ex =
        blockExt ||
        cleanUrl.includes(".") ||
        domainList.some((element: any) => cleanUrl.includes(element))
          ? ""
          : ".com";

      const websiteUrl = `${tpt}${urlBase}${cleanUrl}${ex}`.trim();

      const params = {
        url: websiteUrl.toLowerCase(),
        customHeaders: [],
        pageInsights,
        mobile: mobileViewport,
        ua,
        standard,
        actions: [],
        robots,
        subdomains,
        tld,
        runners,
        proxy,
        sitemap,
      };

      await audit.performAudit(params);

      if (submit && typeof submit === "function") {
        await submit(params);
      }
    },
    [
      submit,
      okPress,
      websitUrl,
      https,
      pageInsights,
      mobileViewport,
      standard,
      ua,
      robots,
      subdomains,
      tld,
      runners,
      proxy,
      sitemap,
    ]
  );

  const onChangeUA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAgent(event.target.value);
  };

  const onChangeProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProxy(event.target.value);
  };

  const onChangeRobotsEvent = () => {
    setRobots((a: boolean) => !a);
  };

  const onChangeSubdomainsEvent = () => {
    setSubdomains((a: boolean) => !a);
  };

  const onChangeTldEvent = () => {
    setTld((a: boolean) => !a);
  };
  const onChangeSitemapEvent = () => {
    setSitemap((a: boolean) => !a);
  };

  return (
    <div className="bg-white dark:bg-black">
      {buttonTitle ? (
        <div className={"px-6 py-3 flex place-items-center"}>
          <h3 id="form-dialog-title" className={"flex-1 text-xl font-medium"}>
            {buttonTitle}
          </h3>
        </div>
      ) : null}
      <form onSubmit={submitEvent} noValidate>
        <div className={`px-7 py-1 relative flex flex-col gap-y-2`}>
          <p className="text-base ">{subTitle}</p>
          <FormControl htmlFor="name">Enter Website Url</FormControl>
          <div className={"pb-1 py-4 w-full"}>
            <TextField
              autoFocus
              onChange={onChangeText}
              minLength={3}
              className={`w-full border px-3 py-2 rounded`}
              color="secondary"
              value={websitUrl}
              id="name"
              placeholder="Website url"
              type="url"
              required
            />
          </div>
          <div className={`flex flex-1 place-items-center space-x-5 pt-2 pb-1`}>
            <div className={checkBoxContainerStyles}>
              <Checkbox
                checked={https}
                onChange={() => {
                  setTransportType(!https);
                }}
                id={"https"}
              />
              <FormControl htmlFor="https" visible>
                HTTPS
              </FormControl>
            </div>
            {lightHouseEnabled ? <div className={checkBoxContainerStyles}>
              <Checkbox
                checked={pageInsights}
                onChange={() => {
                  setPageInsights(!pageInsights);
                }}
                id={"lighthouse"}
              />
              <FormControl htmlFor="lighthouse" visible>
                Lighthouse
              </FormControl>
            </div> : null}
            <div className={checkBoxContainerStyles}>
              <Checkbox
                checked={mobileViewport}
                onChange={() => {
                  setMobile(!mobileViewport);
                }}
                id={"mobile"}
              />
              <FormControl htmlFor="mobile" visible>
                Mobile
              </FormControl>
            </div>
            <div className={checkBoxContainerStyles}>
              <Checkbox
                color="primary"
                checked={robots}
                onChange={onChangeRobotsEvent}
                id={"robots"}
              />
              <FormControl htmlFor="robots" visible>
                Robots
              </FormControl>
            </div>
            <div className={checkBoxContainerStyles}>
              <Checkbox
                checked={subdomains}
                onChange={onChangeSubdomainsEvent}
                id={"subdomains"}
                disabled={!activeSubscription}
              />
              <FormControl
                htmlFor="subdomains"
                visible
                disabled={!activeSubscription}
              >
                Subdomains
              </FormControl>
            </div>
            <div className={checkBoxContainerStyles}>
              <Checkbox
                checked={tld}
                onChange={onChangeTldEvent}
                id={"tlds"}
                disabled={!activeSubscription}
              />
              <FormControl
                htmlFor="tlds"
                visible
                disabled={!activeSubscription}
              >
                TLDs
              </FormControl>
            </div>
            <div className={checkBoxContainerStyles}>
              <Checkbox
                checked={sitemap}
                onChange={onChangeSitemapEvent}
                id={"sitemap"}
                disabled={!activeSubscription}
              />
              <FormControl
                htmlFor="sitemap"
                visible
                disabled={!activeSubscription}
              >
                Sitemap
              </FormControl>
            </div>
            <RunnerSelect cb={onRunnerEvent} />
          </div>
          <div
            className={`flex flex-1 place-items-center space-x-5 overflow-x-auto pb-2`}
          >
            <WCAGSelectInput
              standard={standard}
              onStandardChange={onStandardChange}
              spacing
            />
            <FormControl htmlFor="ua">Enter User Agent</FormControl>
            <TextField
              onChange={onChangeUA}
              className={`px-2 py-0.5 border-none`}
              style={{ maxWidth: 120 }}
              value={ua}
              id="ua"
              placeholder="User-Agent"
              type="text"
            />
            <FormControl htmlFor="proxy">Enter Proxy</FormControl>
            <TextField
              onChange={onChangeProxy}
              className={`px-2 py-0.5 border-none ${
                !activeSubscription ? "opacity-80" : ""
              }`}
              style={{ maxWidth: 120 }}
              value={proxy}
              id="proxy"
              placeholder="Proxy"
              type="text"
              disabled={!activeSubscription}
            />
          </div>
        </div>
        <div className="pt-2">
          <Button
            disabled={!websitUrl}
            type="submit"
            className={`w-full border-l-0 border-b-0 border-r-0 border-t rounded-none ${
              !websitUrl ? "opacity-80 text-gray-500" : ""
            } md:py-3`}
          >
            {submitTitle}
          </Button>
        </div>
      </form>
    </div>
  );
}

export const FormDialog = memo(FormDialogComponent);
