class HttpError extends Error {
  constructor(errorMessage, statusCode) {
    super();
    this.errorMessage = errorMessage;
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
