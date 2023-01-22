import { API_URL } from "../config/api";

type Body = {
  url?: string;
  [x: string]: any;
};

// perform scan against url
export const mutateScan = async (params?: { body?: Body }, jwt?: string) => {
  let res = null;

  try {
    res = await fetch(`${API_URL}/api/scan`, {
      method: "POST",
      body: params ? JSON.stringify(params.body) : null,
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
