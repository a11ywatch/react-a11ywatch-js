// perform scan against url
export const mutateScan = async ({ url }: { url: string }, jwt?: string) => {
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

  let json = null;

  if (res.ok) {
    json = await res.json();
  }

  return json;
};
