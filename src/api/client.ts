import axios from "axios"

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7777",
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response || error.code === "ERR_NETWORK") {
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "Спробуйте пізніше або перевірте підключення до Інтернету",
        // message: "Сервер недоступний",
      })
    }

    // const status = error.response?.status
    // const method = error.config?.method?.toLowerCase()

    // if (status >= 500 && method === "get") {
    //   window.location.href = "/500"
    // }

    return Promise.reject({
      type: "HTTP_ERROR",
      status,
      message: error.response?.data?.message || "Помилка сервера",
    })
    // return Promise.reject(error)
  },
)
