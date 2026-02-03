import axios from "axios"

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7777",
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    /* if (status === 404) {
      window.location.href = "/404"
    } else */ if (status >= 500) {
      window.location.href = "/500"
    }

    return Promise.reject(error)
  },
)
