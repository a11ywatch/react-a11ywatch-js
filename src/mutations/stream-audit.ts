import { Buffer } from "buffer";
import { PageReport } from "../types";
import { API_URL } from "../config/api";

type Body = {
  url?: string;
  [x: string]: any;
};

// perform scan against url
export const streamAudit = async (
  { body, cb }: { body: Body; cb(info: PageReport): void | Promise<void> },
  jwt?: string
) => {
  let res: null | Response = null;

  try {
    res = await fetch(`${API_URL}/api/crawl`, {
      method: "POST",
      body: body ? JSON.stringify(body) : null,
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${jwt}`, // set the auth token from login
      },
    });
  } catch (e) {
    console.error(e);
  }

  return new Promise(async (resolve) => {
    if (res && res.body) {
      const reader = res.body.getReader();

      // todo - re-visit stream pumps
      new ReadableStream({
        start(controller) {
          function pump(): Promise<void> {
            return reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return resolve(true);
              }
              const ignoreBlock =
                value.length === 1 && [91, 93].includes(value[0]);

              if (!ignoreBlock) {
                const jsonString = Buffer.from(value).toString("utf8");
                if (jsonString) {
                  // check for last trailing comma
                  let jsonTrimmed =
                    jsonString[jsonString.length - 1] === ","
                      ? jsonString.substring(0, jsonString.length - 1)
                      : jsonString;

                  // all options that can pump into stream
                  if (
                    jsonTrimmed.includes(`},{"data":`) &&
                    jsonTrimmed[jsonTrimmed.length - 1] === "}"
                  ) {
                    const newSet = `[${jsonTrimmed}]`;
                    let setData: { data: PageReport }[] = [];

                    try {
                      setData = JSON.parse(newSet);
                    } catch (e) {
                      // console.error(e);
                    }

                    for (const item of setData) {
                      cb && cb(item.data);
                    }
                  } else if (jsonTrimmed) {
                    if (jsonTrimmed[jsonTrimmed.length - 1] === "]") {
                      jsonTrimmed = jsonTrimmed.slice(0, -1);
                    }
                    // safe to parse
                    if (
                      jsonTrimmed[0] === "{" &&
                      jsonTrimmed[jsonTrimmed.length - 1] === "}"
                    ) {
                      try {
                        const jsonDataParsed = JSON.parse(jsonTrimmed.trim());

                        jsonDataParsed && cb(jsonDataParsed.data);
                      } catch (e) {
                        // console.error(e);
                      }
                    }
                  }
                }
              }

              controller.enqueue(value);
              return pump();
            });
          }
          return pump();
        },
      });
    } else {
      resolve(true);
    }
  });
};
