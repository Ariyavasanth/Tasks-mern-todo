

export const apiFetch = async (url, options = {}) => {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // If access token expired
  if (res.status === 401) {
    const refreshRes = await fetch(
      "/api/auth/refresh",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (refreshRes.ok) {
      // retry original request
      res = await fetch(url, {
        ...options,
        credentials: "include",
      });
    }
  }

  return res;
};