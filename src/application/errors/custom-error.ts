export class CustomError extends Error {
  constructor(message: string, name: string = 'ApiError') {
    super();
    this.message = message;
    this.name = name;
  }
}
