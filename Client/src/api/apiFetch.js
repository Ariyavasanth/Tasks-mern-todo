const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiFetch = async (url, options = {}) => {
  let res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // If access token expired
  if (res.status === 401) {
    const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (refreshRes.ok) {
      res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
    }
  }

  return res;
};