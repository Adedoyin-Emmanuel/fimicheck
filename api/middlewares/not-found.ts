import response from "../utils/response";
import { Response, Request } from "express";
import { ROUTE_NOT_FOUND } from "../constants/errors";

const useNotFound = (req: Request, res: Response) => {
  return response(res, 404, ROUTE_NOT_FOUND);
};

export default useNotFound;
