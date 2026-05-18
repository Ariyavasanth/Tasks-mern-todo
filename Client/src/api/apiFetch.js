const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiFetch = async (url, options = {}) => {
  // 1. Get the access token from local storage
  const accessToken = localStorage.getItem("accessToken");

  // 2. Prepare request headers and include the Bearer token if it exists
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // 3. Make the API request
  let res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include", // Keep this for backward compatibility
    headers,
  });

  // 4. If the token is expired (returns 401), try silent token refresh
  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      // 5. If refresh is successful, save new tokens and retry original request
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        
        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }

        // Update Authorization header and retry
        headers["Authorization"] = `Bearer ${data.accessToken}`;
        res = await fetch(`${BASE_URL}${url}`, {
          ...options,
          credentials: "include",
          headers,
        });
      }
    }
  }

  return res;
};