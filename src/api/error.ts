export default class ApiError extends Error{
  message: string;

  error: string;

  status: number;

  constructor (msg: string, error: string, status: number ) {
    super(msg);
    this.error = error
    this.message = msg
    this.status = status
    Object.setPrototypeOf(this, ApiError.prototype);
  }

}