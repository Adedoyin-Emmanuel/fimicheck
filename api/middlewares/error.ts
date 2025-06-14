import Joi from "joi";
import type { Request, Response, NextFunction } from "express";

import response from "../utils/response";
import { IS_PRODUCTION } from "./../constants/app";
import { SOMETHING_WENT_WRONG } from "../constants/errors";

const useErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error instance:", err instanceof Error);
  console.log("Error name:", err.name);
  console.log("Error message:", err.message);
  console.log("Error stack:", err.stack);

  if (err instanceof Joi.ValidationError) {
    return response(res, 400, err?.details[0]?.message as string);
  }

  return response(
    res,
    500,
    `${SOMETHING_WENT_WRONG} ${IS_PRODUCTION ? "" : err}`
  );
};

export default useErrorHandler;
