export class NetworkError extends Error {
  readonly type = "NETWORK_ERROR" as const

  constructor(message = "Спробуйте пізніше або перевірте підключення до Інтернету") {
    super(message)
    this.name = "NetworkError"
  }
}

export class HttpError extends Error {
  readonly type = "HTTP_ERROR" as const
  readonly status: number

  constructor(status: number, message = "Помилка сервера") {
    super(message)
    this.name = "HttpError"
    this.status = status
  }
}

export type ApiError = NetworkError | HttpError
