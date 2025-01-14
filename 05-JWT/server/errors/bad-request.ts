import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

export default class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
