import axios from "axios"
import { HttpError, NetworkError } from "./error-handlers/api-error"

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7777",
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new NetworkError())
    }

    const status = error.response.status as number
    const message: string = error.response?.data?.message || "Помилка сервера"

    return Promise.reject(new HttpError(status, message))
  },
)