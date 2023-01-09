import { API_URL } from "../config/api";

// perform scan against url
export const mutateScan = async ({ url }: { url: string }, jwt?: string) => {
  let res = null;

  try {
    res = await fetch(`${API_URL}/api/scan`, {
      method: "POST",
      body: JSON.stringify({
        url,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`, // set the auth token from login
      },
    });
  } catch (e) {
    console.error(e);
  }

  let json = null;

  if (res && res.ok) {
    json = await res.json();
  }

  return json;
};
