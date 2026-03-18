import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:1337/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      );
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      console.log(
        `✅ API Response: ${response.status} ${response.config.url}`,
        response.data,
      );
    }

    return response;
  },
  (error: AxiosError) => {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      console.error("❌ Response Error:", error);
    }

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request:", data);
          break;
        case 401:
          console.error("Unauthorized access");
          // You could redirect to login page here
          // window.location.href = '/login';
          break;
        case 403:
          console.error("Forbidden access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error(`HTTP Error ${status}:`, data);
      }
    } else if (error.request) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error("Network error - please check your connection");
      }
    } else {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error("Request setup error:", error.message);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
