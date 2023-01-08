import { API_URL } from "../config/api";

// perform scan against url
export const mutateScan = async ({ url }: { url: string }, jwt?: string) => {
  const res = await fetch(`${API_URL}/api/scan`, {
    method: "POST",
    body: JSON.stringify({
      url,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`, // set the auth token from login
    },
  });

  let json = null;

  if (res.ok) {
    json = await res.json();
  }

  return json;
};
