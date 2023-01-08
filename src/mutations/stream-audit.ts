import { PageReport } from "../types";
import { API_URL } from "../config/api";

// perform scan against url
export const streamAudit = async (
  { url, cb }: { url: string; cb?(info: PageReport): void | Promise<void> },
  jwt?: string,
  ignoreParse?: boolean
) => {
  const res = await fetch(`${API_URL}/api/crawl`, {
    method: "POST",
    body: JSON.stringify({
      url,
    }),
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${jwt}`, // set the auth token from login
    },
  });

  let json = null;

  if (res.body) {
    const reader = res.body.getReader();

    const stream = await new ReadableStream({
      start(controller) {
        function pump(): Promise<void> {
          return reader.read().then(({ done, value }) => {
            if (done) {
              return controller.close();
            }

            if (cb && typeof cb === "function") {
              const ignoreBlock =
                value.length === 1 && [91, 93].includes(value[0]);

              if (!ignoreBlock) {
                const jsonString = Buffer.from(value).toString("utf8");
                if (jsonString) {
                  const jsonTrimmed = jsonString.substring(
                    0,
                    jsonString.length - 1
                  );
                  const jsonDataParsed = jsonTrimmed && JSON.parse(jsonTrimmed);
                  jsonDataParsed && cb(jsonDataParsed.data);
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

    const data = await new Response(stream);

    // ignore parsing for performance
    if (!ignoreParse) {
      const b = await data.text();

      // pop the last comma and return json just incase performance mode enabled
      if (b.length > 3 && b[b.length - 2] === ",") {
        json = JSON.parse(b.substring(0, b.length - 2) + "]"); // convert to json string
      }
    }
  }

  return json;
};
