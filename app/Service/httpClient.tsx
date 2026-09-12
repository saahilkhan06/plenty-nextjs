// src/services/httpClient.ts

import axios from "axios";
import { baseUrl } from "./Helper";
import { getAuthData, removeAuthData, updateAccessToken } from "./LocalStorage";

import { toast } from "react-toastify";
import { useLoaderStore } from "../store/loaderStore";

let activeRequests = 0;

const httpClient = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
});
httpClient.interceptors.request.use(
  (config) => {
    activeRequests++;

    useLoaderStore.getState().setLoading(true);

    // Handle FormData
    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      if (config.headers) {
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];

        if (typeof (config.headers as any).delete === "function") {
          (config.headers as any).delete("Content-Type");
          (config.headers as any).delete("content-type");
        }
      }
    }

    // Add access token
    if (typeof window !== "undefined") {
      const auth = getAuthData();

      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
    }
    return config;
  },

  (error) => {
    activeRequests--;

    if (activeRequests <= 0) {
      useLoaderStore.getState().setLoading(false);
    }

    return Promise.reject(error);
  },
);
httpClient.interceptors.response.use(
  (response) => {
    activeRequests--;

    if (activeRequests <= 0) {
      useLoaderStore.getState().setLoading(false);
    }

    return response;
  },

  async (error) => {
    activeRequests--;

    if (activeRequests <= 0) {
      useLoaderStore.getState().setLoading(false);
    }

    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // Access token expired
    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const auth = getAuthData();

      // No refresh token
      if (!auth?.refreshToken) {
        removeAuthData();

        if (typeof window !== "undefined") {
          window.location.href = "/Login";
        }

        return Promise.reject(error);
      }

      try {
        // IMPORTANT:
        // Use axios directly here instead of httpClient.
        // Otherwise the interceptor can intercept the refresh request too.
        const refreshResponse = await axios.post(
          `${baseUrl}/public/refresh-token`,
          {
            refreshToken: auth.refreshToken,
          },
        );

        const data = refreshResponse.data.data;

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // Save new token
        updateAccessToken(newAccessToken, newRefreshToken);

        // Update original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return httpClient(originalRequest);
      } catch (refreshError) {
        removeAuthData();

        if (typeof window !== "undefined") {
          window.location.href = "/Login";
        }

        return Promise.reject(refreshError);
      }
    }

    // Forbidden
    if (status === 403) {
      toast.error("Forbidden access");
    }

    // Server error
    if (status === 500) {
      toast.error("Server error");
    }

    return Promise.reject(error);
  },
);

export default httpClient;
