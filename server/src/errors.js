export class HttpError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends HttpError {
  constructor(message, status = 404) {
    super(status, message);
    this.name = "NotFoundError";
  }
}
