const windowApi =
  // @ts-ignore
  typeof window !== "undefined" && window.NEXT_PUBLIC_A11YWATCH_API;

let API_URL = "https://api.a11ywatch.com";

if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_A11YWATCH_API) {
  API_URL = process.env.NEXT_PUBLIC_A11YWATCH_API;
} else if (windowApi) {
  API_URL = windowApi;
}

// manually set the api url
const setAPIURL = (api: string) => {
  API_URL = api;
};

export { API_URL, setAPIURL };
