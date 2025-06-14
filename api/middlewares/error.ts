import { Request, Response, NextFunction } from "express";
import response from "../utils/response";
import logger from "../utils/logger";
import { SOMETHING_WENT_WRONG } from "../constants/errors";
import { IS_PRODUCTION } from "./../constants/app";
import Joi from "joi";

const useErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);

  if (err instanceof Joi.ValidationError) {
    return response(res, 400, err.details[0].message);
  }

  return response(
    res,
    500,
    `${SOMETHING_WENT_WRONG} ${IS_PRODUCTION ? "" : err}`
  );
};

export default useErrorHandler;
