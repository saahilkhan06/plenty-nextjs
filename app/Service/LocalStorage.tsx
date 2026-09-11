export interface AuthData {
  accessToken: string;
  refreshToken: string;
  role: string;

  user: {
    id: number;
    name: string;
    email: string;
    lastLogin: string;
  };
}

export const storeAuthData = (data: AuthData): void => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    "auth",
    JSON.stringify(data)
  );
};

export const getAuthData = (): AuthData | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const auth = window.localStorage.getItem("auth");

  return auth ? JSON.parse(auth) : null;
};

export const removeAuthData = (): void => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem("auth");
};

export const updateAccessToken = (
  accessToken: string,
  refreshToken?: string
): void => {
  const auth = getAuthData();

  if (!auth) return;

  auth.accessToken = accessToken;

  if (refreshToken) {
    auth.refreshToken = refreshToken;
  }

  window.localStorage.setItem(
    "auth",
    JSON.stringify(auth)
  );
};

export const isLoggedIn = (): boolean => {
  return getAuthData() !== null;
};